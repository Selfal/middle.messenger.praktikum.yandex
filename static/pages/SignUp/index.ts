import * as pug from 'pug';

import Block from '../../utils/Block';
import { Button } from '../../components/Button/index';
import { Input } from '../../components/Input/index';
import validate from '../../utils/validate';
import { router } from '../../index';
import { regExpList } from '../../constants';
import AuthAPI from '../../api/auth';
import ISignUp from './interface';

import './style.scss';

export class SignUp extends Block {
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
            re: regExpList.email as RegExp,
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
            re: regExpList.login as RegExp,
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
            re: regExpList.phone as RegExp,
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
            re: regExpList.firstName as RegExp,
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
            re: regExpList.lastName as RegExp,
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
            re: regExpList.newPassword as RegExp,
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
                const { inputs } = this.props
                  .childComponents as ISignUp;
                e.preventDefault();
                const inputEmail = inputs[0];
                const inputLogin = inputs[1];
                const inputPhone = inputs[2];
                const inputFirstName = inputs[3];
                const inputLastName = inputs[4];
                const inputPassword = inputs[5];
                const inputRepeatPassword = inputs[6];

                const email: boolean = validate(
                  inputEmail.element.querySelector('input')?.value,
                  inputEmail.props.re as RegExp,
                );
                const login: boolean = validate(
                  inputLogin.element.querySelector('input')?.value,
                  inputLogin.props.re as RegExp,
                );
                const phone: boolean = validate(
                  inputPhone.element.querySelector('input')?.value,
                  inputPhone.props.re as RegExp,
                );
                const firstName: boolean = validate(
                  inputFirstName.element.querySelector('input')
                    ?.value,
                  inputFirstName.props.re as RegExp,
                );
                const lastName: boolean = validate(
                  inputLastName.element.querySelector('input')?.value,
                  inputLastName.props.re as RegExp,
                );
                const password: boolean = validate(
                  inputPassword.element.querySelector('input')?.value,
                  inputPassword.props.re as RegExp,
                );
                const repeatPassword: boolean = validate(
                  inputRepeatPassword.element.querySelector('input')
                    ?.value,
                  inputRepeatPassword.props.re as RegExp,
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
                    first_name: inputFirstName.element.querySelector(
                      'input',
                    )?.value as string,
                    second_name: inputLastName.element.querySelector(
                      'input',
                    )?.value as string,
                    login: inputLogin.element.querySelector('input')
                      ?.value as string,
                    email: inputEmail.element.querySelector('input')
                      ?.value as string,
                    password: inputPassword.element.querySelector(
                      'input',
                    )?.value as string,
                    phone: inputPhone.element.querySelector('input')
                      ?.value as string,
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
      } as ISignUp,
    });
  }

  render() {
    const component = pug.compile(
      `div.sign-up.wrapper
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
    `,
    );

    const { inputs, buttons } = this.props.childComponents as ISignUp;

    let layout = document.createElement('main');
    layout.innerHTML = component();
    layout = layout.firstChild as HTMLElement;

    for (let i = 0; i < inputs.length; i++) {
      layout
        .querySelector('.auth-form__body')
        ?.append(inputs[i].getContent());
    }

    for (let i = 0; i < buttons.length; i++) {
      console.log(buttons[i]);
      layout
        .querySelector('.auth-form__footer')
        ?.append(buttons[i].getContent());
    }

    return layout;
  }
}
