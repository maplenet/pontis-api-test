import LineService from "../services/line.service.js";

const createLine = async (req, res) => {
  try {
    const { customer, customerAccount, subscribeService } = req.body;
    const bouquets_selected = subscribeService.map(
      (service) => parseInt(service.serviceMenu.serviceMenuId)
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

    const response = await LineService.executeRequest("POST", "create_line", {
      bouquets_selected,
      access_output,
      username,
      password,
      max_connections,
      exp_date,
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { createLine };