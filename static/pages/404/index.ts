import * as pug from 'pug';

import Block from '../../utils/Block';
import { Button } from '../../components/Button/index';
import { router } from '../../index';

import './style.scss';

export class Page404 extends Block {
  constructor() {
    super('main', {
      button: new Button({
        text: 'Вернуться на главную страницу',
        events: {
          click: (e) => {
            e.preventDefault();
            router.go('/');
          },
        },
      }),
    });
  }

  render() {
    const component = pug.compile(
      `div.error-page
    h1.error-title 404
    .error-text Такой страницы не существует`,
    );

    let layout = document.createElement('main');
    layout.innerHTML = component();
    layout
      .querySelector('.error-page')
      ?.append(this.props.button.getContent());

    return layout.firstChild as HTMLElement;
  }
}
