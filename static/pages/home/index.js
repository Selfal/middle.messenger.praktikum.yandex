import pug from 'pug'

import {DialogPreview} from '../../components/DialogPreview'
import {Message} from '../../components/Message'

const messagesWrapper = document.querySelector('.main__body')
messagesWrapper.scrollTop = messagesWrapper.scrollHeight;

const messageArea = document.querySelector('.message-input')
messageArea.addEventListener('input', () => {
  messageArea.style.height = "5px";
  messageArea.style.height = (messageArea.scrollHeight)+"px";
})

const addUser = document.querySelector('.dropdown-content__item--add-user')
const deleteUser = document.querySelector('.dropdown-content__item--delete-user')
addUser.addEventListener('click', () => {
  console.log('popup add')
})

deleteUser.addEventListener('click', () => {
  console.log('popup delete')
})


const dialogsArr = [
  {
    dialogName: 'Сергеева Елизавета Ярославовна',
    dateLastMessage: '14.05.2021',
    lastMessage: 'Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции обеспечивает широкому кругу (специалистов) участие в формировании направлений прогрессивного развития. С другой стороны постоянное информационно-пропагандистское обеспечение нашей деятельности играет важную роль в формировании форм развития. Разнообразный и богатый опыт укрепление и развитие структуры играет важную роль в формировании новых предложений.',
    missedNum: '12',
    active: true,
    avatar: '../../assets/img/message-img.jpeg' 
  },
  {
    dialogName: 'Седов Артём Михайлович',
    dateLastMessage: '12.05.2021',
    lastMessage: 'Разнообразный и богатый опыт сложившаяся структура организации требуют от нас анализа систем массового участия. Товарищи! дальнейшее развитие различных форм деятельности позволяет оценить значение существенных финансовых и административных условий. Не следует, однако забывать, что рамки и место обучения кадров влечет за собой процесс внедрения и модернизации новых предложений. Повседневная практика показывает, что реализация намеченных плановых заданий представляет собой интересный эксперимент проверки дальнейших направлений развития. С другой стороны сложившаяся структура организации обеспечивает широкому кругу (специалистов) участие в формировании форм развития. Значимость этих проблем настолько очевидна, что консультация с широким активом требуют определения и уточнения форм развития.',
    missedNum: '3',
  },
  {
    dialogName: 'Озеров Михаил Робертович',
    dateLastMessage: '10.05.2021',
    lastMessage: 'Таким образом реализация намеченных плановых заданий способствует подготовки и реализации соответствующий условий активизации. С другой стороны консультация с широким активом играет важную роль в формировании модели развития.',
    missedNum: '1',
  },
  {
    dialogName: 'Игнатов Артём Анатольевич',
    dateLastMessage: '04.04.2021',
    lastMessage: 'Hello',
    missedNum: false,
  },
  {
    dialogName: 'Карпова Дарья Данисовна',
    dateLastMessage: '04.04.2021',
    lastMessage: 'Hello',
    missedNum: false,
  },
  {
    dialogName: 'Матвеев Ярослав Даниилович',
    dateLastMessage: '04.04.2021',
    lastMessage: 'Hello',
    missedNum: false,
  },
  {
    dialogName: 'Чернышев Николай Саввич',
    dateLastMessage: '04.04.2021',
    lastMessage: 'Hello',
    missedNum: false,
  },
  {
    dialogName: 'Афанасьева Виктория Тимофеевна',
    dateLastMessage: '04.04.2021',
    lastMessage: 'Hello',
    missedNum: false,
  },
  {
    dialogName: 'Зайцев Константин Михайлович',
    dateLastMessage: '04.04.2021',
    lastMessage: 'Hello',
    missedNum: false,
  },
  {
    dialogName: 'Кузнецова Ксения Тимофеевна',
    dateLastMessage: '04.04.2021',
    lastMessage: 'Hello',
    missedNum: false,
  },
  {
    dialogName: 'Грачева Екатерина Николаевна',
    dateLastMessage: '04.04.2021',
    lastMessage: 'Hello',
    missedNum: false,
  },
  {
    dialogName: 'Кочетова Алина Артёмовна',
    dateLastMessage: '04.04.2021',
    lastMessage: 'Hello',
    missedNum: false,
  },
]

const messagesArr = [ 
  {
    userAvatar: '../../assets/img/message-img.jpeg',
    userName: 'Сергеева Елизавета',
    messageText: 'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    time: '06:59'
  },
  {
    userAvatar: '../../assets/img/my-avatar.jpeg',
    userName: 'Антимонов Олег',
    messageText: 'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    time: '06:59'
  },
  {
    userAvatar: '../../assets/img/message-img.jpeg',
    userName: 'Сергеева Елизавета',
    messageText: 'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    time: '06:59'
  },
  {
    userAvatar: '../../assets/img/my-avatar.jpeg',
    userName: 'Антимонов Олег',
    messageText: 'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    time: '06:59'
  },
  {
    userAvatar: '../../assets/img/message-img.jpeg',
    userName: 'Сергеева Елизавета',
    messageText: 'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    img: '../../assets/img/message-img.jpeg',
    time: '06:59'
  },
  {
    userAvatar: '../../assets/img/my-avatar.jpeg',
    userName: 'Антимонов Олег',
    messageText: 'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    time: '06:59'
  },
  {
    userAvatar: '../../assets/img/message-img.jpeg',
    userName: 'Сергеева Елизавета',
    messageText: 'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    time: '06:59'
  },
  {
    userAvatar: '../../assets/img/my-avatar.jpeg',
    userName: 'Антимонов Олег',
    messageText: 'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    time: '06:59'
  },
  {
    userAvatar: '../../assets/img/message-img.jpeg',
    userName: 'Сергеева Елизавета',
    messageText: 'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    time: '06:59'
  },
  {
    userAvatar: '../../assets/img/my-avatar.jpeg',
    userName: 'Антимонов Олег',
    messageText: 'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    time: '06:59'
  },
  {
    userAvatar: '../../assets/img/message-img.jpeg',
    userName: 'Сергеева Елизавета',
    messageText: 'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    img: '../../assets/img/message-img.jpeg',
    time: '06:59'
  },
  {
    userAvatar: '../../assets/img/my-avatar.jpeg',
    userName: 'Антимонов Олег',
    messageText: 'Уж поверь моему слову, Грегори, мы бобов разводить не станем.',
    time: '06:59'
  },
]

const generateDialogList = (items) => {
  let result = ``
  for (let i = 0; i < items.length; i++) {
    result += `${DialogPreview(items[i])}\n`
  }
  return result
}

const generateMessageList = (items) => {
  let result = `.fix\n`
  for (let i = 0; i < items.length; i++) {
    result += `${Message(items[i])}\n`
  }
  return result
}

const dialogList = document.querySelector('.chat-menu__body')
const messageList = document.querySelector('.main__body')

dialogList.innerHTML = pug.render(generateDialogList(dialogsArr))
messageList.innerHTML = pug.render(generateMessageList(messagesArr))
