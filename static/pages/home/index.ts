import pug from 'pug';

import { DialogPreview } from '../../components/DialogPreview/index';
import { Message } from '../../components/Message/index';
import { render } from '../../utils/renderDOM';

export const home = (): string => {
  const template: string = `div.wrapper
      div.chat-menu
        div.chat-menu__header
          .input
            svg.input__icon
                use(xlink:href='../../assets/sprite.svg#search')
            input(type="text", placeholder="Поиск").search-input

          a.button.button--add(href="../profileSetting/index.html")
            svg.button__icon 
              use(xlink:href="../../assets/sprite.svg#profile")
        ul.chat-menu__body
          
      main.main 
        div.main__header
          div.main__header-left 
            img.chat-avatar(src="../../assets/img/message-img.jpeg")
          div.main__header-middle
            div.chat-name Сергеева Елизавета
          div.main__header-right
            button.button.dropdown
              svg.button__icon 
                use(xlink:href="../../assets/sprite.svg#setting")
              .dropdown-content
                .dropdown-content__item.dropdown-content__item--add-user Добавить пользователя
                .dropdown-content__item.dropdown-content__item--delete-user Удалить пользователя
        div.main__body

        div.main__footer
          div.main__footer-left
            button.button.button--add
              svg.button__icon 
                use(xlink:href="../../assets/sprite.svg#attach")
          div.main__footer-middle
            textarea(placeholder="Начните ввод").message-input
          div.main__footer-right
            button.button.button--add
              svg.button__icon 
                use(xlink:href="../../assets/sprite.svg#send")
  
      div.menu-chat 
        div.menu-chat__header 
        div.menu-chat__body 
        div.menu-chat__footer`;

  const result: string = pug.render(template);

  const app: HTMLElement = document.querySelector(
    '.app',
  ) as HTMLElement;
  app.innerHTML = result;

  return result;
};

home();

const dialogsArr: Array<
  Record<
    | 'dialogName'
    | 'dateLastMessage'
    | 'lastMessage'
    | 'missedNum'
    | 'active'
    | 'avatar',
    unknown
  >
> = [
  {
    dialogName: 'Сергеева Елизавета Ярославовна',
    dateLastMessage: '14.05.2021',
    lastMessage:
      'Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции обеспечивает широкому кругу (специалистов) участие в формировании направлений прогрессивного развития. С другой стороны постоянное информационно-пропагандистское обеспечение нашей деятельности играет важную роль в формировании форм развития. Разнообразный и богатый опыт укрепление и развитие структуры играет важную роль в формировании новых предложений.',
    missedNum: 12,
    active: true,
    avatar: '../../assets/img/message-img.jpeg',
  },
  {
    dialogName: 'Седов Артём Михайлович',
    dateLastMessage: '12.05.2021',
    lastMessage:
      'Разнообразный и богатый опыт сложившаяся структура организации требуют от нас анализа систем массового участия. Товарищи! дальнейшее развитие различных форм деятельности позволяет оценить значение существенных финансовых и административных условий. Не следует, однако забывать, что рамки и место обучения кадров влечет за собой процесс внедрения и модернизации новых предложений. Повседневная практика показывает, что реализация намеченных плановых заданий представляет собой интересный эксперимент проверки дальнейших направлений развития. С другой стороны сложившаяся структура организации обеспечивает широкому кругу (специалистов) участие в формировании форм развития. Значимость этих проблем настолько очевидна, что консультация с широким активом требуют определения и уточнения форм развития.',
    missedNum: 3,
    active: false,
    avatar: '',
  },
  {
    dialogName: 'Озеров Михаил Робертович',
    dateLastMessage: '10.05.2021',
    lastMessage:
      'Таким образом реализация намеченных плановых заданий способствует подготовки и реализации соответствующий условий активизации. С другой стороны консультация с широким активом играет важную роль в формировании модели развития.',
    missedNum: 1,
    active: false,
    avatar: '',
  },
  {
    dialogName: 'Игнатов Артём Анатольевич',
    dateLastMessage: '04.04.2021',
    lastMessage: 'Hello',
    missedNum: 0,
    active: false,
    avatar: '',
  },
  {
    dialogName: 'Карпова Дарья Данисовна',
    dateLastMessage: '04.04.2021',
    lastMessage: 'Hello',
    missedNum: 0,
    active: false,
    avatar: '',
  },
  {
    dialogName: 'Матвеев Ярослав Даниилович',
    dateLastMessage: '04.04.2021',
    lastMessage: 'Hello',
    missedNum: 0,
    active: false,
    avatar: '',
  },
  {
    dialogName: 'Чернышев Николай Саввич',
    dateLastMessage: '04.04.2021',
    lastMessage: 'Hello',
    missedNum: 0,
    active: false,
    avatar: '',
  },
  {
    dialogName: 'Афанасьева Виктория Тимофеевна',
    dateLastMessage: '04.04.2021',
    lastMessage: 'Hello',
    missedNum: 0,
    active: false,
    avatar: '',
  },
  {
    dialogName: 'Зайцев Константин Михайлович',
    dateLastMessage: '04.04.2021',
    lastMessage: 'Hello',
    missedNum: 0,
    active: false,
    avatar: '',
  },
  {
    dialogName: 'Кузнецова Ксения Тимофеевна',
    dateLastMessage: '04.04.2021',
    lastMessage: 'Hello',
    missedNum: 0,
    active: false,
    avatar: '',
  },
  {
    dialogName: 'Грачева Екатерина Николаевна',
    dateLastMessage: '04.04.2021',
    lastMessage: 'Hello',
    missedNum: 0,
    active: false,
    avatar: '',
  },
  {
    dialogName: 'Кочетова Алина Артёмовна',
    dateLastMessage: '04.04.2021',
    lastMessage: 'Hello',
    missedNum: 0,
    active: false,
    avatar: '',
  },
];

