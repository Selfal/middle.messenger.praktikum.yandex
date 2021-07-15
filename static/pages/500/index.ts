import * as pug from 'pug';

import Block from '../../utils/Block';

import './style.scss';

export class Page500 extends Block {
  constructor() {
    super('main', {});
  }

  render() {
    const component = pug.compile(
      `<h1 class="error-title">500</h1>
    <div class="error-text">Такой страницы не существует</div>`,
    );

    let layout = document.createElement('main');
    layout.innerHTML = component();
    layout = layout.firstChild as HTMLElement;
    return layout;
  }
}
