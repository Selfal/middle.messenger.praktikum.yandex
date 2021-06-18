import pug from 'pug';
import './style.scss';
import { Input } from '../../components/Input/index';
import { Button } from '../../components/Button/index';
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

        form.user-info
            
        .user-info-bottom `;

  const result: string = pug.render(template);

  const app = document.querySelector('.app') as HTMLElement;
  app.innerHTML = result;
  return result;
};

profileSetting();

const regExpList = {
  login: /^[A-zА-я]{1}[A-zА-я1-9]{2,20}$/,
  firstName: /^[A-zА-я]{1}[A-zА-я]{2,20}$/,
  lastName: /^[A-zА-я]{1}[A-zА-я]{2,20}$/,
  userName: /^[A-zА-я]{1}[A-zА-я]{2,20}$/,
  phone:
    /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im,
  oldPassword: /qwerty/,
  newPassword: /[A-Za-z0-9]{6,64}/,
};

const dataInputsProfile: Array<Input> = [
  new Input({
    label: 'Логин',
    placeholder: 'Начните ввод',
    name: 'login',
    type: 'text',
    value: 'Selfal',
    disabled: true,
    warning: 'Невалидный логин',
    re: regExpList.login,
  }),

  new Input({
    label: 'Имя',
    placeholder: 'Начните ввод',
    name: 'name',
    type: 'text',
    value: 'Олег',
    disabled: true,
    warning: 'Невалидное имя',
    re: regExpList.firstName,
  }),

  new Input({
    label: 'Фамилия',
    placeholder: 'Начните ввод',
    name: 'last-name',
    type: 'text',
    value: 'Антимонов',
    disabled: true,
    warning: 'Невалидная фамилия',
    re: regExpList.lastName,
  }),

  new Input({
    label: 'Имя в чате',
    placeholder: 'Начните ввод',
    name: 'username',
    type: 'text',
    value: 'Олег',
    disabled: true,
    warning: 'Невалидное имя в чате',
    re: regExpList.userName,
  }),

  new Input({
    label: 'Телефон',
    placeholder: 'Начните ввод',
    name: 'tel',
    type: 'phone',
    value: '+79998781414',
    disabled: true,
    warning: 'Невалидный номер телефона',
    re: regExpList.phone,
  }),
];

const dataInputsPassword: Array<Input> = [
  new Input({
    label: 'Старый пароль',
    placeholder: 'Начните ввод',
    name: 'old-password',
    type: 'password',
    value: '',
    events: {
      input: (e: Event): string => {
        const item = e.target as HTMLInputElement;
        return item.value;
      },
    },
    warning: 'Пароль неверный',
    re: regExpList.oldPassword,
  }),
  new Input({
    label: 'Новый пароль',
    placeholder: 'Начните ввод',
    name: 'new-password',
    type: 'password',
    value: '',
    events: {
      input: (e: Event): string => {
        const item = e.target as HTMLInputElement;
        dataInputsPassword[2].setProps({
          re: new RegExp(`${item.value}`),
        });
        return item.value;
      },
    },
    warning: 'Пароль не соответствует требованиям',
    re: regExpList.newPassword,
  }),
  new Input({
    label: 'Повторите пароль',
    placeholder: 'Начните ввод',
    name: 're-password',
    type: 'password',
    value: '',
    events: {
      input: (e: Event) => {
        const item = e.target as HTMLInputElement;
        return item.value;
      },
    },
    warning: 'Пароли не совпадают',
  }),
];

const cachDataInputProfile: Array<string> = [];

for (let i = 0; i < dataInputsProfile.length; i++) {
  const item: Input = dataInputsProfile[i];
  cachDataInputProfile.push(item.value);
}

const editProfileButton: Button = new Button({
  text: 'Редактировать профиль',
  className: '.link.link--edit-profile',
  events: {
    click: (): void => {
      for (let i = 0; i < dataInputsProfile.length; i++) {
        const item: Input = dataInputsProfile[i];
        cachDataInputProfile.push(item.value);
      }

      editProfileButton.hide();
      editPasswordButton.hide();
      exitButton.hide();
      saveProfileButton.show();
      canceleButton.show();
      disabledElement(dataInputsProfile, false);
    },
  },
});

const saveProfileButton: Button = new Button({
  text: 'Сохранить изменения',
  className: '.link.link--save-profile',
  events: {
    click: (): void => {
      let validateForm: boolean = true;
      for (let i = 0; i < dataInputsProfile.length; i++) {
        const item: Input = dataInputsProfile[i];
        const check: boolean = validate(item.value, item.props.re);

        if (!check) {
          item.setProps({ status: 'error' });
          validateForm = false;
        } else if (check) {
          item.setProps({ status: 'success' });
        }
      }

      if (validateForm) {
        for (let i = 0; i < dataInputsProfile.length; i++) {
          const item: Input = dataInputsProfile[i];
          item.setProps({ status: 'normal' });
          cachDataInputProfile.push(item.value);
        }

        saveProfileButton.hide();
        canceleButton.hide();
        editProfileButton.show();
        editPasswordButton.show();
        exitButton.show();
        disabledElement(dataInputsProfile, true);
      }
    },
  },
});

const editPasswordButton: Button = new Button({
  text: 'Изменить пароль',
  className: '.link.link--edit-password',
  events: {
    click: (): void => {
      editProfileButton.hide();
      editPasswordButton.hide();
      exitButton.hide();
      hideElements(dataInputsProfile);
      showElements(dataInputsPassword, 'flex');
      savePasswordButton.show();
      canceleButton.show();
    },
  },
});

const savePasswordButton: Button = new Button({
  text: 'Сохранить пароль',
  className: '.link.link--save-password',
  events: {
    click: (): void => {
      let validateForm: boolean = true;
      for (let i = 0; i < dataInputsPassword.length; i++) {
        const item: Input = dataInputsPassword[i];
        if (!validate(item.value, item.props.re)) {
          validateForm = false;
          item.setProps({ status: 'error' });
        } else if (validate(item.value, item.props.re)) {
          item.setProps({ status: 'success' });
        }
      }

      if (validateForm) {
        for (let i = 0; i < dataInputsPassword.length; i++) {
          const item: Input = dataInputsPassword[i];
          item.setProps({ status: 'normal', value: '' });
          console.log(item);
        }

        hideElements(dataInputsPassword);
        showElements(dataInputsProfile, 'flex');

        savePasswordButton.hide();
        canceleButton.hide();
        editProfileButton.show();
        editPasswordButton.show();
        exitButton.show();
      }
    },
  },
});

const exitButton: Button = new Button({
  text: 'Выход',
  className: '.link.link--exit',
  link: '../../index.html',
});

const canceleButton: Button = new Button({
  text: 'Отмена',
  className: '.link.link--back',
  events: {
    click: (): void => {
      disabledElement(dataInputsProfile, true);
      hideElements(dataInputsPassword);
      showElements(dataInputsProfile, 'flex');
      canceleButton.hide();
      editProfileButton.hide();
      savePasswordButton.hide();
      saveProfileButton.hide();
      for (let i = 0; i < dataInputsProfile.length; i++) {
        dataInputsProfile[i].setProps({
          value: cachDataInputProfile[i],
          status: 'normal',
        });
      }

      for (let i = 0; i < dataInputsPassword.length; i++) {
        dataInputsPassword[i].setProps({
          value: '',
          status: 'normal',
        });
      }

      editProfileButton.show();
      editPasswordButton.show();
      exitButton.show();
    },
  },
});

const showElements = (elements, showType?: 'flex' | 'div'): void => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].show(showType);
  }
};

const hideElements = (elements): void => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].hide();
  }
};

const disabledElement = (elements, disabled: boolean): void => {
  for (let i = 0; i < elements.length; i++) {
    const item = elements[i];
    item.setProps({ disabled });
  }
};

for (let i = 0; i < dataInputsProfile.length; i++) {
  render('.user-info', dataInputsProfile[i]);
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
