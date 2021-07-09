import HTTPTool from '../utils/HTTPTool';
import { hostForAPI } from '../constants';

export default class ChatAPI {
  createChats(name: string) {
    return new HTTPTool().post(`${hostForAPI}/chats`, {
      headers: {
        'content-type': 'application/json',
      },
      data: {
        title: name,
      },
    });
  }

  deleteChat() {
    return new HTTPTool().delete(`${hostForAPI}/chats`, {
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  getChat() {
    return new HTTPTool().get(`${hostForAPI}/chats`, {
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  getToken(chatId) {
    return new HTTPTool().post(
      `${hostForAPI}/chats/token/${chatId}`,
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );
  }
}
