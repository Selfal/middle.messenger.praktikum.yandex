import './style.scss';
import pug from 'pug';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { render } from '../../utils/renderDOM';
import validate from '../../utils/validate';

export const profileSetting = (): string => {
  const template: string = `.wrapper
      a.button-back(href="../home/index.html") 
        svg.button__icon 
          use(xlink:href="../../assets/sprite.svg#left-arrow")
      main.main 
        label.avatar
          img.avatar__img(src="../../assets/img/my-avatar.jpeg") 
          input.avatar__input(type="file")
        .name Антимонов Олег

        .user-info
            
        .user-info-bottom `;

  const result: string = pug.render(template, {}, undefined);

  const app = document.querySelector('.app');
  app.innerHTML = result;
  return result;
};

profileSetting();

const dataInputs = [
  new Input({
    label: 'Логин',
    placeholder: 'Начните ввод',
    name: 'login',
    value: 'Selfal',
    disabled: true,
    warning: 'Невалидный логин',
    re: /^[A-zА-я]{1}[A-zА-я1-9]{2,20}$/,
  }),

  new Input({
    label: 'Имя',
    placeholder: 'Начните ввод',
    name: 'name',
    value: 'Олег',
    disabled: true,
    warning: 'Невалидное имя',
    re: /^[A-zА-я]{1}[A-zА-я]{2,20}$/,
  }),

  new Input({
    label: 'Фамилия',
    placeholder: 'Начните ввод',
    name: 'last-name',
    value: 'Антимонов',
    disabled: true,
    warning: 'Невалидная фамилия',
    re: /^[A-zА-я]{1}[A-zА-я]{2,20}$/,
  }),

  new Input({
    label: 'Имя в чате',
    placeholder: 'Начните ввод',
    name: 'username',
    value: 'Антимонов Олег',
    disabled: true,
    warning: 'Невалидное имя в чате',
    re: /^[A-zА-я]{1}[A-zА-я]{2,20}$/,
  }),

  new Input({
    label: 'Телефон',
    placeholder: 'Начните ввод',
    name: 'tel',
    value: '+79998781414',
    disabled: true,
    warning: 'Невалидный номер телефона',
    re: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
  }),
];

const dataInputsPassword = [
  new Input({
    label: 'Старый пароль',
    placeholder: 'Начните ввод',
    name: 'old-password',
    value: '',
    events: {
      input: (e) => e.target.value,
    },
    warning: 'Пароль неверный',
    re: /qwerty/,
  }),
  new Input({
    label: 'Новый пароль',
    placeholder: 'Начните ввод',
    name: 'new-password',
    value: '',
    events: {
      input: (e) => {
        e.target.value;
        dataInputsPassword[2].setProps({
          re: new RegExp(`${e.target.value}`),
        });
      },
    },
    warning: 'Пароль не соответствует требованиям',
    re: /[A-Za-z0-9]{6,64}/,
  }),
  new Input({
    label: 'Повторите пароль',
    placeholder: 'Начните ввод',
    name: 're-password',
    value: '',
    events: {
      input: (e) => e.target.value,
    },
    warning: 'Пароли не совпадают',
    re: / /,
  }),
];

const cachDataInputProfile = [];
for (let i = 0; i < dataInputs.length; i++) {
  const item = dataInputs[i];
  cachDataInputProfile.push(item.value);
}

const editProfileButton = new Button({
  text: 'Редактировать профиль',
  className: '.link.link--edit-profile',
  events: {
    click: () => {
      for (let i = 0; i < dataInputs.length; i++) {
        const item = dataInputs[i];
        cachDataInputProfile.push(item.value);
      }

      editProfileButton.hide();
      editPasswordButton.hide();
      exitButton.hide();
      saveProfileButton.show();
      canceleButton.show();
      disabledElement(dataInputs, false);
    },
  },
});

