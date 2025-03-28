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

const respGetUser = (
  customerId: string,
  lastName: string,
  firstName: string,
  autoProvisionCountMobile: number,
  autoProvCountStationary: number,
  password: string,
  effectiveDt: string,
  email: string
) => {
  const service = {
    subscribeServiceId: 4866847,
    serviceMenu: {
      serviceMenuId: 6213,
      serviceCode: "SRPKG",
      name: "M+ Servicio Básico",
      price: "0.00",
      serviceId: 78101,
    },
    purchasedFromClient: "N",
    effectiveDt: "20/03/2025",
    expireDt: null,
  };

  return {
    response: {
      customer: {
        customerId,
        lastName,
        middleName: null,
        firstName,
        loginRequired: "N",
        status: "A",
        pin: "0000",
        entityId: 1,
        displayTimeout: 10,
        parentalControl: "N",
        hasPpv: "N",
        hasPromoChannel: "N",
        hasVod: "Y",
        channelBlocking: "N",
        autoProvisionCount: 0,
        autoProvisionCountMobile,
        blockedChannelList: null,
        nrtcAccountTypeId: 1,
        fcoDrops: null,
        favoritesEnabled: "Y",
        multicastenabled: "N",
        multicastTunein: "N",
        enableStreamManagement: "N",
        totalAttainableBandwidth: 0,
        callerIdEnable: "N",
        localizationId: 71,
        npvrLimit: 0,
        pauselivetvLimit: 0,
        autoProvCountStationary,
        externalCustomerId: null,
        advertisementOptIn: null,
      },
      customerAccount: {
        accountId: 71,
        login: customerId,
        password,
        showAllChannel: "N",
        allowance: null,
        pinRequired: "N",
        sexRating: "N",
        languageRating: "N",
        violentRating: "N",
        dialogRating: "N",
        fvRating: "N",
        reminderPeriod: null,
        ppvAutoSetReminder: "R",
        blockUnrated: "N",
        unlockTimeout: 120,
        bootStreamId: null,
        primaryAudioLanguage: "spa",
        secondaryAudioLanguage: "eng",
        primarySubtitleLanguage: "spa",
        secondarySubtitleLanguage: "eng",
        closedCaptions: "N",
        descriptiveVideo: "N",
        imageIdFocused: 1,
        imageIdUnfocused: 2,
        notificationTimeout: 10,
        username: null,
        effectiveDt,
        expireDt: null,
        mpaaAccessLevel: {
          assetRatingId: 8,
          assetRating: "X",
        },
        tvRatingId: {
          tvRatingId: 6,
          tvRating: "TVMA",
        },
        language: null,
        shareRental: "Y",
      },
      customerInfo: {
        address1: "CALLE MAPLENET",
        address2: null,
        address3: null,
        city: "La Paz",
        state: "La Paz",
        zipcode: "0000",
        workPhone: null,
        homePhone: null,
        fax: null,
        email,
        note: null,
        mobilePhone: "77777777",
        easLocationCode: null,
        zoneId: null,
      },
      remoteSchedulerCustomer: null,
      subscribeService: [
        {
          subscribeServiceId: 4866847,
          serviceMenu: {
            serviceMenuId: 6213,
            serviceCode: "SRPKG",
            name: "M+ Servicio Básico",
            price: "0.00",
            serviceId: 78101,
          },
          purchasedFromClient: "N",
          effectiveDt: "20/03/2025",
          expireDt: null,
        },
        {
          subscribeServiceId: 4866848,
          serviceMenu: {
            serviceMenuId: 6214,
            serviceCode: "CDSP",
            name: "M+ Servicio Mobile",
            price: "0.00",
            serviceId: 78102,
          },
          purchasedFromClient: "N",
          effectiveDt: "20/03/2025",
          expireDt: null,
        },
        {
          subscribeServiceId: 4866849,
          serviceMenu: {
            serviceMenuId: 6215,
            serviceCode: "SRPKG",
            name: "M+ Servicio Stationary",
            price: "0.00",
            serviceId: 78103,
          },
          purchasedFromClient: "N",
          effectiveDt: "20/03/2025",
          expireDt: null,
        },
      ],
      subaccountCount: 0,
      assignedMobileCount: 5,
      assignedStbCount: 0,
      channelLineupName: "Maplenet (4081)",
      accountTypeDesc: "Residential",
    },
    statusCode: 0,
    statusMessage: "Customer information retrieved successfully",
    errorCode: null,
    errorMessage: null,
    httpStatus: 200,
  };
};

const getLineByUser = async (req: Request, res: Response) => {
  let responseData: {
    id: number | null;
    response: string | null;
    subscribeService: any[];
  } = {
    id: null,
    response: null,
    subscribeService: [],
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
      subscribeService: response.data.bouquet,
    };

    res
      .status(200)
      .json(
        respGetUser(
          user.username,
          user.lastName,
          user.firstName,
          1,
          1,
          user.password,
          expireDate,
          user.email
        )
      );
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
