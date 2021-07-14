export default interface IDropdown {
  items: {
    name: string;
    events: Record<string, unknown>;
  };
  events?: Record<string, unknown>;
}
