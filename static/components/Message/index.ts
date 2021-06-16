import './style.scss';

import IMessage from './interface';
import pug from 'pug';

import Block from '../../utils/Block';

export class Message extends Block {
  readonly props: IMessage;

  constructor(props: IMessage) {
    super('div', props);
  }

  render() {
    const imgTmp = this.props.img
      ? `img.message__img(src="${this.props.img}")`
      : false;

    const test = pug.compile(`div.message
    div.message-container 
      img.message__avatar(src="${this.props.userAvatar}")
      div.message__body 
        div.message__body-header 
          div.message__user-name ${this.props.userName} 
          div.message__time ${this.props.time}
        ${this.props.img ? imgTmp : ''} 
        div.message__content ${this.props.messageText}`);
    console.log('Input: ', test());
    return test();
  }
}
