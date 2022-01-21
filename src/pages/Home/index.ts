import * as pug from 'pug';
import ChatAPI from '../../api/chatApi';
import UserApi from '../../api/userApi';
import { DialogPreview } from '../../components/DialogPreview/index';
import { IconButton } from '../../components/IconButton/index';
import { Message } from '../../components/Message/index';
import { InputMessage } from '../../components/InputMessage/index';
import { PopupCreateChat } from '../../components/PopupCreateChat/index';
import { Button } from '../../components/Button/index';
import { Input } from '../../components/Input/index';
import { Dropdown } from '../../components/Dropdown/index';
import { router } from '../../index';
import Block from '../../utils/Block';
import sanitize from '../../utils/sanitize';
import './style.scss';

export class Home extends Block {
  constructor() {
    super('main', {
      childComponents: {
        dialogsPreview: [],
        buttons: {
          profileSettings: new IconButton({
            srcIcon: '../../assets/sprite.svg#profile',
            events: {
              click: (e: Event) => {
                router.go('/settings');
              },
            },
          }),
          settingsChat: new IconButton({
            srcIcon: '../../assets/sprite.svg#setting',
            className: '.dropdown',
          }),
          send: new IconButton({
            srcIcon: '../../assets/sprite.svg#send',
          }),
          attach: new IconButton({
            srcIcon: '../../assets/sprite.svg#attach',
          }),
        },
        inputs: {
          messageArea: new InputMessage({
            placeholder: 'Начните ввод',
            events: {
              keydown: (e: Event) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (e.target.value === '') {
                    return;
                  }
                  this.props.soket.send(
                    JSON.stringify({
                      content: e.target.value,
                      type: 'message',
                    }),
                  );
                  e.target.value = '';
                  e.target.disabled = true;

                  setTimeout(() => {
                    e.target.disabled = false;
                  }, 700);
                }
              },
            },
          }),
        },
        popups: {
          createChat: new PopupCreateChat({
            active: false,
            title: 'Создание чата',
            input: new Input({
              placeholder: 'Введите название чата',
              type: 'text',
              disabled: false,
            }),
            button: new Button({
              text: 'Создать',
              primary: true,
              events: {
                click: (e: Event) => {
                  e.preventDefault();
                  const popup =
                    this.props.childComponents.popups.createChat;
                  new ChatAPI()
                    .createChats(popup.props.input.value)
                    .then((data) => {
                      const result = JSON.parse(data.response);
                      this.loadChats();
                    });
                  popup.setProps({ active: false });
                },
              },
            }),
          }),
          addUser: new PopupCreateChat({
            active: false,
            title: 'Добавление пользователя',
            input: new Input({
              placeholder: 'Введите логин',
              type: 'text',
              disabled: false,
            }),
            button: new Button({
              text: 'Добавить',
              primary: true,
              events: {
                click: (e: Event) => {
                  e.preventDefault();
                  const popup =
                    this.props.childComponents.popups.addUser;
                  new UserApi()
                    .searchUser(popup.props.input.value)
                    .then((data) => {
                      const result = JSON.parse(data.response);
                      if (result.length > 0) {
                        new ChatAPI()
                          .addUser(
                            result[0].id,
                            this.props.selectedChat,
                          )
                          .then(() => {
                            popup.setProps({ active: false });
                          });
                      }
                    });
                },
              },
            }),
          }),
          deleteUser: new PopupCreateChat({
            active: false,
            title: 'Удаление пользователя',
            input: new Input({
              placeholder: 'Введите логин',
              type: 'text',
              disabled: false,
            }),
            button: new Button({
              text: 'Удалить',
              primary: true,
              events: {
                click: (e: Event) => {
                  e.preventDefault();
                  const popup =
                    this.props.childComponents.popups.deleteUser;

                  const users = this.props.users;
                  let logins = {};
                  for (const key in users) {
                    const { login, id } = users[key];
                    if (key !== localStorage.getItem('id')) {
                      logins = {
                        ...logins,
                        [login]: id,
                      };
                    }
                  }

                  if (logins[popup.props.input.value]) {
                    new ChatAPI()
                      .deleteUser(
                        logins[popup.props.input.value],
                        this.props.selectedChat,
                      )
                      .then(() => {
                        popup.setProps({ active: false });
                      });
                  }
                },
              },
            }),
          }),
        },
        dropdowns: {
          settingsChat: new Dropdown({
            items: [
              {
                name: 'Добавить пользователя',
                event: () => {
                  const popup =
                    this.props.childComponents.popups.addUser;
                  popup.setProps({ active: true });
                },
              },
              {
                name: 'Удалить пользователя',
                event: () => {
                  const popup =
                    this.props.childComponents.popups.deleteUser;
                  popup.setProps({ active: true });
                },
              },
              {
                name: 'Создать чат',
                event: () => {
                  const popup =
                    this.props.childComponents.popups.createChat;
                  console.log(popup);
                  popup.setProps({ active: true });
                },
              },
              {
                name: 'Удалить чат',
                event: () => {
                  const id = this.props.selectedChat;
                  new ChatAPI()
                    .deleteChat(id)
                    .then((data) => {
                      this.loadChats();
                    })
                    .then(() => {
                      this.setProps({
                        messages: [],
                        selectedChat: null,
                        activeChatName: null,
                        activeChatAvatar: null,
                        users: {},
                      });
                    });
                },
              },
            ],
          }),
        },
      },
      messages: [],
      selectedChat: null,
      activeChatName: null,
      activeChatAvatar: null,
      socket: null,
      users: {},
    });

    this.loadChats();
  }

  loadChats() {
    new ChatAPI().getChat().then((data) => {
      const result = JSON.parse(data.response);
      this.props.childComponents.dialogsPreview = [];
      result.map((item) => {
        const component = new DialogPreview({
          dialogName: item.title,
          lastMessage:
            item.last_message === null
              ? 'Сообщений нет'
              : item.last_message?.content,
          missedNum: item.unread_count,
          active: false,
          avatar: item.avatar
            ? `https://ya-praktikum.tech/api/v2/resources/${item.avatar}`
            : '',
          id: item.id,
          chatName: item.title,
          events: {
            click: (e: Event) => {
              e.stopPropagation();
              const dialogs =
                this.props.childComponents.dialogsPreview;

              for (let i = 0; i < dialogs.length; i++) {
                this.props.childComponents.dialogsPreview[i].setProps(
                  {
                    active: false,
                  },
                );
              }

              component.setProps({ active: true });
              this.props.selectedChat = e.currentTarget.dataset.id;
              this.setProps({
                activeChatName: e.currentTarget.dataset.chatname,
              });
              this.setProps({
                activeChatAvatar: e.currentTarget.dataset.chatavatar,
              });

              new ChatAPI()
                .getUsers(this.props.selectedChat)
                .then((data) => {
                  const result = JSON.parse(data.response);
                  result.map((item) => {
                    this.props.users[item.id] = {
                      ...item,
                    };
                  });
                });

              this.props.messages = [];

              new ChatAPI()
                .getToken(this.props.selectedChat)
                .then((data) => {
                  const result = JSON.parse(data.response);
                  return result;
                })
                .then((result) => {
                  this.setProps({
                    soket: new WebSocket(
                      `wss://ya-praktikum.tech/ws/chats/${localStorage.getItem(
                        'id',
                      )}/${this.props.selectedChat}/${result.token}`,
                    ),
                  });

                  this.props.soket.addEventListener('open', () => {
                    console.log('Соединение установлено');
                    this.props.soket.send(
                      JSON.stringify({
                        content: '0',
                        type: 'get old',
                      }),
                    );
                  });

                  this.props.soket.addEventListener(
                    'close',
                    (event) => {
                      if (event.wasClean) {
                        console.log('Соединение закрыто чисто');
                      } else {
                        console.log('Обрыв соединения');
                      }

                      console.log(
                        `Код: ${event.code} | Причина: ${event.reason}`,
                      );
                    },
                  );

                  this.props.soket.addEventListener(
                    'message',
                    (event) => {
                      const data = JSON.parse(event.data);
                      console.log('Получены данные', data);

                      // const messagesArr = this.props.messages;
                      if (Array.isArray(data)) {
                        data.map((item) => {
                          const time = new Date(item.time)
                            .toTimeString()
                            .slice(0, 5);
                          const user = this.props.users[item.user_id];
                          this.setProps({
                            messages: [
                              ...this.props.messages,
                              new Message({
                                userAvatar: `${
                                  user.avatar
                                    ? `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`
                                    : '../../assets/img/avatarPlaceholder.jpeg'
                                }`,
                                userName: `${user.second_name} ${user.first_name}`,
                                messageText: item.content,
                                time: time,
                              }),
                            ],
                          });
                        });
                      } else {
                        const time = new Date(data.time)
                          .toTimeString()
                          .slice(0, 5);
                        const user = this.props.users[data.user_id];

                        this.setProps({
                          messages: [
                            new Message({
                              userAvatar: `${
                                user.avatar
                                  ? `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`
                                  : '../../assets/img/avatarPlaceholder.jpeg'
                              }`,
                              userName: `${user.second_name} ${user.first_name}`,
                              messageText: data.content,
                              time: time,
                            }),
                            ...this.props.messages,
                          ],
                        });
                      }
                    },
                  );

                  this.props.soket.addEventListener(
                    'error',
                    (event) => {
                      console.log('Ошибка', event.message);
                    },
                  );
                });
            },
          },
        });
        const result = this.props.childComponents.dialogsPreview;
        result.push(component);
        this.setProps(result);
      });
    });
  }

  render() {
    const component = pug.compile(`div.home.wrapper
        div.chat-menu
          div.chat-menu__header
            .input
              svg.input__icon
                  use(xlink:href='../../assets/sprite.svg#search')
              input(type="text", placeholder="Поиск").search-input
          ul.chat-menu__body
            
        main.main 
          div.main__header
            div.main__header-left 
              img.chat-avatar(src="${
                this.props.activeChatAvatar
                  ? this.props.activeChatAvatar
                  : '../../assets/img/avatarPlaceholder.jpeg'
              }")
            div.main__header-middle
              div.chat-name ${
                this.props.activeChatName
                  ? sanitize(this.props.activeChatName)
                  : ''
              }
            div.main__header-right

          div.main__body

          div.main__footer
            div.main__footer-left
              button.button-only-icon.button--add
                svg.button-only-icon__icon 
                  use(xlink:href="../../assets/sprite.svg#attach")
            div.main__footer-middle
              
            div.main__footer-right
              button.button-only-icon.button--add
                svg.button-only-icon__icon 
                  use(xlink:href="../../assets/sprite.svg#send")
    
        div.menu-chat 
          div.menu-chat__header 
          div.menu-chat__body 
          div.menu-chat__footer`);

    let layout = document.createElement('main');
    layout.innerHTML = component();
    const { dialogsPreview, buttons, inputs, popups, dropdowns } =
      this.props.childComponents;
    const messages = this.props.messages;

    layout
      .querySelector('.chat-menu__header')
      ?.append(buttons.profileSettings.getContent());

    for (let i = 0; i < dialogsPreview.length; i++) {
      layout
        .querySelector('.chat-menu__body')
        ?.append(dialogsPreview[i].getContent());
    }

    for (let i = 0; i < messages.length; i++) {
      layout
        .querySelector('.main__body')
        ?.append(messages[i].getContent());
    }

    layout
      .querySelector('.main__footer-middle')
      ?.append(inputs.messageArea.getContent());

    layout
      .querySelector('.wrapper')
      ?.append(popups.createChat.getContent());
    layout
      .querySelector('.wrapper')
      ?.append(popups.addUser.getContent());
    layout
      .querySelector('.wrapper')
      ?.append(popups.deleteUser.getContent());
    layout
      .querySelector('.main__header-right')
      ?.append(buttons.settingsChat.getContent());

    layout
      .querySelector('.dropdown')
      ?.append(dropdowns.settingsChat.getContent());

    const messagesWrapper = layout.querySelector('.main__body');
    messagesWrapper.scrollTop = messagesWrapper.scrollHeight;

    return layout.firstChild;
  }
}
