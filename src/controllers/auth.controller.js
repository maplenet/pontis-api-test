import ApiService from '../services/api.service.js';
import sessionService from '../services/session.service.js'

export const login = async (req, res) => {
  try {
    const { customer_id, password } = req.body;
    const sessionCookie = await ApiService.login(customer_id, password);
    
    sessionService.createSession(customer_id, sessionCookie);
    
    res.status(200).json({
      message: "Login exitoso",
      customer_id
    });
    
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};