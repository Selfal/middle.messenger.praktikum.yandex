import HTTPTool from '../utils/HTTPTool';
import { hostForAPI } from '../constants';

interface ISignUpOptins {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

interface IsignInOptins {
  login: string;
  password: string;
}

export default class AuthAPI {
  signUp(options: ISignUpOptins) {
    return new HTTPTool().post(`${hostForAPI}/auth/signup`, {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(options),
    });
  }

  signIn(options: IsignInOptins) {
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
