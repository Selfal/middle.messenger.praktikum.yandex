import './style.scss';

import IButton from './interface';
import pug from 'pug';

import Block from '../../utils/Block';

export class Button extends Block {
  readonly props: IButton;

  constructor(props: IButton) {
    super('a', props);
  }

  render() {
    const { text, link = '#', primary = false }: IButton = this.props;

    let { className }: IButton = this.props;

    if (className[0] !== '.') {
      className = `.${className}`;
    }

    const node = pug.compile(
      `a.button.${
        primary ? 'button--primary' : 'button--secondary'
      }${className}(href="${link}") ${text}`,
    );
    return node(this.props);
  }
}
