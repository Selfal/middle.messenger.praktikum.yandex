export interface IDialogPreview {
  dialogName?: string;
  dateLastMessage?: string;
  lastMessage?: string;
  missedNum?: number;
  active?: boolean;
  avatar?: string;
  events?: Record<string, unknown>;
  id?: string | number;
  chatName?: string;
}
