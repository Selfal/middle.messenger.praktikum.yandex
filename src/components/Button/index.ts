import * as pug from 'pug';
import './style.scss';
import IButton from './interface';
import Block from '../../utils/Block';

export class Button extends Block {
  constructor(props: IButton) {
    super('a', {
      ...props,
    });
  }

  render(): HTMLElement {
    const {
      text,
      link = '#',
      primary = false,
    } = this.props as IButton;

    let { className } = this.props as IButton;
    if (!className?.startsWith('.')) {
      className = `.${className}`;
    }

    const component = pug.compile(
      `a.button.${
        primary ? 'button--primary' : 'button--secondary'
      }${className}(href="${link}") ${text}`,
    );

    const result = document.createElement('div');
    result.innerHTML = component();
    return result.firstChild as HTMLElement;
  }
}
