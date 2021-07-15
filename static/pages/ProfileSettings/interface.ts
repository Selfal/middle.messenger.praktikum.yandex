import { Button } from '../../components/Button/index';
import { Input } from '../../components/Input/index';
import { AvatarInput } from '../../components/AvatarInput/index';

export default interface IPropfileSettings {
  inputsInfo: Array<Input>;
  inputsPassword: Array<Input>;
  buttons: Record<string, Button>;
  avatarInput: AvatarInput;
}
