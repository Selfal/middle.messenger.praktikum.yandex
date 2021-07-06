import pug from 'pug';

import Block from '../../utils/Block';
import { Input } from '../../components/Input/index';
import { Button } from '../../components/Button/index';
import validate from '../../utils/validate';
import { router } from '../../index';
import HTTPTool from '../../utils/HTTPTool';
import { regExpList } from '../../constants';

import './style.scss';

export class SignIn extends Block {
  constructor() {
    super('main', {
      childComponents: {
        inputs: [
          new Input({
            label: 'Email',
            placeholder: 'Введите свой email',
            className: '.input-component__input',
            name: 'email',
            warning: 'Невалидный email',
            type: 'email',
            events: {
              input: (e: Event): string => {
                console.log('test');
                const item = e.target as HTMLInputElement;
                return item.value;
              },
            },
            re: regExpList.email,
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
            re: regExpList.newPassword,
          }),
        ],
        buttons: [
          new Button({
            text: 'Войти',
            className: 'auth-form__button',
            primary: true,
            events: {
              click: (e: Event) => {
                const inputEmail =
                  this.props.childComponents.inputs[0];
                const inputPassword =
                  this.props.childComponents.inputs[1];
                const email: boolean = validate(
                  inputEmail.element.querySelector('input')?.value,
                  inputEmail.props.re,
                );

                const password: boolean = validate(
                  inputPassword.element.querySelector('input')?.value,
                  inputPassword.props.re,
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
                  router.go('/home');
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
      },
    });
  }

  render() {
    new HTTPTool()
      .get('https://jsonplaceholder.typicode.com', {
        data: { userId: 3 },
      })
      .then(({ response }) =>
        console.log('Ответ userId 3:', JSON.parse(response)),
      )
      .catch(console.log);

    new HTTPTool()
      .get('https://jsonplaceholder.typicode.com/posts', {
        data: { userId: 1 },
      })
      .then(({ response }) =>
        console.log('Ответ userId 1:', JSON.parse(response)),
      )
      .catch(console.log);

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
    layout = layout.firstChild;

    layout
      .querySelector('.auth-form')
      ?.append(this.props.childComponents.inputs[0].getContent());
    layout
      .querySelector('.auth-form')
      ?.append(this.props.childComponents.inputs[1].getContent());
    layout
      .querySelector('.auth-form')
      ?.append(this.props.childComponents.buttons[0].getContent());
    layout
      .querySelector('.auth-form')
      ?.append(this.props.childComponents.buttons[1].getContent());
    layout
      .querySelector('.footer-links')
      ?.append(
        this.props.childComponents.footerButtons[0].getContent(),
      );
    layout
      .querySelector('.footer-links')
      ?.append(
        this.props.childComponents.footerButtons[1].getContent(),
      );
    layout
      .querySelector('.footer-links')
      ?.append(
        this.props.childComponents.footerButtons[2].getContent(),
      );
    layout
      .querySelector('.footer-links')
      ?.append(
        this.props.childComponents.footerButtons[3].getContent(),
      );
    return layout;
  }
}
