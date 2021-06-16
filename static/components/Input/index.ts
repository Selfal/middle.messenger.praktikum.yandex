import './style.scss';

import IInput from './interface';
import pug from 'pug';
import validate from '../../utils/validate';

import Block from '../../utils/Block';

export class Input extends Block {
  readonly props: IInput;

  constructor(props: IInput) {
    super('label', {
      // ...props,
      label: props.label,
      type: props.type,
      placeholder: props.placeholder,
      name: props.name,
      value: props.value,
      warning: props.warning,
      disabled: props.disabled,
      re: props.re,
      events: {
        ...props.events,
        blur: (e) => {
          this.props.value = e.target.value;

          const validateResult = validate(
            e.target.value,
            this.props.re,
          );
          console.log('validate: ', validateResult);

          if (validateResult) {
            this.setProps({
              type: 'success',
              warning: '',
            });
          } else if (!validateResult) {
            this.setProps({
              type: 'error',
              warning: props.warning,
            });
          }
        },
        focus: (e) => {
          e.target.classList.remove('input-component__input--error');
          e.target.parentNode.querySelector(
            '.input-component__warning',
          ).innerHTML = '';
        },
      },
    });
  }

  get value() {
    return this.props.value;
  }

  render() {
    const {
      label,
      type = 'normal',
      placeholder,
      name,
      value,
      warning = '',
      disabled = false,
    } = this.props;

    let statusClass = '';
    if (type === 'success') {
      statusClass = '.input-component__input--success';
    } else if (type === 'error') {
      statusClass = '.input-component__input--error';
    }

    const test = pug.compile(`label.input-component
    span ${label}
    input(placeholder="${placeholder}" name="${name}" value="${
      value ? value : ''
    }" disabled=${disabled}).input-component__input${statusClass}
    span.input-component__warning ${type === 'error' ? warning : ''}
    `);

    return test();
  }
}
