import HTTPTool from '../utils/HTTPTool';
import { hostForAPI } from '../constants';

export default class ChatAPI {
  createChats(name: string) {
    console.log({ title: name });
    return new HTTPTool().post(`${hostForAPI}/chats`, {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        title: name,
      }),
    });
  }

  deleteChat(id: string | number) {
    return new HTTPTool().delete(`${hostForAPI}/chats`, {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        chatId: id,
      }),
    });
  }

  getChat() {
    return new HTTPTool().get(`${hostForAPI}/chats`, {
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  getToken(chatId: string | number) {
    return new HTTPTool().post(
      `${hostForAPI}/chats/token/${chatId}`,
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );
  }

  getUsers(chatId: string | number) {
    return new HTTPTool().get(`${hostForAPI}/chats/${chatId}/users`, {
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  addUser(userId: string | number, toChatId: string | number) {
    return new HTTPTool().put(`${hostForAPI}/chats/users`, {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        users: [userId],
        chatId: toChatId,
      }),
    });
  }

  deleteUser(userId: string | number, toChatId: string | number) {
    return new HTTPTool().delete(`${hostForAPI}/chats/users`, {
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        users: [userId],
        chatId: toChatId,
      }),
    });
  }
}
