import * as pug from 'pug';
import { Input } from '../../components/Input/index';
import { Button } from '../../components/Button/index';
import { IconButton } from '../../components/IconButton/index';
import { AvatarInput } from '../../components/AvatarInput/index';
import validate from '../../utils/validate';
import { regExpList } from '../../constants';
import Block from '../../utils/Block';
import './style.scss';
import { router } from '../../index';
import AuthAPI from '../../api/auth';
import UserAPI from '../../api/userApi';
import IProfileSettings from './interface';

export class ProfileSettings extends Block {
  constructor() {
    super('div', {
      childComponents: {
        inputsInfo: [
          new Input({
            label: 'Логин',
            placeholder: 'Начните ввод',
            name: 'login',
            type: 'text',
            value: localStorage.getItem('login') || 'Начните ввод',
            disabled: true,
            warning: 'Невалидный логин',
            re: regExpList.login as RegExp,
          }),

          new Input({
            label: 'Имя',
            placeholder: 'Начните ввод',
            name: 'name',
            type: 'text',
            value:
              localStorage.getItem('first_name') || 'Начните ввод',
            disabled: true,
            warning: 'Невалидное имя',
            re: regExpList.firstName as RegExp,
          }),

          new Input({
            label: 'Фамилия',
            placeholder: 'Начните ввод',
            name: 'last-name',
            type: 'text',
            value:
              localStorage.getItem('second_name') || 'Начните ввод',
            disabled: true,
            warning: 'Невалидная фамилия',
            re: regExpList.lastName as RegExp,
          }),

          new Input({
            label: 'Имя в чате',
            placeholder: 'Начните ввод',
            name: 'username',
            type: 'text',
            value:
              localStorage.getItem('display_name') !== 'null'
                ? localStorage.getItem('display_name')
                : '',
            disabled: true,
            warning: 'Невалидное имя в чате',
            re: regExpList.userName as RegExp,
          }),

          new Input({
            label: 'Телефон',
            placeholder: 'Начните ввод',
            name: 'tel',
            type: 'phone',
            value: localStorage.getItem('phone') || 'Начните ввод',

            disabled: true,
            warning: 'Невалидный номер телефона',
            re: regExpList.phone as RegExp,
          }),

          new Input({
            label: 'email',
            placeholder: 'Начните ввод',
            name: 'email',
            type: 'email',
            value: localStorage.getItem('email') || 'Начните ввод',
            disabled: true,
            warning: 'Невалидная почта',
            re: regExpList.email as RegExp,
          }),
        ],
        inputsPassword: [
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
            re: regExpList.oldPassword as RegExp,
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
                const { inputsPassword } = this.props
                  .childComponents as IProfileSettings;
                inputsPassword[2].setProps({
                  re: new RegExp(`${item.value}`),
                });
                return item.value;
              },
            },
            warning: 'Пароль не соответствует требованиям',
            re: regExpList.newPassword as RegExp,
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
            re: / /,
            warning: 'Пароли не совпадают',
          }),
        ],
        buttons: {
          editProfileButton: new Button({
            text: 'Редактировать профиль',
            className: '.link.link--edit-profile',
            events: {
              click: (e: Event): void => {
                e.preventDefault();
                const { buttons, inputsInfo } = this.props
                  .childComponents as IProfileSettings;
                const {
                  editProfileButton,
                  editPasswordButton,
                  exitButton,
                  saveProfileButton,
                  canceleButton,
                } = buttons;

                editProfileButton.hide();
                editPasswordButton.hide();
                exitButton.hide();
                saveProfileButton.show();
                canceleButton.show();
                this.disabledElement(inputsInfo, false);
              },
            },
          }),
          saveProfileButton: new Button({
            text: 'Сохранить изменения',
            className: '.link.link--save-profile',
            events: {
              click: (e: Event): void => {
                e.preventDefault();
                let validateForm: boolean = true;
                const { buttons, inputsInfo } = this.props
                  .childComponents as IProfileSettings;
                const {
                  saveProfileButton,
                  canceleButton,
                  editProfileButton,
                  editPasswordButton,
                  exitButton,
                } = buttons;
                for (let i = 0; i < inputsInfo.length; i++) {
                  const item: Input = inputsInfo[i];
                  const check: boolean = validate(
                    item.value,
                    item.props.re as RegExp,
                  );

                  if (!check) {
                    item.setProps({ status: 'error' });
                    validateForm = false;
                  } else if (check) {
                    item.setProps({ status: 'success' });
                  }
                }

                if (validateForm) {
                  for (let i = 0; i < inputsInfo.length; i++) {
                    const item: Input = inputsInfo[i];
                    item.setProps({ status: 'normal' });
                  }

                  const options = {
                    login: inputsInfo[0].value,
                    first_name: inputsInfo[1].value,
                    second_name: inputsInfo[2].value,
                    display_name: inputsInfo[3].value,
                    phone: inputsInfo[4].value,
                    email: inputsInfo[5].value,
                  };

                  console.log(options);

                  new UserAPI().changeInfo(options).then((data) => {
                    const userInfo = JSON.parse(data.response);
                    localStorage.setItem('email', userInfo.email);
                    localStorage.setItem(
                      'first_name',
                      userInfo.first_name,
                    );
                    localStorage.setItem('id', userInfo.id);
                    localStorage.setItem('login', userInfo.login);
                    localStorage.setItem('phone', userInfo.phone);
                    localStorage.setItem(
                      'second_name',
                      userInfo.second_name,
                    );
                    localStorage.setItem(
                      'display_name',
                      userInfo.display_name,
                    );
                    localStorage.setItem('avatar', userInfo.avatar);
                    localStorage.setItem(
                      'second_name',
                      userInfo.second_name,
                    );
                  });

                  saveProfileButton.hide();
                  canceleButton.hide();
                  editProfileButton.show();
                  editPasswordButton.show();
                  exitButton.show();
                  this.disabledElement(inputsInfo, true);
                }
              },
            },
          }),
          editPasswordButton: new Button({
            text: 'Изменить пароль',
            className: '.link.link--edit-password',
            events: {
              click: (e: Event): void => {
                e.preventDefault();
                const { buttons, inputsInfo, inputsPassword } = this
                  .props.childComponents as IProfileSettings;
                const {
                  canceleButton,
                  editProfileButton,
                  editPasswordButton,
                  exitButton,
                  savePasswordButton,
                } = buttons;

                editProfileButton.hide();
                editPasswordButton.hide();
                exitButton.hide();
                this.hideElements(inputsInfo);
                this.showElements(inputsPassword, 'flex');
                savePasswordButton.show();
                canceleButton.show();
              },
            },
          }),
          savePasswordButton: new Button({
            text: 'Сохранить пароль',
            className: '.link.link--save-password',
            events: {
              click: (e: Event): void => {
                e.preventDefault();
                const { buttons, inputsInfo, inputsPassword } = this
                  .props.childComponents as IProfileSettings;
                const {
                  canceleButton,
                  editProfileButton,
                  editPasswordButton,
                  exitButton,
                  savePasswordButton,
                } = buttons;
                let validateForm: boolean = true;
                for (let i = 0; i < inputsPassword.length; i++) {
                  const item: Input = inputsPassword[i];
                  if (
                    !validate(item.value, item.props.re as RegExp)
                  ) {
                    validateForm = false;
                    item.setProps({ status: 'error' });
                  } else if (
                    validate(item.value, item.props.re as RegExp)
                  ) {
                    item.setProps({ status: 'success' });
                  }
                }

                console.log(validateForm);

                if (validateForm) {
                  const options = {
                    oldPassword: inputsPassword[0].value,
                    newPassword: inputsPassword[1].value,
                  };
                  console.log(options);
                  new UserAPI().changePassword(options);

                  for (let i = 0; i < inputsPassword.length; i++) {
                    const item: Input = inputsPassword[i];
                    item.setProps({ status: 'normal', value: '' });
                    console.log(item);
                  }

                  this.hideElements(inputsPassword);
                  this.showElements(inputsInfo, 'flex');

                  savePasswordButton.hide();
                  canceleButton.hide();
                  editProfileButton.show();
                  editPasswordButton.show();
                  exitButton.show();
                }
              },
            },
          }),
          exitButton: new Button({
            text: 'Выход',
            className: '.link.link--exit',
            events: {
              click: (e: Event) => {
                e.preventDefault();
                new AuthAPI().logoutUser().then((data) => {
                  console.log('logout: ', data);
                  router.go('/');
                });
              },
            },
          }),
          canceleButton: new Button({
            text: 'Отмена',
            className: '.link.link--back',
            events: {
              click: (e: Event): void => {
                e.preventDefault();
                const { buttons, inputsInfo, inputsPassword } = this
                  .props.childComponents as IProfileSettings;
                const {
                  saveProfileButton,
                  canceleButton,
                  editProfileButton,
                  editPasswordButton,
                  savePasswordButton,
                  exitButton,
                } = buttons;
                this.disabledElement(inputsInfo, true);
                this.hideElements(inputsPassword);
                this.showElements(inputsInfo, 'flex');
                canceleButton.hide();
                editProfileButton.hide();
                savePasswordButton.hide();
                saveProfileButton.hide();
                for (let i = 0; i < inputsInfo.length; i++) {
                  inputsInfo[i].setProps({
                    status: 'normal',
                  });
                }

                for (let i = 0; i < inputsPassword.length; i++) {
                  inputsPassword[i].setProps({
                    value: '',
                    status: 'normal',
                  });
                }

                editProfileButton.show();
                editPasswordButton.show();
                exitButton.show();
              },
            },
          }),
          backToChats: new IconButton({
            srcIcon: '../../assets/sprite.svg#left-arrow',
            className: 'back-to-chat',
            events: {
              click: (e: Event) => {
                e.preventDefault();
                router.go('/home');
              },
            },
          }),
        },
        avatarInput: new AvatarInput({
          src:
            localStorage.getItem('avatar') !== 'null'
              ? `https://ya-praktikum.tech/api/v2/resources/${localStorage.getItem(
                  'avatar',
                )}`
              : '../../assets/img/avatarPlaceholder.jpeg',
          events: {
            change: (e: Event) => {
              const { avatarInput } = this.props
                .childComponents as IProfileSettings;
              const target = e.target as HTMLInputElement;
              const formData = new FormData();
              formData.append('avatar', target.files[0]);
              console.log(formData);
              new UserAPI().changeAvatar(formData).then((data) => {
                const userInfo = JSON.parse(data.response);
                localStorage.setItem('avatar', userInfo.avatar);
                avatarInput.setProps({
                  src: `https://ya-praktikum.tech/api/v2/resources/${userInfo.avatar}`,
                });
              });
              console.log('hello avatar test');
            },
          },
        }),
      } as IProfileSettings,
    });
  }

  showElements(
    elements: Record<string, unknown>,
    showType?: 'flex' | 'div',
  ): void {
    for (let i = 0; i < elements.length; i++) {
      elements[i].show(showType);
    }
  }

  hideElements(elements): void {
    for (let i = 0; i < elements.length; i++) {
      elements[i].hide();
    }
  }

  disabledElement(elements, disabled: boolean): void {
    for (let i = 0; i < elements.length; i++) {
      const item = elements[i];
      item.setProps({ disabled });
    }
  }

  render() {
    const { buttons, inputsInfo, inputsPassword, avatarInput } = this
      .props.childComponents as IProfileSettings;
    const {
      editProfileButton,
      saveProfileButton,
      editPasswordButton,
      savePasswordButton,
      exitButton,
      canceleButton,
      backToChats,
    } = buttons;

    const component = pug.compile(
      `div.profile-settings.wrapper
    main.main 
      .name ${localStorage.getItem(
        'second_name',
      )} ${localStorage.getItem('first_name')}
      form.user-info
      .user-info-bottom `,
    );

    let layout = document.createElement('main');
    layout.innerHTML = component();
    layout = layout.firstChild as HTMLElement;

    layout
      .querySelector('.wrapper')
      ?.prepend(backToChats.getContent());

    layout
      .querySelector('.profile-settings')
      ?.prepend(backToChats.getContent());
    layout.querySelector('.main')?.prepend(avatarInput.getContent());

    for (let i = 0; i < inputsInfo.length; i++) {
      layout
        .querySelector('.user-info')
        ?.append(inputsInfo[i].getContent());
    }

    for (let i = 0; i < inputsPassword.length; i++) {
      layout
        .querySelector('.user-info')
        ?.append(inputsPassword[i].getContent());
    }

    this.hideElements(inputsPassword);

    layout
      .querySelector('.user-info-bottom')
      ?.append(editProfileButton.getContent());
    layout
      .querySelector('.user-info-bottom')
      ?.append(saveProfileButton.getContent());
    layout
      .querySelector('.user-info-bottom')
      ?.append(editPasswordButton.getContent());
    layout
      .querySelector('.user-info-bottom')
      ?.append(savePasswordButton.getContent());
    layout
      .querySelector('.user-info-bottom')
      ?.append(exitButton.getContent());
    layout
      .querySelector('.user-info-bottom')
      ?.append(canceleButton.getContent());

    canceleButton.hide();
    saveProfileButton.hide();
    savePasswordButton.hide();
    new AuthAPI().getUserInfo().catch(() => {
      router.go('/');
    });

    return layout.firstChild;
  }
}
