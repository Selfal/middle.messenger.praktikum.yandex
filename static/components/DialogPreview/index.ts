import './style.scss';

// export const dialogPreview = ({
//   dialogName,
//   dateLastMessage,
//   lastMessage,
//   missedNum,
//   active,
//   avatar,
// }) => {
//   const messageInfoTmp = missedNum
//     ? `div.user-item__message-info ${missedNum}`
//     : false;
//   const avatarTmp = avatar
//     ? `(src="${avatar}")`
//     : '(src="../../assets/img/avatarPlaceholder.jpeg")';
//   return `li.user-item${active ? '.user-item--active' : ''}
//   img.user-item__avatar${avatarTmp}
//   div.user-item__content
//     div.user-item__header
//       div.user-item__name ${dialogName}
//       div.user-item__time ${dateLastMessage}
//     div.user-item__body
//       div.user-item__last-message ${lastMessage}
//       ${missedNum ? messageInfoTmp : ''}
//   `;
// };

import { IDialogPreview } from './interface';
import pug from 'pug';

import Block from '../../utils/Block';

export class DialogPreview extends Block {
  protected props: IDialogPreview;

  constructor(props: IDialogPreview) {
    super('div', props);
  }

  render() {
    const messageInfoTmp = this.props.missedNum
      ? `div.user-item__message-info ${this.props.missedNum}`
      : false;
    const avatarTmp = this.props.avatar
      ? `(src="${this.props.avatar}")`
      : '(src="../../assets/img/avatarPlaceholder.jpeg")';

    const test = pug.compile(`li.user-item${
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
    return test();
  }
}
