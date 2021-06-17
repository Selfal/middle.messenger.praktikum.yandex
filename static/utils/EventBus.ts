export default class EventBus {
  public listeners: Object;

  constructor() {
    this.listeners = {};
  }

  on(event: string | number, callback: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string | number, callback: Function): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener: Function) => listener !== callback,
    );
  }

  emit(event: string | number, ...args: any[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener: Function) => {
      listener(...args);
    });
  }
}
