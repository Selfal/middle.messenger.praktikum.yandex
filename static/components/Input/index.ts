import pug from 'pug';
import './style.scss';
import IInput from './interface';
import Block from '../../utils/Block';
import validate from '../../utils/validate';

export class Input extends Block {
  readonly props: IInput;

  constructor(props: IInput) {
    super('label', {
      label: props.label,
      status: props.status,
      placeholder: props.placeholder,
      name: props.name,
      value: props.value,
      warning: props.warning,
      disabled: props.disabled,
      type: props.type,
      re: props.re,
      events: {
        ...props.events,
        blur: (e: Event) => {
          const element = e.target as HTMLInputElement;
          this.props.value = element.value;

          const validateResult = validate(
            element.value,
            this.props.re,
          );
          console.log('validate: ', validateResult);

          if (validateResult) {
            this.setProps({
              status: 'success',
              warning: '',
            });
          } else if (!validateResult) {
            this.setProps({
              status: 'error',
              warning: props.warning,
            });
          }
        },
        focus: (e: Event) => {
          const element = e.target as HTMLInputElement;
          element.classList.remove('input-component__input--error');
          element.parentNode.querySelector(
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
      status = 'normal',
      placeholder,
      name,
      value,
      warning = '',
      disabled = false,
      type = 'text',
    } = this.props;

    let statusClass: string;
    if (status === 'success') {
      statusClass = '.input-component__input--success';
    } else if (status === 'error') {
      statusClass = '.input-component__input--error';
    } else {
      statusClass = '';
    }

    const component: pug.compileTemplate =
      pug.compile(`label.input-component
    span ${label}
    input(type="${type}" placeholder="${placeholder}" name="${name}" value="${
        value ? value : ''
      }" disabled=${disabled}).input-component__input${statusClass}
    span.input-component__warning ${status === 'error' ? warning : ''}
    `);

    return component(this.props);
  }
}
