import * as pug from 'pug';
import ChatAPI from '../../api/chatApi';
import { DialogPreview } from '../../components/DialogPreview/index';
import { IconButton } from '../../components/IconButton/index';
import { Message } from '../../components/Message/index';
import { router } from '../../index';
import Block from '../../utils/Block';
import './style.scss';

export class Home extends Block {
  constructor() {
    super('main', {
      childComponents: {
        dialogsPreview: [
          /*
          new DialogPreview({
            dialogName: 'Сергеева Елизавета Ярославовна',
            dateLastMessage: '14.05.2021',
            lastMessage:
              'Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции обеспечивает широкому кругу (специалистов) участие в формировании направлений прогрессивного развития. С другой стороны постоянное информационно-пропагандистское обеспечение нашей деятельности играет важную роль в формировании форм развития. Разнообразный и богатый опыт укрепление и развитие структуры играет важную роль в формировании новых предложений.',
            missedNum: 12,
            active: true,
            avatar: '../../assets/img/message-img.jpeg',
          }),
          new DialogPreview({
            dialogName: 'Седов Артём Михайлович',
            dateLastMessage: '12.05.2021',
            lastMessage:
              'Разнообразный и богатый опыт сложившаяся структура организации требуют от нас анализа систем массового участия. Товарищи! дальнейшее развитие различных форм деятельности позволяет оценить значение существенных финансовых и административных условий. Не следует, однако забывать, что рамки и место обучения кадров влечет за собой процесс внедрения и модернизации новых предложений. Повседневная практика показывает, что реализация намеченных плановых заданий представляет собой интересный эксперимент проверки дальнейших направлений развития. С другой стороны сложившаяся структура организации обеспечивает широкому кругу (специалистов) участие в формировании форм развития. Значимость этих проблем настолько очевидна, что консультация с широким активом требуют определения и уточнения форм развития.',
            missedNum: 3,
            active: false,
            avatar: '',
          }),
          new DialogPreview({
            dialogName: 'Озеров Михаил Робертович',
            dateLastMessage: '10.05.2021',
            lastMessage:
              'Таким образом реализация намеченных плановых заданий способствует подготовки и реализации соответствующий условий активизации. С другой стороны консультация с широким активом играет важную роль в формировании модели развития.',
            missedNum: 1,
            active: false,
            avatar: '',
          }),
          new DialogPreview({
            dialogName: 'Игнатов Артём Анатольевич',
            dateLastMessage: '04.04.2021',
            lastMessage: 'Hello',
            missedNum: 0,
            active: false,
            avatar: '',
          }),
          new DialogPreview({
            dialogName: 'Карпова Дарья Данисовна',
            dateLastMessage: '04.04.2021',
            lastMessage: 'Hello',
            missedNum: 0,
            active: false,
            avatar: '',
          }),
          new DialogPreview({
            dialogName: 'Матвеев Ярослав Даниилович',
            dateLastMessage: '04.04.2021',
            lastMessage: 'Hello',
            missedNum: 0,
            active: false,
            avatar: '',
          }),
          new DialogPreview({
            dialogName: 'Чернышев Николай Саввич',
            dateLastMessage: '04.04.2021',
            lastMessage: 'Hello',
            missedNum: 0,
            active: false,
            avatar: '',
          }),
          new DialogPreview({
            dialogName: 'Афанасьева Виктория Тимофеевна',
            dateLastMessage: '04.04.2021',
            lastMessage: 'Hello',
            missedNum: 0,
            active: false,
            avatar: '',
          }),
          new DialogPreview({
            dialogName: 'Зайцев Константин Михайлович',
            dateLastMessage: '04.04.2021',
            lastMessage: 'Hello',
            missedNum: 0,
            active: false,
            avatar: '',
          }),
          new DialogPreview({
            dialogName: 'Кузнецова Ксения Тимофеевна',
            dateLastMessage: '04.04.2021',
            lastMessage: 'Hello',
            missedNum: 0,
            active: false,
            avatar: '',
          }),
          new DialogPreview({
            dialogName: 'Грачева Екатерина Николаевна',
            dateLastMessage: '04.04.2021',
            lastMessage: 'Hello',
            missedNum: 0,
            active: false,
            avatar: '',
          }),
          new DialogPreview({
            dialogName: 'Кочетова Алина Артёмовна',
            dateLastMessage: '04.04.2021',
            lastMessage: 'Hello',
            missedNum: 0,
            active: false,
            avatar: '',
          }),
          */
        ],
        messages: [
          /*
          new Message({
            userAvatar: '../../assets/img/message-img.jpeg',
            userName: 'Сергеева Елизавета',
            messageText:
              'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
            img: '',
            time: '06:59',
          }),
          new Message({
            userAvatar: '../../assets/img/my-avatar.jpeg',
            userName: `${localStorage.getItem(
              'second_name',
            )} ${localStorage.getItem('first_name')}`,
            messageText:
              'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
            img: '',
            time: '06:59',
          }),
          new Message({
            userAvatar: '../../assets/img/message-img.jpeg',
            userName: 'Сергеева Елизавета',
            messageText:
              'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
            img: '',
            time: '06:59',
          }),
          new Message({
            userAvatar: '../../assets/img/my-avatar.jpeg',
            userName: `${localStorage.getItem(
              'second_name',
            )} ${localStorage.getItem('first_name')}`,
            messageText:
              'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
            img: '',
            time: '06:59',
          }),
          new Message({
            userAvatar: '../../assets/img/message-img.jpeg',
            userName: 'Сергеева Елизавета',
            messageText:
              'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
            img: '../../assets/img/message-img.jpeg',
            time: '06:59',
          }),
          new Message({
            userAvatar: '../../assets/img/my-avatar.jpeg',
            userName: `${localStorage.getItem(
              'second_name',
            )} ${localStorage.getItem('first_name')}`,
            messageText:
              'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
            img: '',
            time: '06:59',
          }),
          new Message({
            userAvatar: '../../assets/img/message-img.jpeg',
            userName: 'Сергеева Елизавета',
            messageText:
              'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
            img: '',
            time: '06:59',
          }),
          new Message({
            userAvatar: '../../assets/img/my-avatar.jpeg',
            userName: `${localStorage.getItem(
              'second_name',
            )} ${localStorage.getItem('first_name')}`,
            messageText:
              'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
            img: '',
            time: '06:59',
          }),
          new Message({
            userAvatar: '../../assets/img/message-img.jpeg',
            userName: 'Сергеева Елизавета',
            messageText:
              'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
            img: '',
            time: '06:59',
          }),
          new Message({
            userAvatar: '../../assets/img/my-avatar.jpeg',
            userName: `${localStorage.getItem(
              'second_name',
            )} ${localStorage.getItem('first_name')}`,
            messageText:
              'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
            img: '',
            time: '06:59',
          }),
          new Message({
            userAvatar: '../../assets/img/message-img.jpeg',
            userName: 'Сергеева Елизавета',
            messageText:
              'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
            img: '../../assets/img/message-img.jpeg',
            time: '06:59',
          }),
          new Message({
            userAvatar: '../../assets/img/my-avatar.jpeg',
            userName: `${localStorage.getItem(
              'second_name',
            )} ${localStorage.getItem('first_name')}`,
            messageText:
              'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
            img: '',
            time: '06:59',
          }),
          */
        ],
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
          }),
          send: new IconButton({
            srcIcon: '../../assets/sprite.svg#send',
          }),
          attach: new IconButton({
            srcIcon: '../../assets/sprite.svg#attach',
          }),
        },
      },
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
              img.chat-avatar(src="../../assets/img/message-img.jpeg")
            div.main__header-middle
              div.chat-name Сергеева Елизавета
            div.main__header-right
              button.button-only-icon.dropdown
                svg.button-only-icon__icon 
                  use(xlink:href="../../assets/sprite.svg#setting")
                .dropdown-content
                  .dropdown-content__item.dropdown-content__item--add-user Добавить пользователя
                  .dropdown-content__item.dropdown-content__item--delete-user Удалить пользователя
                  .dropdown-content__item.dropdown-content__item--create-chat Создать чат
          div.main__body