const saveProfileButton = new Button({
  text: 'Сохранить изменения',
  className: '.link.link--save-profile',
  events: {
    click: () => {
      let validateForm: boolean = true;
      for (let i = 0; i < dataInputs.length; i++) {
        if (!validate(dataInputs[i].value, dataInputs[i].props.re)) {
          validateForm = false;
        }
      }

      if (validateForm) {
        for (let i = 0; i < dataInputs.length; i++) {
          const item = dataInputs[i];
          item.setProps({ type: 'normal' });
          cachDataInputProfile.push(item.value);
          console.log(item);
        }

        saveProfileButton.hide();
        canceleButton.hide();
        editProfileButton.show();
        editPasswordButton.show();
        exitButton.show();
        disabledElement(dataInputs, true);
      }
    },
  },
});

const editPasswordButton = new Button({
  text: 'Изменить пароль',
  className: '.link.link--edit-password',
  events: {
    click: () => {
      editProfileButton.hide();
      editPasswordButton.hide();
      exitButton.hide();
      hideElements(dataInputs);
      showElements(dataInputsPassword, 'flex');
      savePasswordButton.show();
      canceleButton.show();
    },
  },
});

const savePasswordButton = new Button({
  text: 'Сохранить пароль',
  className: '.link.link--save-password',
  events: {
    click: () => {
      let validateForm: boolean = true;
      for (let i = 0; i < dataInputsPassword.length; i++) {
        const item = dataInputsPassword[i];
        if (!validate(item.value, item.props.re)) {
          validateForm = false;
          item.setProps({ type: 'error' });
        } else if (validate(item.value, item.props.re)) {
          item.setProps({ type: 'success' });
        }
      }

      if (validateForm) {
        for (let i = 0; i < dataInputsPassword.length; i++) {
          const item = dataInputsPassword[i];
          item.setProps({ type: 'normal', value: '' });
          cachDataInputProfile.push(item.value);
          console.log(item);
        }

        hideElements(dataInputsPassword);
        showElements(dataInputs, 'flex');

        savePasswordButton.hide();
        canceleButton.hide();
        editProfileButton.show();
        editPasswordButton.show();
        exitButton.show();
      }
    },
  },
});

const exitButton = new Button({
  text: 'Выход',
  className: '.link.link--exit',
  link: '../../index.html',
});

const canceleButton = new Button({
  text: 'Отмена',
  className: '.link.link--back',
  events: {
    click: () => {
      disabledElement(dataInputs, true);
      hideElements(dataInputsPassword);
      showElements(dataInputs, 'flex');
      canceleButton.hide();
      editProfileButton.hide();
      savePasswordButton.hide();
      saveProfileButton.hide();
      for (let i = 0; i < dataInputs.length; i++) {
        dataInputs[i].setProps({
          value: cachDataInputProfile[i],
          type: 'normal',
        });
      }

      for (let i = 0; i < dataInputsPassword.length; i++) {
        dataInputsPassword[i].setProps({
          value: '',
          type: 'normal',
        });
      }

      editProfileButton.show();
      editPasswordButton.show();
      exitButton.show();
    },
  },
});

const showElements = (elements, showType?: 'flex' | 'div') => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].show(showType);
  }
};

const hideElements = (elements) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].hide();
  }
};

const disabledElement = (elements, disabled) => {
  for (let i = 0; i < elements.length; i++) {
    const item = elements[i];
    item.setProps({ disabled: disabled });
  }
};

for (let i = 0; i < dataInputs.length; i++) {
  render('.user-info', dataInputs[i]);
}

for (let i = 0; i < dataInputsPassword.length; i++) {
  render('.user-info', dataInputsPassword[i]);
  dataInputsPassword[i].hide();
}

render('.user-info-bottom', editProfileButton);
render('.user-info-bottom', saveProfileButton);
render('.user-info-bottom', editPasswordButton);
render('.user-info-bottom', savePasswordButton);
render('.user-info-bottom', exitButton);
render('.user-info-bottom', canceleButton);

canceleButton.hide();
saveProfileButton.hide();
savePasswordButton.hide();
