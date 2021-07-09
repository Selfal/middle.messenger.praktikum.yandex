import HTTPTool from '../utils/HTTPTool';
import { hostForAPI } from '../constants';

export default class AuthAPI {
  signUp(options) {
    return new HTTPTool().post(`${hostForAPI}/auth/signup`, {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(options),
    });
  }

  signIn(options) {
    return new HTTPTool().post(`${hostForAPI}/auth/signin`, {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(options),
    });
  }

  getUserInfo() {
    return new HTTPTool().get(`${hostForAPI}/auth/user`, {
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  logoutUser() {
    return new HTTPTool().post(`${hostForAPI}/auth/logout`, {
      headers: {
        'content-type': 'application/json',
      },
    });
  }
}
