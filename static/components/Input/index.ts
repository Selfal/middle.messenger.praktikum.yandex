import * as pug from 'pug';
import IInput from './interface';
import Block from '../../utils/Block';
import validate from '../../utils/validate';
import sanitize from '../../utils/sanitize';
import './style.scss';

export class Input extends Block {
  readonly props: IInput;

  constructor(props: IInput) {
    super('label', {
      label: props.label,
      status: props.status,
      placeholder: props.placeholder,
      name: props.name,
      value: sanitize(props.value),
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

          const warningElement = element.parentNode?.querySelector(
            '.input-component__warning',
          ) as HTMLElement;

          warningElement.innerHTML = '';
        },
      },
    });
  }

  get value(): string {
    return this.props.value as string;
  }

  render(): HTMLElement {
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
    ${label ? `span ${label}` : ''}
    input(type="${type}" placeholder="${placeholder}" name="${name}" value="${
        value ? value : ''
      }" disabled=${disabled}).input-component__input${statusClass}
    span.input-component__warning ${status === 'error' ? warning : ''}
    `);

    const test = document.createElement('div');
    test.innerHTML = component();
    return test.firstChild as HTMLElement;
  }
}
