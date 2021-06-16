import EventBus from './EventBus';
import { migrateHtmlAtribute } from '../utils/migrateHtmlAtribute';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  readonly _meta: {
    tagName: string;
    props: Object;
  };

  props: Object;

  constructor(tagName = 'div', props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(
      Block.EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this),
    );
    eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this),
    );
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources(): void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {}

  private _componentDidUpdate(oldProps, newProps): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
  }

  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }

    if (this.componentDidUpdate(this.props, nextProps)) {
      this._makePropsProxy(nextProps);
      Object.assign(this.props, nextProps);
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  // _addEvents() {
  //   if (this.props.events) {
  //     const events = this.props.events;
  //     Object.keys(events).forEach((eventName) => {
  //       if (eventName === 'blur' || eventName === 'focus') {
  //         this._element
  //           .querySelector('input')
  //           .addEventListener(eventName, events[eventName]);
  //       }

  //       if (this._element) {
  //         this._element
  //           .querySelector('input')
  //           .addEventListener(eventName, events[eventName]);
  //       }
  //     });
  //   }
  // }

  _addEvents() {
    if (this.props) {
      const { events = {} } = this.props;
      Object.keys(events).forEach((eventName) => {
        if (this._element) {
          const isFocusOrBlur: boolean =
            eventName === 'focus' || eventName === 'blur';
          this._element.addEventListener(
            eventName,
            events[eventName],
            isFocusOrBlur,
          );
        }
      });
    }
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        const isFocusOrBlur: boolean =
          eventName === 'focus' || eventName === 'blur';
        if (isFocusOrBlur && this._element.querySelector('input')) {
          this._element
            .querySelector('input')
            .removeEventListener(eventName, events[eventName]);
        } else {
          this._element.removeEventListener(
            eventName,
            events[eventName],
          );
        }
      }
    });
  }

  private _render(): void {
    const block = this.render();
    this._removeEvents();

    const template = migrateHtmlAtribute(block);
    template.getAttributeNames().forEach((name) => {
      this._element.setAttribute(
        name,
        template.getAttribute(name) || '',
      );
    });

    const childNodes = template.childNodes;

    let str: string = '';
    for (let i = 0; i <= childNodes.length - 1; i++) {
      const item = childNodes[i];
      str +=
        item.outerHTML !== undefined
          ? item.outerHTML
          : item.textContent;
    }

    this._element.innerHTML = str;

    this._addEvents();
  }

  render() {}

  getContent() {
    return this.element;
  }

  private _makePropsProxy(props) {
    const self = this;
    return new Proxy(props, {
      set: (target, prop, value) => {
        target[prop] = value;
        this._meta.props = this.props;
        this.eventBus().emit(
          Block.EVENTS.FLOW_CDU,
          this._meta.props,
          target,
        );
        return true;
      },
      deleteProperty() {
        throw new Error('Отказано в доступе');
      },
    });
  }

  private _createDocumentElement(tagName) {
    const componentWrapper = document.createElement(tagName);
    return componentWrapper;
  }

  show(type?: 'flex' | 'div'): void {
    this.getContent().style.display = type ? type : 'block';
  }

  hide(): void {
    this.getContent().style.display = 'none';
  }
}
