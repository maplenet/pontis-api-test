class SessionService {
  constructor() {
    this.sessions = {};
  }

  createSession(customerId, sessionCookie) {
    this.sessions[customerId] = sessionCookie;
  }

  getSession(customerId) {
    return this.sessions[customerId];
  }
}

export default new SessionService();