class SessionService {
  sessions: { [key: string]: any };
  constructor() {
    this.sessions = {};
  }

  createSession(customerId: string, sessionCookie: any) {
    this.sessions[customerId] = sessionCookie;
  }

  getSession() {
    return this.sessions["subop_maplenet1"];
  }
}

export default new SessionService();
