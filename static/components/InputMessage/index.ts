import * as pug from 'pug';
import './style.scss';
import IInputMessage from './interface';
import Block from '../../utils/Block';

export class InputMessage extends Block {
  readonly props: IInputMessage;

  constructor(props: IInputMessage) {
    super('textarea', {
      ...props,
      events: {
        ...props.events,
        input: (e: Event) => {
          const textarea = e.target as HTMLTextAreaElement;
          this.props.value = textarea.value;
        },
      },
    });
  }

  get value() {
    return this.props.value;
  }

  render(): HTMLElement {
    const { placeholder = 'Начните ввод"' } = this
      .props as IInputMessage;

    const component = pug.compile(
      `textarea(placeholder="${placeholder}").message-input`,
    );

    const result = document.createElement('div');
    result.innerHTML = component();
    return result.firstChild as HTMLElement;
  }
}