const messagesArr: Array<
  Record<
    'userAvatar' | 'userName' | 'messageText' | 'time' | 'img',
    unknown
  >
> = [
  {
    userAvatar: '../../assets/img/message-img.jpeg',
    userName: 'Сергеева Елизавета',
    messageText:
      'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    img: '',
    time: '06:59',
  },
  {
    userAvatar: '../../assets/img/my-avatar.jpeg',
    userName: 'Антимонов Олег',
    messageText:
      'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    img: '',
    time: '06:59',
  },
  {
    userAvatar: '../../assets/img/message-img.jpeg',
    userName: 'Сергеева Елизавета',
    messageText:
      'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    img: '',
    time: '06:59',
  },
  {
    userAvatar: '../../assets/img/my-avatar.jpeg',
    userName: 'Антимонов Олег',
    messageText:
      'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    img: '',
    time: '06:59',
  },
  {
    userAvatar: '../../assets/img/message-img.jpeg',
    userName: 'Сергеева Елизавета',
    messageText:
      'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    img: '../../assets/img/message-img.jpeg',
    time: '06:59',
  },
  {
    userAvatar: '../../assets/img/my-avatar.jpeg',
    userName: 'Антимонов Олег',
    messageText:
      'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    img: '',
    time: '06:59',
  },
  {
    userAvatar: '../../assets/img/message-img.jpeg',
    userName: 'Сергеева Елизавета',
    messageText:
      'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    img: '',
    time: '06:59',
  },
  {
    userAvatar: '../../assets/img/my-avatar.jpeg',
    userName: 'Антимонов Олег',
    messageText:
      'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    img: '',
    time: '06:59',
  },
  {
    userAvatar: '../../assets/img/message-img.jpeg',
    userName: 'Сергеева Елизавета',
    messageText:
      'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    img: '',
    time: '06:59',
  },
  {
    userAvatar: '../../assets/img/my-avatar.jpeg',
    userName: 'Антимонов Олег',
    messageText:
      'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    img: '',
    time: '06:59',
  },
  {
    userAvatar: '../../assets/img/message-img.jpeg',
    userName: 'Сергеева Елизавета',
    messageText:
      'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    img: '../../assets/img/message-img.jpeg',
    time: '06:59',
  },
  {
    userAvatar: '../../assets/img/my-avatar.jpeg',
    userName: 'Антимонов Олег',
    messageText:
      'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    img: '',
    time: '06:59',
  },
];

const messagesWrapper = document.querySelector(
  '.main__body',
) as HTMLElement;

messagesWrapper.scrollTop = messagesWrapper.scrollHeight;

const messageArea = document.querySelector(
  '.message-input',
) as HTMLElement;

messageArea.addEventListener('input', () => {
  messageArea.style.height = '5px';
  messageArea.style.height = `${messageArea.scrollHeight}px`;
});

const addUser = document.querySelector(
  '.dropdown-content__item--add-user',
) as HTMLElement;

const deleteUser = document.querySelector(
  '.dropdown-content__item--delete-user',
) as HTMLElement;

addUser.addEventListener('click', () => {
  console.log('popup add');
});

deleteUser.addEventListener('click', () => {
  console.log('popup delete');
});

for (let i = 0; i < dialogsArr.length; i++) {
  const item: Object = dialogsArr[i];
  render('.chat-menu__body', new DialogPreview(item));
}

for (let i = 0; i < messagesArr.length; i++) {
  const item: Object = messagesArr[i];
  render('.main__body', new Message(item));
}