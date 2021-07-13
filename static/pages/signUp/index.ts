import * as pug from 'pug';

import Block from '../../utils/Block';
import { Button } from '../../components/Button/index';
import { Input } from '../../components/Input/index';
import validate from '../../utils/validate';
import { render } from '../../utils/renderDOM';
import { router } from '../../index';
import { regExpList } from '../../constants';
import AuthAPI from '../../api/auth';

import './style.scss';

export default class SignUp extends Block {
  constructor() {
    super('main', {
      childComponents: {
        inputs: [
          new Input({
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
          }),
          new Input({
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
          }),
          new Input({
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
          }),
          new Input({
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
          }),
          new Input({
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
          }),
          new Input({
            label: 'Пароль',
            placeholder: 'Введите свой пароль',
            className: '.input-component__input',
            name: 'password',
            type: 'password',
            warning: 'Пароль не соответствует требованиям',
            events: {
              input: (e: Event): string => {
                const item = e.target as HTMLInputElement;
                this.props.childComponents.inputs[6].setProps({
                  re: new RegExp(`${item.value}`),
                });
                return item.value;
              },
            },
            re: regExpList.newPassword,
          }),
          new Input({
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
          }),
        ],
        buttons: [
          new Button({
            text: 'Создать аккаунт',
            className: 'auth-form__button-create',
            primary: true,
            events: {
              click: (e): void => {
                console.log('test click');
                e.preventDefault();
                const inputEmail =
                  this.props.childComponents.inputs[0];
                const inputLogin =
                  this.props.childComponents.inputs[1];
                const inputPhone =
                  this.props.childComponents.inputs[2];
                const inputFirstName =
                  this.props.childComponents.inputs[3];
                const inputLastName =
                  this.props.childComponents.inputs[4];
                const inputPassword =
                  this.props.childComponents.inputs[5];
                const inputRepeatPassword =
                  this.props.childComponents.inputs[6];

                const email: boolean = validate(
                  inputEmail.element.querySelector('input')?.value,
                  inputEmail.props.re,
                );
                const login: boolean = validate(
                  inputLogin.element.querySelector('input')?.value,
                  inputLogin.props.re,
                );
                const phone: boolean = validate(
                  inputPhone.element.querySelector('input')?.value,
                  inputPhone.props.re,
                );
                const firstName: boolean = validate(
                  inputFirstName.element.querySelector('input')
                    ?.value,
                  inputFirstName.props.re,
                );
                const lastName: boolean = validate(
                  inputLastName.element.querySelector('input')?.value,
                  inputLastName.props.re,
                );
                const password: boolean = validate(
                  inputPassword.element.querySelector('input')?.value,
                  inputPassword.props.re,
                );
                const repeatPassword: boolean = validate(
                  inputRepeatPassword.element.querySelector('input')
                    ?.value,
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

                if (
                  email &&
                  login &&
                  phone &&
                  firstName &&
                  lastName &&
                  password &&
                  repeatPassword
                ) {
                  const options = {
                    first_name:
                      inputFirstName.element.querySelector('input')
                        ?.value,
                    second_name:
                      inputLastName.element.querySelector('input')
                        ?.value,
                    login:
                      inputLogin.element.querySelector('input')
                        ?.value,
                    email:
                      inputEmail.element.querySelector('input')
                        ?.value,
                    password:
                      inputPassword.element.querySelector('input')
                        ?.value,
                    phone:
                      inputPhone.element.querySelector('input')
                        ?.value,
                  };
                  console.log(options);
                  new AuthAPI()
                    .signUp(options)
                    .then(() => {
                      router.go('/');
                    })
                    .catch((err: Error) => {
                      console.log(new Error('Ошибка: ', err));
                    });
                }
              },
            },
          }),
          new Button({
            text: 'Войти',
            className: '.auth-form__create-account.link',
            events: {
              click: (e) => {
                e.preventDefault();
                router.go('/');
              },
            },
          }),
        ],
      },
    });
  }

  render() {
    const template: string = `div.sign-up.wrapper
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

    const component: string = pug.compile(template);
    let result = document.createElement('div');
    result.innerHTML = component();
    result = result.firstChild;

    for (
      let i = 0;
      i < this.props.childComponents.inputs.length;
      i++
    ) {
      result
        .querySelector('.auth-form__body')
        ?.append(this.props.childComponents.inputs[i].getContent());
    }

    for (
      let i = 0;
      i < this.props.childComponents.buttons.length;
      i++
    ) {
      console.log(this.props.childComponents.buttons[i]);
      result
        .querySelector('.auth-form__footer')
        ?.append(this.props.childComponents.buttons[i].getContent());
    }

    return result;
  }
}
