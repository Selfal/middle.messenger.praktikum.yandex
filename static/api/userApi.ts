import HTTPTool from '../utils/HTTPTool';
import { hostForAPI } from '../constants';

interface IChangeInfo {
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  email: string;
}

interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export default class UserAPI {
  changeInfo(options: IChangeInfo) {
    return new HTTPTool().put(`${hostForAPI}/user/profile`, {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(options),
    });
  }

  changePassword(options: IChangePassword) {
    return new HTTPTool().put(`${hostForAPI}/user/password`, {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(options),
    });
  }

  changeAvatar(form: FormData) {
    return new HTTPTool().put(`${hostForAPI}/user/profile/avatar`, {
      data: form,
    });
  }

  logoutUser() {
    return new HTTPTool().post(`${hostForAPI}/auth/logout`, {
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  searchUser(searchLogin: string) {
    return new HTTPTool().post(`${hostForAPI}/user/search`, {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        login: searchLogin,
      }),
    });
  }
}
