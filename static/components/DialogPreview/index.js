import './style.scss'

export const DialogPreview = ({dialogName, dateLastMessage, lastMessage, missedNum, active, avatar}) => {
  const messageInfoTmp = missedNum ? `div.user-item__message-info ${missedNum}` : false
  const avatarTmp = avatar ? `(src="${avatar}")` : `(src="../../assets/img/avatarPlaceholder.jpeg")`
  return `li.user-item${active ? '.user-item--active' : ''}
  img.user-item__avatar${avatarTmp}
  div.user-item__content
    div.user-item__header
      div.user-item__name ${dialogName}
      div.user-item__time ${dateLastMessage}
    div.user-item__body
      div.user-item__last-message ${lastMessage}
      ${missedNum ? messageInfoTmp : ''}
  `
}