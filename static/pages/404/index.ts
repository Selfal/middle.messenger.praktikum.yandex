import * as pug from 'pug';

import Block from '../../utils/Block';

import './style.scss';

export class Page404 extends Block {
  constructor() {
    super('main', {});
  }

  render() {
    const component = pug.compile(
      `div
    h1.class="error-title" 404
    .class="error-text" Такой страницы не существует`,
    );

    let layout = document.createElement('main');
    layout.innerHTML = component();
    layout = layout.firstChild as HTMLElement;
    return layout;
  }
}
