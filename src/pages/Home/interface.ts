import { Button } from '../../components/Button/index';
import { Input } from '../../components/Input/index';
import { PopupCreateChat } from '../../components/PopupCreateChat/index';
import { DialogPreview } from '../../components/DialogPreview/index';
import { Dropdown } from '../../components/Dropdown/index';

export default interface IHome {
  dialogsPreview?: Array<DialogPreview>;
  buttons?: Record<string, Button>;
  inputs?: Record<string, Input>;
  popups?: Record<string, PopupCreateChat>;
  dropdowns?: Record<string, Dropdown>;
  messages?: Array<Record<string, unknown>>;
  selectedChat?: string | number;
  activeChatName?: string;
  activeChatAvatar?: string | null;
  socket?: string | null;
  users?: Record<string, unknown>;
}
