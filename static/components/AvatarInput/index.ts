import * as pug from 'pug';
import './style.scss';
// import IButton from './interface';
import Block from '../../utils/Block';

export class AvatarInput extends Block {
  readonly props: IAvatarInput;

  constructor(props: IAvatarInput) {
    super('label', props);
  }

  render(): string {
    const { src } = this.props as IAvatarInput;

    const component = pug.compile(
      `label.avatar
        img.avatar__img(src="${src}") 
        input.avatar__input(type="file" name="file")`,
    );

    const result = document.createElement('div');
    result.innerHTML = component();
    return result;
  }
}
