import ApiService from "../services/api.service.js";

const createCustomer = async (req, res) => {
  try {
    const response = await ApiService.executeRequest(
      "POST",
      "/customer/create",
      req.body,
      req.headers.cookie
    );

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCustomer = async (req, res) => {
  try {
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
