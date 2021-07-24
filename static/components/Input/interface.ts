export default interface IInput {
  label?: string;
  type?: 'password' | 'email' | 'text' | 'phone';
  status?: 'normal' | 'success' | 'error';
  placeholder?: string;
  className?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  warning?: string;
  events?: Record<string, unknown>;
  re?: RegExp | string;
}
