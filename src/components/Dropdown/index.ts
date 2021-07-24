import * as pug from 'pug';
import './style.scss';
import IDropdown from './interface';
import Block from '../../utils/Block';

export class Dropdown extends Block {
  constructor(props: IDropdown) {
    super('div', {
      ...props,
    });
  }

  render(): HTMLElement {
    const menuItem = this.props.items;

    const component = pug.compile(`.dropdown-content`);
    const result = document.createElement('div');
    result.innerHTML = component();

    menuItem.map(
      (item: {
        name: string;
        events: Record<string, unknown>;
      }): HTMLElement => {
        const element = document.createElement('div');
        element.classList.add('dropdown-content__item');
        element.textContent = item.name;
        element.addEventListener('click', item.event);
        result.querySelector('.dropdown-content')?.append(element);
        return element;
      },
    );
    return result.firstChild as HTMLElement;
  }
}
