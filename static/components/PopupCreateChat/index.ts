import * as pug from 'pug';
import './style.scss';
import IPopupCreateChat from './interface';
import Block from '../../utils/Block';
import { regExpList } from '../../constants';
import { Input } from '../../components/Input/index';
import { Button } from '../../components/Button/index';
import ChatAPI from '../../api/chatApi';

export class PopupCreateChat extends Block {
  readonly props: IPopupCreateChat;

  constructor(props: IPopupCreateChat) {
    super('div', {
      ...props,

      events: {
        click: (e: Event) => {
          const target = e.target.classList.contains(
            'popup-create-chat-wrapper',
          );
          if (target) {
            this.setProps({ active: false });
          }
        },
      },
    });
  }

  render() {
    const component: pug.compileTemplate = pug.compile(
      `div.popup-create-chat-wrapper${
        this.props.active ? '.popup-create-chat-wrapper--active' : ''
      }
          div.popup-create-chat-body
            div.popup-create-chat-body__title ${this.props.title}
            div.popup-create-chat-body__input
            div.popup-create-chat-body__button`,
    );

    const layout = document.createElement('div');
    layout.innerHTML = component();

    layout
      .querySelector('.popup-create-chat-body__input')
      ?.append(this.props.input.getContent());

    layout
      .querySelector('.popup-create-chat-body__button')
      ?.append(this.props.button.getContent());

    return layout.firstChild;
  }
}
