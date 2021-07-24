import * as pug from 'pug';
import './style.scss';
import IMessage from './interface';
import Block from '../../utils/Block';
import sanitize from '../../utils/sanitize';
export class Message extends Block {
  readonly props: IMessage;

  constructor(props: IMessage) {
    super('div', props);
  }

  render(): HTMLElement {
    const imgTmp: string | boolean = this.props.img
      ? `img.message__img(src="${this.props.img}")`
      : false;

    const component: pug.compileTemplate = pug.compile(`div.message
    div.message-container 
      img.message__avatar(src="${
        this.props.userAvatar
          ? this.props.userAvatar
          : '../../assets/img/avatarPlaceholder.jpeg'
      }")
      div.message__body 
        div.message__body-header 
          div.message__user-name ${sanitize(this.props.userName)} 
          div.message__time ${this.props.time}
        ${this.props.img ? imgTmp : ''} 
        div.message__content ${sanitize(this.props.messageText)}`);

    const test = document.createElement('div');
    test.innerHTML = component();
    return test.firstChild as HTMLElement;
  }
}
