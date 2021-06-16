import pug from 'pug';
import './style.scss';

import { Input } from './components/Input';
import { Button } from './components/Button';
import validate from './utils/validate';
import { render } from './utils/renderDOM';

const inputEmail = new Input({
  label: 'Email',
  placeholder: 'Введите свой email',
  className: '.input-component__input',
  name: 'email',
  warning: 'Невалидный email',
  events: {
    input: (e) => e.target.value,
  },
  re: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
});

const inputPassword = new Input({
  label: 'Пароль',
  placeholder: 'Введите свой пароль',
  className: '.input-component__input',
  name: 'password',
  warning: 'Пароль не соответствует требованиям',
  events: {
    input: (e) => e.target.value;
  },
  re: /[A-Za-z0-9]{6,}/,
});

const buttonSignIn = new Button({
  text: 'Войти',
  link: './pages/home/index.html',
  className: 'auth-form__button',
  primary: true,
  events: {
    click: (e) => {
      const email = validate(
        inputEmail.element.querySelector('input').value,
        inputEmail.props.re,
      );

      const password = validate(
        inputPassword.element.querySelector('input').value,
        inputPassword.props.re,
      );

      if (!email) {
        e.preventDefault()
        inputEmail.setProps({ type: 'error' });
      }

      if (!password) {
        e.preventDefault()
        inputPassword.setProps({ type: 'error' });
      }
    },
  },
});

const buttonCreate = new Button({
  text: 'Создать аккаунт',
  link: './pages/signUp/index.html',
  className: '.auth-form__create-account.link',
});

const buttonVk = new Button({
  text: 'Vk',
  link: '#',
  className: '.footer__link.link',
});

const buttonTg = new Button({
  text: 'Telegramm',
  link: './pages/404/index.html',
  className: '.footer__link.link',
});

const buttonGitHub = new Button({
  text: 'GitHub',
  link: './pages/500/index.html',
  className: '.footer__link.link',
});

const buttonPageList = new Button({
  text: 'Список всех страниц',
  link: './pages/pagesList/index.html',
  className: '.footer__link.link',
});

export const signIn = (): string => {
  const template: string = `div.wrapper
  header.header 
    h2.logo Chatao
  main.main 
    div.auth-form
      h2.auth-form__title Вход 
  footer.footer 
    div.footer-links
`;

  const result: string = pug.render(template, {}, undefined);

  const app = document.querySelector('.app');
  app.innerHTML = result;
  return result;
};

signIn()
render('.auth-form', inputEmail);
render('.auth-form', inputPassword);
render('.auth-form', buttonSignIn);
render('.auth-form', buttonCreate);

render('.footer-links', buttonVk);
render('.footer-links', buttonTg);
render('.footer-links', buttonGitHub);
render('.footer-links', buttonPageList);





