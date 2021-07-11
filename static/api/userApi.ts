import HTTPTool from '../utils/HTTPTool';
import { hostForAPI } from '../constants';

export default class UserAPI {
  changeInfo(options) {
    return new HTTPTool().put(`${hostForAPI}/user/profile`, {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(options),
    });
  }

  changePassword(options) {
    return new HTTPTool().put(`${hostForAPI}/user/password`, {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(options),
    });
  }

  changeAvatar(form) {
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

  searchUser(searchLogin) {
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
