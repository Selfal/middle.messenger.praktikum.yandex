import './style.scss'

export const Message = ({userAvatar, userName, messageText, img, time}) => {
  const imgTmp = img ? `img.message__img(src="${img}")` : false
  return `div.message
  div.message-container 
    img.message__avatar(src="${userAvatar}")
    div.message__body 
      div.message__body-header 
        div.message__user-name ${userName} 
        div.message__time ${time}
      ${img ? imgTmp : ''} 
      div.message__content ${messageText}`
}