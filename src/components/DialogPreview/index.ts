import * as pug from 'pug';
import './style.scss';
import { IDialogPreview } from './interface';
import Block from '../../utils/Block';
import sanitize from '../../utils/sanitize';

export class DialogPreview extends Block {
  constructor(props: IDialogPreview) {
    super('li', {
      ...props,
    });
  }

  render(): HTMLElement {
    const messageInfoTmp: string | boolean = this.props.missedNum
      ? `div.user-item__message-info ${this.props.missedNum}`
      : false;
    const avatarTmp: string = this.props.avatar
      ? `(src="${this.props.avatar}")`
      : '(src="../../assets/img/avatarPlaceholder.jpeg")';

    const component: pug.compileTemplate = pug.compile(`li.user-item${
      this.props.active ? '.user-item--active' : ''
    }(data-id="${this.props.id}" data-chatname="${
      this.props.chatName
    }" data-chatavatar="${this.props.avatar}")
    img.user-item__avatar${avatarTmp}
    div.user-item__content
      div.user-item__header
        div.user-item__name ${sanitize(this.props.dialogName)}
      div.user-item__body
        div.user-item__last-message ${sanitize(
          this.props.lastMessage,
        )}
        ${this.props.missedNum ? messageInfoTmp : ''}
    `);

    const test = document.createElement('div');
    test.innerHTML = component();
    return test.firstChild as HTMLElement;
  }
}
