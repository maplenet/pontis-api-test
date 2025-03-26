import LineService from "../services/line.service";

import { Request, Response } from "express";
import {
  createUser,
  getUser,
  updateUser,
} from "../repositories/user.repository";

const createLine = async (req: Request, res: Response) => {
  try {
    let responseData = {
      id: null,
      response: null,
    };
    const { customer, customerAccount, customerInfo, subscribeService } =
      req.body;

    const bouquets_selected = JSON.stringify(
      subscribeService.map((service: any) =>
        parseInt(service.serviceMenu.serviceMenuId)
      )
    );

    const access_output = [1, 2];

    const username = customerAccount.login;
    const password = customerAccount.password;

    const userExist = await getUser(username);

    if (userExist) {
      throw new Error("User already exists");
    }

    const max_connections =
      parseInt(customer.autoProvCountStationary) +
      parseInt(customer.autoProvisionCountMobile);

    let exp_date = null;
    for (const service of subscribeService) {
      if (service.expireDt) {
        exp_date = service.expireDt;
        break;
      }
    }

    if (exp_date) {
      const [day, month, year] = exp_date.split("/");
      exp_date = `${year}-${month}-${day} 23:59`;
    }

    const response = await LineService.executeRequest("POST", "create_line", {
      bouquets_selected,
      access_output,
      username,
      password,
      max_connections,
      exp_date,
    });

    const expDate = new Date(response.data.exp_date * 1000);

    await createUser({
      idLine: response.data.id,
      username: response.data.username,
      password: response.data.password,
      conections: max_connections,
      email: customerInfo.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      city: customerInfo.city,
      expiredAt: expDate,
    });

    responseData = {
      id: response.data.id,
      response: response.data.username,
    };

    res.status(200).json(responseData);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

const getLine = async (req: Request, res: Response) => {
  try {
    const { idLine } = req.params;

    if (!idLine) {
      throw new Error("idLine is required");
    }

    const response = await LineService.executeRequest("GET", "get_line", {
      id: idLine,
    });

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

const getLineByUser = async (req: Request, res: Response) => {
  let responseData: {
    id: number | null;
    response: string | null;
    packages: any[];
  } = {
    id: null,
    response: null,
    packages: [],
  };
  try {
    const { username } = req.params;

    if (!username) {
      throw new Error("username is required");
    }
    const user = await getUser(username);
    if (!user) {
      throw new Error("User not found");
    }

    const expireDate = user.expiredAt.toLocaleDateString("es-ES", {
      timeZone: "ETC/GMT+4",
    });
    const hour = user.expiredAt.toLocaleTimeString("es-ES", {
      timeZone: "ETC/GMT+4",
    });

    const response = await LineService.executeRequest("GET", "get_line", {
      id: user.idLine,
    });

    responseData = {
      id: user.idLine,
      response: response.data.username,
      packages: response.data.bouquet,
    };

    res.status(200).json(responseData);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

const deleteLine = async (req: Request, res: Response) => {
  try {
    const { idLine } = req.params;

    if (!idLine) {
      throw new Error("idLine is required");
    }

    const response = await LineService.executeRequest("DELETE", "delete_line", {
      id: idLine,
    });

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

const updateLine = async (req: Request, res: Response) => {
  try {
    let responseData: { id: number | null; response: string | null } = {
      id: null,
      response: null,
    };

    const { username } = req.params;
    const { customer, customerAccount, subscribeService } = req.body;

    const access_output = [1, 2];
    const user = await getUser(username);

    if (!user) {
      throw new Error("User not found");
    }

    const userLine = await LineService.executeRequest("GET", "get_line", {
      id: user.idLine,
    });

    const bouquets_selected = JSON.stringify(
      subscribeService.map((service: any) =>
        parseInt(service?.serviceMenu?.serviceMenuId)
      ) || userLine?.data?.bouquet
    );

    const password = customerAccount?.password || userLine?.data?.password;

    const max_connections =
      parseInt(customer?.autoProvCountStationary) +
        parseInt(customer?.autoProvisionCountMobile) ||
      userLine?.data?.max_connections;

    let exp_date = null;
    for (const service of subscribeService) {
      if (service.expireDt) {
        exp_date = service.expireDt;
        break;
      }
    }

    if (exp_date) {
      const [day, month, year] = exp_date.split("/");
      exp_date = `${year}-${month}-${day} 23:59`;
    }

    await updateUser(username, {
      idLine: user.idLine,
      username: username,
      password: password,
      conections: max_connections,
      expiredAt: user.expiredAt,
    });

    const response = await LineService.executeRequest("POST", "edit_line", {
      id: user.idLine,
      bouquets_selected,
      access_output,
      username,
      password,
      max_connections,
      exp_date,
    });

    responseData = {
      id: user.idLine,
      response: response.data.username,
    };

    res.status(200).json(responseData);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export default { createLine, getLine, getLineByUser, deleteLine, updateLine };
