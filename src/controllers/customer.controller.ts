import ApiService from "../services/api.service";
import { Request, Response } from "express";

const createCustomer = async (req: Request, res: Response) => {
  try {
    const customerData = req.body;

    if (
      !customerData.customer ||
      !customerData.customerAccount ||
      !customerData.customerInfo ||
      !customerData.subscribeService
    ) {
      throw new Error("Datos del customer incompletos");
    }

    const response = await ApiService.executeRequest(
      "POST",
      "/customer/create",
      customerData,
      req.headers.cookie
    );
    if (response.httpStatus !== 200) {
      throw new Error(response.errorMessage);
    }
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

const getCustomers = async (req: Request, res: Response) => {
  const params = new URLSearchParams(
    req.query as Record<string, string>
  ).toString();
  try {
    const response = await ApiService.executeRequest(
      "GET",
      `/customer/filterList?${params}`,
      {},
      req.headers.cookie
    );
    if (response.httpStatus !== 200) {
      throw new Error(response.errorMessage);
    }
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

const getCustomer = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.customerId;

    if (!customerId) {
      throw new Error("Customer ID es requerido");
    }

    const response = await ApiService.executeRequest(
      "POST",
      "/customer/getCustomer/",
      { customerId },
      req.headers.cookie
    );

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

const updateCustomer = async (req: Request, res: Response) => {
  try {
    const response = await ApiService.executeRequest(
      "PUT",
      `/customer/update/${req.params.customerId}`,
      req.body,
      req.headers.cookie
    );

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { customerId, force } = req.body;

    if (!customerId || !force) {
      throw new Error("customerId y force son requeridos");
    }

    const response = await ApiService.executeRequest(
      "POST",
      "/customer/delete",
      { customerId, force },
      req.headers.cookie
    );

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const { customerId, password } = req.body;

    if (!customerId || !password) {
      throw new Error("customerId y password son requeridos");
    }

    const response = await ApiService.executeRequest(
      "PUT",
      `/customer/update/${customerId}`,
      { customerAccount: { password: password } },
      req.headers.cookie
    );

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

const deleteServices = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.customerId;
    const subscribeServiceId: any[] = [];

    if (!customerId) {
      throw new Error("customerId and subscribeServiceId are required");
    }

    const dataCustomer = await ApiService.executeRequest(
      "POST",
      "/customer/getCustomer/",
      { customerId },
      req.headers.cookie
    );

    dataCustomer.response.subscribeService.map((service: any) => {
      if (service.expireDt !== null)
        subscribeServiceId.push(service.subscribeServiceId.toString());
    });

    const response = await ApiService.executeRequest(
      "POST",
      `/customer/deleteservices`,
      { subscribeServiceDTOList: [{ customerId, subscribeServiceId }] },
      req.headers.cookie
    );

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export default {
  createCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  changePassword,
  deleteServices,
};
