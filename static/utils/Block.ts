import EventBus from './EventBus';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  private _meta: {
    tagName: string;
    props: Record<string, unknown>;
  };

  props: Record<string, unknown>;

  constructor(
    tagName: string = 'div',
    props: Record<string, any> = {},
  ) {
    const eventBus: EventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus): void {
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

  protected init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount(): void {}

  private _componentDidUpdate(
    oldProps: Record<string, any>,
    newProps: Record<string, any>,
  ): void {
    const response: boolean = this.componentDidUpdate(
      oldProps,
      newProps,
    );
    if (response) {
      this._render();
    }
  }

  protected componentDidUpdate(
    oldProps: Record<string, any>,
    newProps: Record<string, any>,
  ): boolean {
    if (oldProps !== newProps) {
      return true;
    }

    return false;
  }

  public setProps = (nextProps: Record<string, any>): void => {
    if (!nextProps) {
      return;
    }

    if (this.componentDidUpdate(this.props, nextProps)) {
      this._makePropsProxy(nextProps);
      Object.assign(this.props, nextProps);
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  };

  get element(): HTMLElement {
    const element = this._element as HTMLElement;
    return element;
  }

  private _addEvents(): void {
    if (this.props) {
      const { events = {} } = this.props as Record<string, any>;
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

  private _removeEvents(): void {
    const { events = {} } = this.props as Record<string, any>;

    Object.keys(events).forEach((eventName: string) => {
      if (this._element) {
        const inputElement = this._element.querySelector(
          'input',
        ) as HTMLInputElement;

        const isFocusOrBlur: boolean =
          eventName === 'focus' || eventName === 'blur';

        if (isFocusOrBlur && inputElement) {
          inputElement.removeEventListener(
            eventName,
            events[eventName],
          );
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

    // const template = migrateHtmlAtribute(block) as HTMLElement;
    const template = block;
    template.getAttributeNames().forEach((name) => {
      this._element?.setAttribute(
        name,
        template.getAttribute(name) || '',
      );
    });

    const childNodes = <NodeList>template.childNodes;
    let str: string = '';
    for (let i = 0; i <= childNodes.length - 1; i++) {
      const item = <HTMLElement>childNodes[i];

      if (item.outerHTML !== undefined) {
        str += item.outerHTML;
      } else if (item.outerHTML === undefined) {
        str += item.textContent;
      }
    }

    if (this._element) {
      this._element.innerHTML = '';
      // console.log('this._element:', this._element);
      const childrens = Array.prototype.slice.call(
        template.childNodes,
      );

      for (let i = 0; i < childrens.length; i++) {
        this._element.appendChild(childrens[i]);
      }
      // this._element.append(template.children);
      // this._element = this._element.firstChild;

      this._addEvents();
    }
  }

  protected render(): void {}

  protected getContent(): HTMLElement {
    return this.element;
  }

  private _makePropsProxy(props: Record<string, any>) {
    return new Proxy(props, {
      set: (
        target: Record<string, any>,
        prop: string,
        value: unknown,
      ) => {
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

  private _createDocumentElement(tagName: string): HTMLElement {
    const componentWrapper: HTMLElement =
      document.createElement(tagName);
    return componentWrapper;
  }

  public show(): void {
    this.getContent().style.display = 'flex';
  }

  public hide(): void {
    this.getContent().style.display = 'none';
  }
}
