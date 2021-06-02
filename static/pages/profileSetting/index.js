import pug from 'pug'
import './style.scss'
import {Input} from '../../components/Input'

const inputContainer = document.querySelector('.user-info')
let dataInputs = [
  {
    labelName: 'Логин',
    placeholder: 'Начните ввод',
    nameItem: 'login',
    value: 'oleg.antimonov@bk.ru',
    disabled: true
  },

  {
    labelName: 'Имя',
    placeholder: 'Начните ввод',
    nameItem: 'name',
    value: 'Олег',
    disabled: true
  },

  {
    labelName: 'Фамилия',
    placeholder: 'Начните ввод',
    nameItem: 'last-name',
    value: 'Антимонов',
    disabled: true
  },

  {
    labelName: 'Имя в чате',
    placeholder: 'Начните ввод',
    nameItem: 'username',
    value: 'Антимонов Олег',
    disabled: true
  },

  {
    labelName: 'Телефон',
    placeholder: 'Начните ввод',
    nameItem: 'tel',
    value: '+79998781414',
    disabled: true
  }
]

let dataInputsPassword = [
  {
    labelName: 'Старый пароль',
    placeholder: 'Начните ввод',
    nameItem: 'old-password',
    value: '',
    disabled: false
  },
  {
    labelName: 'Новый пароль',
    placeholder: 'Начните ввод',
    nameItem: 'new-password',
    value: '',
    disabled: false
  },
  {
    labelName: 'Повторите пароль',
    placeholder: 'Начните ввод',
    nameItem: 're-password',
    value: '',
    disabled: false
  },
]

const generateInputsProfile = (inputs) => {
  return `
${pug.render(Input(inputs[0]))}
${pug.render(Input(inputs[1]))}
${pug.render(Input(inputs[2]))}
${pug.render(Input(inputs[3]))}
${pug.render(Input(inputs[4]))}
  `
}

const generateInputsPassword = (inputs) => {
  return `
${pug.render(Input(inputs[0]))}
${pug.render(Input(inputs[1]))}
${pug.render(Input(inputs[2]))}
  `
}
inputContainer.innerHTML = pug.render(generateInputsProfile(dataInputs))

const editProfileButton = document.querySelector('.link--edit-profile')
const editPasswordButton = document.querySelector('.link--edit-password')

editProfileButton.addEventListener('click', (event) => {
  let buttonText = editProfileButton.textContent;

  if (buttonText === 'Редактировать профиль') {
    for (let i = 0; i < dataInputs.length; i++) {
      dataInputs[i].disabled = !dataInputs[i].disabled
    }
    inputContainer.innerHTML = pug.render(generateInputsProfile(dataInputs))
    editProfileButton.textContent = 'Сохранить изменения'
  } else {
    for (let i = 0; i < dataInputs.length; i++) {
      dataInputs[i].disabled = !dataInputs[i].disabled
    }
    const inputs = document.querySelectorAll('.input-component__input')
      let result = {}
      for (let i = 0; i < inputs.length; i++) {
        result[inputs[i].name] = inputs[i].value
      }
      console.log(result)
      inputContainer.innerHTML = pug.render(generateInputsProfile(dataInputs))
      editProfileButton.textContent = 'Редактировать профиль'
  }
  
})

editPasswordButton.addEventListener('click', (event) => {
  let buttonText = editPasswordButton.textContent;
  if (buttonText === 'Сохранить') {
    editPasswordButton.textContent = 'Изменить пароль'
    const inputs = document.querySelectorAll('.input-component__input')
    let result = {}
    for (let i = 0; i < inputs.length; i++) {
      result[inputs[i].name] = inputs[i].value
    }
    console.log(result)
    inputContainer.innerHTML = pug.render(generateInputsProfile(dataInputs))
  } else {
    editPasswordButton.textContent = 'Сохранить'
    inputContainer.innerHTML = pug.render(generateInputsPassword(dataInputsPassword))
  }
})

const avatarInput = document.querySelector('.avatar__input')
avatarInput.addEventListener('change', () => {
  console.log(avatarInput.value)
})