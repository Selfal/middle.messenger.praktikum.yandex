import pug from 'pug';
import './style.scss';
import { IDialogPreview } from './interface';
import Block from '../../utils/Block';

export class DialogPreview extends Block {
  readonly props: IDialogPreview;

  constructor(props: IDialogPreview) {
    super('div', props);
  }

  render(): string {
    const messageInfoTmp: string | boolean = this.props.missedNum
      ? `div.user-item__message-info ${this.props.missedNum}`
      : false;
    const avatarTmp: string = this.props.avatar
      ? `(src="${this.props.avatar}")`
      : '(src="../../assets/img/avatarPlaceholder.jpeg")';

    const component: pug.compileTemplate = pug.compile(`li.user-item${
      this.props.active ? '.user-item--active' : ''
    }
    img.user-item__avatar${avatarTmp}
    div.user-item__content
      div.user-item__header
        div.user-item__name ${this.props.dialogName}
        div.user-item__time ${this.props.dateLastMessage}
      div.user-item__body
        div.user-item__last-message ${this.props.lastMessage}
        ${this.props.missedNum ? messageInfoTmp : ''}
    `);

    const test = document.createElement('div');
    test.innerHTML = component();
    return test;
  }
}
