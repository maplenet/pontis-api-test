class SessionService {
  constructor() {
    this.sessions = {};
  }

  createSession(customerId, sessionCookie) {
    this.sessions[customerId] = sessionCookie;
  }

  getSession() {
    return this.sessions['subop_maplenet1'];
  }
}

export default new SessionService();