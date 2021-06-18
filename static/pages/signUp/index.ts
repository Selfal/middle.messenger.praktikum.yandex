import pug from 'pug';
import './style.scss';

import { Button } from '../../components/Button/index';
import { Input } from '../../components/Input/index';
import validate from '../../utils/validate';
import { render } from '../../utils/renderDOM';

const regExpList: Record<
  | 'email'
  | 'login'
  | 'firstName'
  | 'lastName'
  | 'userName'
  | 'phone'
  | 'oldPassword'
  | 'newPassword',
  unknown
> = {
  email:
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  login: /^[A-zА-я]{1}[A-zА-я1-9]{2,20}$/,
  firstName: /^[A-zА-я]{1}[A-zА-я]{2,20}$/,
  lastName: /^[A-zА-я]{1}[A-zА-я]{2,20}$/,
  userName: /^[A-zА-я]{1}[A-zА-я]{2,20}$/,
  phone:
    /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im,
  oldPassword: /qwerty/,
  newPassword: /[A-Za-z0-9]{6,64}/,
};

const inputEmail: Input = new Input({
  label: 'Email',
  placeholder: 'Введите свой email',
  className: '.input-component__input',
  name: 'email',
  type: 'email',
  warning: 'Невалидный email',
  events: {
    input: (e: Event): string => {
      const item = e.target as HTMLInputElement;
      return item.value;
    },
  },
  re: regExpList.email,
});

const inputLogin: Input = new Input({
  label: 'Логин',
  placeholder: 'Введите свой логин',
  className: '.input-component__input',
  name: 'login',
  type: 'text',
  warning: 'Невалидный логин',
  events: {
    input: (e: Event): string => {
      const item = e.target as HTMLInputElement;
      return item.value;
    },
  },
  re: regExpList.login,
});

const inputPhone: Input = new Input({
  label: 'Телефон',
  placeholder: 'Введите свой телефон',
  className: '.input-component__input',
  name: 'phone',
  type: 'phone',
  warning: 'Невалидный номер телефона',
  events: {
    input: (e: Event): string => {
      const item = e.target as HTMLInputElement;
      return item.value;
    },
  },
  re: regExpList.phone,
});

const inputFirstName: Input = new Input({
  label: 'Имя',
  placeholder: 'Ведите свой телефон',
  className: '.input-component__input',
  name: 'first_name',
  type: 'text',
  warning: 'Невалидное имя',
  events: {
    input: (e: Event): string => {
      const item = e.target as HTMLInputElement;
      return item.value;
    },
  },
  re: regExpList.firstName,
});

const inputLastName: Input = new Input({
  label: 'Фамилия',
  placeholder: 'Введите свю фамилию',
  className: '.input-component__input',
  name: 'last_name',
  type: 'text',
  warning: 'Невалидная фамилия',
  events: {
    input: (e: Event): string => {
      const item = e.target as HTMLInputElement;
      return item.value;
    },
  },
  re: regExpList.lastName,
});

const inputPassword: Input = new Input({
  label: 'Пароль',
  placeholder: 'Введите свой пароль',
  className: '.input-component__input',
  name: 'password',
  type: 'password',
  warning: 'Пароль не соответствует требованиям',
  events: {
    input: (e: Event): string => {
      const item = e.target as HTMLInputElement;
      inputRepeatPassword.setProps({
        re: new RegExp(`${item.value}`),
      });
      return item.value;
    },
  },
  re: regExpList.newPassword,
});

const inputRepeatPassword: Input = new Input({
  label: 'Повторите пароль',
  placeholder: 'Введите повторно пароль',
  className: '.input-component__input',
  name: 'repeat_password',
  type: 'password',
  warning: 'Пароли не совпадают',
  events: {
    input: (e: Event): string => {
      const item = e.target as HTMLInputElement;
      return item.value;
    },
  },
});

const buttonCreate: Button = new Button({
  text: 'Создать аккаунт',
  link: '#',
  className: 'auth-form__button-create',
  primary: true,
  events: {
    click: (): void => {
      const email: boolean = validate(
        inputEmail.element.querySelector('input').value,
        inputEmail.props.re,
      );
      const login: boolean = validate(
        inputLogin.element.querySelector('input').value,
        inputLogin.props.re,
      );
      const phone: boolean = validate(
        inputPhone.element.querySelector('input').value,
        inputPhone.props.re,
      );
      const firstName: boolean = validate(
        inputFirstName.element.querySelector('input').value,
        inputFirstName.props.re,
      );
      const lastName: boolean = validate(
        inputLastName.element.querySelector('input').value,
        inputLastName.props.re,
      );
      const password: boolean = validate(
        inputPassword.element.querySelector('input').value,
        inputPassword.props.re,
      );
      const repeatPassword: boolean = validate(
        inputRepeatPassword.element.querySelector('input').value,
        inputRepeatPassword.props.re,
      );

      if (!email) {
        inputEmail.setProps({ status: 'error' });
      }

      if (!login) {
        inputLogin.setProps({ status: 'error' });
      }

      if (!phone) {
        inputPhone.setProps({ status: 'error' });
      }

      if (!firstName) {
        inputFirstName.setProps({ status: 'error' });
      }

      if (!lastName) {
        inputLastName.setProps({ status: 'error' });
      }

      if (!password) {
        inputPassword.setProps({ status: 'error' });
      }

      if (!repeatPassword) {
        inputRepeatPassword.setProps({ status: 'error' });
      }
    },
  },
});

const buttonLogIn: Button = new Button({
  text: 'Войти',
  link: '../../index.html',
  className: '.auth-form__create-account.link',
});

export const signUp = (): string => {
  const template: string = `div.wrapper
                      header.header 
                        a(href="/") 
                          h2.logo Chatao
                      main.main 
                        div.auth-form
                          div.auth-form__header
                            h2.auth-form__title Создать аккаунт

                          form.auth-form__body
                            
                          div.auth-form__footer 
                            
                      footer.footer 
                        div.footer-links
                          a.footer__link.link(href="#") Vk
                          a.footer__link.link(href="#") Telegramm
                          a.footer__link.link(href="#") GiHub
`;

  const result: string = pug.render(template);

  const app: HTMLElement | null = document.querySelector('.app');
  if (app) {
    app.innerHTML = result;
    return result;
  }

  return result;
};

signUp();

render('.auth-form__body', inputEmail);
render('.auth-form__body', inputLogin);
render('.auth-form__body', inputPhone);
render('.auth-form__body', inputFirstName);
render('.auth-form__body', inputLastName);
render('.auth-form__body', inputPassword);
render('.auth-form__body', inputRepeatPassword);

render('.auth-form__footer', buttonCreate);
render('.auth-form__footer', buttonLogIn);