          div.main__footer
            div.main__footer-left
              button.button-only-icon.button--add
                svg.button-only-icon__icon 
                  use(xlink:href="../../assets/sprite.svg#attach")
            div.main__footer-middle
              textarea(placeholder="Начните ввод").message-input
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
    layout = layout.firstChild;
    const { dialogsPreview, messages, buttons } =
      this.props.childComponents;

    new ChatAPI()
      .getChat()
      .then((data) => {
        const result = JSON.parse(data.response);
        result.map((item) => {
          console.log(item);
          console.log(JSON.parse(item.last_message).content);
          const component = new DialogPreview({
            dialogName: item.title,
            lastMessage:
              JSON.parse(item.last_message).content === null
                ? 'Сообщений нет'
                : JSON.parse(item.last_message).content,
            missedNum: item.unread_count,
            active: false,
            avatar: item.avatar
              ? `https://ya-praktikum.tech/api/v2/resources/${item.avatar}`
              : '',
            id: item.id,
            events: {
              click: (e: Event) => {
                const dialogs =
                  this.props.childComponents.dialogsPreview;
                // for (let i = 0; i < dialogs.length; i++) {
                //   this.props.childComponents.dialogsPreview[
                //     i
                //   ].setProps({
                //     active: false,
                //   });
                // }
                component.setProps({ active: true });
              },
            },
          });
          this.props.childComponents.dialogsPreview.push(component);
        });
      })
      .then(() => {
        for (let i = 0; i < dialogsPreview.length; i++) {
          layout
            .querySelector('.chat-menu__body')
            ?.append(dialogsPreview[i].getContent());
        }
      });

    new ChatAPI()
      .getToken(200)
      .then((data) => {
        const result = JSON.parse(data.response);
        console.log(result);
        return result;
      })
      .then((result) => {
        const socket = new WebSocket(
          `wss://ya-praktikum.tech/ws/chats/${localStorage.getItem(
            'id',
          )}/200/${result.token}`,
        );

        socket.addEventListener('open', () => {
          console.log('Соединение установлено');
          socket.send(
            JSON.stringify({
              content: '0',
              type: 'get old',
            }),
          );
        });

        socket.addEventListener('close', (event) => {
          if (event.wasClean) {
            console.log('Соединение закрыто чисто');
          } else {
            console.log('Обрыв соединения');
          }

          console.log(
            `Код: ${event.code} | Причина: ${event.reason}`,
          );
        });

        socket.addEventListener('message', (event) => {
          const data = JSON.parse(event.data);
          console.log('Получены данные', data);
          data.map((item) => {
            const component = new Message({
              // userAvatar: '../../assets/img/message-img.jpeg',
              userName: 'Сергеева Елизавета',
              messageText: item.content,
              time: '06:59',
            });
            this.props.childComponents.messages.push(component);
          });
          for (let i = 0; i < messages.length; i++) {
            layout
              .querySelector('.main__body')
              ?.append(messages[i].getContent());
          }
        });

        socket.addEventListener('error', (event) => {
          console.log('Ошибка', event.message);
        });
      });

    layout
      .querySelector('.chat-menu__header')
      ?.append(buttons.profileSettings.getContent());

    return layout;
  }
}
