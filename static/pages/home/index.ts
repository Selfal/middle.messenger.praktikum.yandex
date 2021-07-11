import * as pug from 'pug';
import ChatAPI from '../../api/chatApi';
import { DialogPreview } from '../../components/DialogPreview/index';
import { IconButton } from '../../components/IconButton/index';
import { Message } from '../../components/Message/index';
import { InputMessage } from '../../components/InputMessage/index';
import { router } from '../../index';
import Block from '../../utils/Block';
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
                console.log('test click settings');
                router.go('/settings');
              },
            },
          }),
          settingsChat: new IconButton({
            srcIcon: '../../assets/sprite.svg#setting',
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
                  this.props.soket.send(
                    JSON.stringify({
                      content: e.target.value,
                      type: 'message',
                    }),
                  );
                }
              },
            },
          }),
        },
        popups: {},
      },
      messages: [],
      selectedChat: null,
      activeChatName: null,
      activeChatAvatar: null,
      socket: null,
      users: {},
    });

    new ChatAPI().getChat().then((data) => {
      const result = JSON.parse(data.response);
      result.map((item) => {
        console.log(item);
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
                  console.log(result);
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
        console.log(this.props.childComponents.dialogsPreview);
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
                  ? this.props.activeChatName
                  : ''
              }
            div.main__header-right
              button.button-only-icon.dropdown
                svg.button-only-icon__icon 
                  use(xlink:href="../../assets/sprite.svg#setting")
                .dropdown-content
                  .dropdown-content__item.dropdown-content__item--add-user Добавить пользователя
                  .dropdown-content__item.dropdown-content__item--delete-user Удалить пользователя
                  .dropdown-content__item.dropdown-content__item--create-chat Создать чат
                  .dropdown-content__item.dropdown-content__item--delete-chat Удалить чат
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
    const { dialogsPreview, buttons, inputs } =
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

    layout.querySelector('.main__body')?.innerHTML = '';
    for (let i = 0; i < messages.length; i++) {
      layout
        .querySelector('.main__body')
        ?.append(messages[i].getContent());
    }

    layout
      .querySelector('.main__footer-middle')
      ?.append(inputs.messageArea.getContent());

    const messagesWrapper = layout.querySelector('.main__body');
    messagesWrapper.scrollTop = messagesWrapper.scrollHeight;

    return layout.firstChild;
  }
}
