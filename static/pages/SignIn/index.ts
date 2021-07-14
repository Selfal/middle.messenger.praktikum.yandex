import * as pug from 'pug';

import Block from '../../utils/Block';
import ISignIn from './interface';
import { Input } from '../../components/Input/index';
import { Button } from '../../components/Button/index';
import validate from '../../utils/validate';
import { router } from '../../index';
import { regExpList } from '../../constants';
import AuthAPI from '../../api/auth';

import './style.scss';

export class SignIn extends Block {
  constructor() {
    super('main', {
      childComponents: {
        inputs: [
          new Input({
            label: 'Логин',
            placeholder: 'Введите свой логин',
            className: '.input-component__input',
            name: 'login',
            warning: 'Невалидный логин',
            type: 'text',
            events: {
              input: (e: Event): string => {
                const item = e.target as HTMLInputElement;
                return item.value;
              },
            },
            re: regExpList.login as RegExp,
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
                return item.value;
              },
            },
            re: regExpList.newPassword as RegExp,
          }),
        ],
        buttons: [
          new Button({
            text: 'Войти',
            className: 'auth-form__button',
            primary: true,
            events: {
              click: (e: Event) => {
                const { inputs } = this.props
                  .childComponents as ISignIn;
                const inputEmail = inputs[0];
                const inputPassword = inputs[1];
                const email: boolean = validate(
                  inputEmail.element.querySelector('input')?.value,
                  inputEmail.props.re as RegExp,
                );

                const password: boolean = validate(
                  inputPassword.element.querySelector('input')?.value,
                  inputPassword.props.re as RegExp,
                );

                if (!email) {
                  e.preventDefault();
                  inputEmail.setProps({ status: 'error' });
                }

                if (!password) {
                  e.preventDefault();
                  inputPassword.setProps({ status: 'error' });
                }

                if (email && password) {
                  e.preventDefault();
                  const options = {
                    login: inputEmail.element.querySelector('input')
                      ?.value as string,
                    password: inputPassword.element.querySelector(
                      'input',
                    )?.value as string,
                  };

                  new AuthAPI()
                    .signIn(options)
                    .then(() => {
                      new AuthAPI().getUserInfo().then((data) => {
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
                        localStorage.setItem(
                          'avatar',
                          userInfo.avatar,
                        );
                        router.go('/home');
                      });
                    })
                    .catch((err: Error) => {
                      inputEmail.setProps({
                        status: 'error',
                        warning: 'Неверный логин или пароль',
                      });
                      inputPassword.setProps({
                        status: 'error',
                        warning: 'Неверный логин или пароль',
                      });
                      new AuthAPI()
                        .getUserInfo()
                        // .then((res) => res.json())
                        .then((data) => {
                          console.log('user', data);
                        })
                        .catch(() => {
                          console.log(new Error('Ошибка: ', err));
                        });
                    });
                }
              },
            },
          }),
          new Button({
            text: 'Создать аккаунт',
            className: '.auth-form__create-account.link',
            events: {
              click: (e: Event): void => {
                e.preventDefault();
                router.go('/sign-up');
                console.log('click create');
              },
            },
          }),
        ],
        footerButtons: [
          new Button({
            text: 'Vk',
            link: '#',
            className: '.footer__link.link',
          }),
          new Button({
            text: 'Telegramm',
            link: './pages/404/index.html',
            className: '.footer__link.link',
          }),
          new Button({
            text: 'GitHub',
            link: './pages/500/index.html',
            className: '.footer__link.link',
          }),
          new Button({
            text: 'Список всех страниц',
            link: './pages/pagesList/index.html',
            className: '.footer__link.link',
          }),
        ],
      } as ISignIn,
    });
  }

  render() {
    const component = pug.compile(
      `div.sign-in.wrapper
    header.header 
      h2.logo Chatao
    main.main 
      form.auth-form
        h2.auth-form__title Вход 
    footer.footer 
      div.footer-links
    `,
    );

    let layout = document.createElement('main');
    layout.innerHTML = component();
    layout = layout.firstChild as HTMLElement;

    const { inputs, buttons, footerButtons } = this.props
      .childComponents as ISignIn;

    for (let i = 0; i < inputs.length; i++) {
      layout
        .querySelector('.auth-form')
        ?.append(inputs[i].getContent());
    }

    for (let i = 0; i < buttons.length; i++) {
      layout
        .querySelector('.auth-form')
        ?.append(buttons[i].getContent());
    }

    for (let i = 0; i < footerButtons.length; i++) {
      layout
        .querySelector('.footer-links')
        ?.append(footerButtons[i].getContent());
    }

    new AuthAPI().getUserInfo().then((data: object) => {
      console.log('user', data);
      const userInfo = JSON.parse(data.response);
      localStorage.setItem('email', userInfo.email);
      localStorage.setItem('first_name', userInfo.first_name);
      localStorage.setItem('id', userInfo.id);
      localStorage.setItem('login', userInfo.login);
      localStorage.setItem('phone', userInfo.phone);
      localStorage.setItem('second_name', userInfo.second_name);
      localStorage.setItem('display_name', userInfo.display_name);
      localStorage.setItem('avatar', userInfo.avatar);
      localStorage.setItem('second_name', userInfo.second_name);
      router.go('/home');
    });
    return layout;
  }
}
