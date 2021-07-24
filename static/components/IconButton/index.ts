import * as pug from 'pug';
import './style.scss';
import IIconButton from './interface';
import Block from '../../utils/Block';

export class IconButton extends Block {
  constructor(props: IIconButton) {
    super('div', {
      ...props,
    });
  }

  render(): HTMLElement {
    const { srcIcon } = this.props as IIconButton;

    let { className } = this.props as IIconButton;

    if (!className?.startsWith('.')) {
      className = `.${className}`;
    }

    const component = pug.compile(
      `button.button-only-icon${className ? className : ''}
        svg.button-only-icon__icon 
          use(xlink:href="${srcIcon}")`,
    );

    const result = document.createElement('div');
    result.innerHTML = component();
    return result.firstChild as HTMLElement;
  }
}
