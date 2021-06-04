import './style.scss'

export const Input = ({labelName, placeholder, nameItem, value, disabled}) => {
  return `label.input-component ${labelName}
  input(type="text" placeholder="${placeholder}" name="${nameItem}", value="${value}" ${disabled ? 'disabled' : ''}).input-component__input
  `
}

