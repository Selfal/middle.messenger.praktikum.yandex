export default interface IInput {
  label?: string;
  type?: 'normal' | 'success' | 'error';
  placeholder?: string;
  className?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  warning?: string;
  events?: Object;
  re: RegExp;
}
