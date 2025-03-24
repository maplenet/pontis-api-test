import { User } from "../entities/user.entity";
import LineService from "../services/line.service";

import { Request, Response } from "express";

const createLine = async (req: Request, res: Response) => {
  try {
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

    // const userExiste = await User.findOne({ where: { username } });

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

    const user = new User(
      response.data.id,
      response.data.username,
      response.data.password,
      max_connections,
      customerInfo.email,
      customer.firstName,
      customer.lastName,
      customerInfo.city,
      expDate
    );

    await user.save();

    res.status(200).json(response);
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
    const { customer, customerAccount, subscribeService } = req.body;
    const { idLine } = req.params;

    const bouquets_selected = JSON.stringify(
      subscribeService.map((service: any) =>
        parseInt(service.serviceMenu.serviceMenuId)
      )
    );

    const access_output = [1, 2];

    const username = customerAccount.login;
    const password = customerAccount.password;

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

    const response = await LineService.executeRequest("POST", "edit_line", {
      id: idLine,
      bouquets_selected,
      access_output,
      username,
      password,
      max_connections,
      exp_date,
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

export default { createLine, getLine, deleteLine, updateLine };
