import { Button } from '../Button/index';
import { Input } from '../Input/index';

export default interface PopupCreateChat {
  active?: boolean;
  title?: string;
  input?: Input;
  button?: Button;
  events?: Record<string, unknown>;
}
