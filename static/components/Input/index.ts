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
      type: props.type,
      placeholder: props.placeholder,
      name: props.name,
      value: props.value,
      warning: props.warning,
      disabled: props.disabled,
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
      type = 'normal',
      placeholder,
      name,
      value,
      warning = '',
      disabled = false,
    } = this.props;

    let statusClass: string;
    if (type === 'success') {
      statusClass = '.input-component__input--success';
    } else if (type === 'error') {
      statusClass = '.input-component__input--error';
    } else {
      statusClass = '';
    }

    const component: pug.compileTemplate =
      pug.compile(`label.input-component
    span ${label}
    input(placeholder="${placeholder}" name="${name}" value="${
        value ? value : ''
      }" disabled=${disabled}).input-component__input${statusClass}
    span.input-component__warning ${type === 'error' ? warning : ''}
    `);

    return component(this.props);
  }
}
