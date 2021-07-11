import * as pug from 'pug';
import './style.scss';
import IPopupCreateChat from './interface';
import Block from '../../utils/Block';

export class PopupCreateChat extends Block {
  readonly props: IPopupCreateChat;

  constructor(props: IPopupCreateChat) {
    super('div', props);
  }

  render() {
    const component: pug.compileTemplate = pug.compile(`div Hello`);

    const test = document.createElement('div');
    test.innerHTML = component();
    return test.firstChild;
  }
}
