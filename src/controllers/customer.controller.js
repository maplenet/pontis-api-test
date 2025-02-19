import ApiService from "../services/api.service.js";

const createCustomer = async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
};

const getCustomers = async (req, res) => {
  const params = new URLSearchParams(req.query).toString();
  try {
    const response = await ApiService.executeRequest(
      "GET",
      `/customer/filterList?${params}`,
      null,
      req.headers.cookie
    );
    if (response.httpStatus !== 200) {
      throw new Error(response.errorMessage);
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCustomer = async (req, res) => {
  try {
    const { customerId } = req.body;

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
    res.status(500).json({ error: error.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const response = await ApiService.executeRequest(
      "PUT",
      `/customer/update/${req.params.customerId}`,
      req.body,
      req.headers.cookie
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCustomer = async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
};

export default {
  createCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  changePassword,
};
