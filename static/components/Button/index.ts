import pug from 'pug';
import './style.scss';
import IButton from './interface';
import Block from '../../utils/Block';

export class Button extends Block {
  readonly props: IButton;

  constructor(props: IButton) {
    super('a', props);
  }

  render(): string {
    const {
      text,
      link = '#',
      primary = false,
    } = this.props as IButton;

    let { className } = this.props as IButton;

    if (className[0] !== '.') {
      className = `.${className}`;
    }

    const component = pug.compile(
      `a.button.${
        primary ? 'button--primary' : 'button--secondary'
      }${className}(href="${link}") ${text}`,
    );
    return component(this.props);
  }
}
