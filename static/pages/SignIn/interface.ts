import { Button } from '../../components/Button/index';
import { Input } from '../../components/Input/index';

export default interface ISignIn {
  inputs: Array<Input>;
  buttons: Array<Button>;
  footerButtons: Array<Button>;
}
