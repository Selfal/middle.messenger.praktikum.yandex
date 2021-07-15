import Block from './Block';

class Route {
  private _pathname: string;
  private _blockClass: any;
  private _block: Block | null;
  private _props: Record<string, unknown>;
  constructor(
    pathname: string,
    view: any,
    props: Record<string, unknown>,
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    this._block = new this._blockClass();
    render(this._props.rootQuery, this._block);
    this._block.show();
  }
}
export class Router {
  private static __instance: Router;
  private routes: Route[] | undefined;
  private history: History | undefined;
  private _currentRoute: Route | null | undefined;
  private _rootQuery: string | undefined;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block) {
    const route = new Route(pathname, block, {
      rootQuery: this._rootQuery,
    });

    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = ((event: Event) => {
      const target = event.currentTarget;
      this._onRoute(target?.location.pathname);
    }).bind(this);
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route && pathname !== 'blank') {
      this.go('/404');
      window.location.href = '/404';
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route?.render();
  }

  go(pathname: string) {
    this.history!.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  while (root?.firstChild) {
    root.removeChild(root.firstChild);
  }

  root?.append(block.getContent());
  return root;
}
