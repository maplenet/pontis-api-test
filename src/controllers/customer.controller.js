import ApiService from "../services/api.service.js";

const createCustomer = async (req, res) => {
  try {
    const customerData = req.body;

    if (
      !customerData.customer ||
      !customerData.customerAccount ||
      !customerData.customerInfo
    ) {
      throw new Error("Datos del customer incompletos");
    }

    const response = await ApiService.executeRequest(
      "POST",
      "/customer/create",
      customerData,
      req.headers.cookie
    );

    res.status(201).json(response);
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

export default {
  createCustomer,
  getCustomer,
  updateCustomer,
};
