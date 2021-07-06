class Route {
  constructor(pathname: string, view, props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname) {
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

  match(pathname) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    // if (!this._block) {
    //   this._block = new this._blockClass();
    //   render(this._props.rootQuery, this._block);
    //   return;
    // }
    this._block = new this._blockClass();
    render(this._props.rootQuery, this._block);
    this._block.show();
  }
}
export class Router {
  constructor(rootQuery) {
    if (Router.__instance) {
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
      this._onRoute(event.currentTarget.location.pathname);
    }).bind(this);
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      this.go('/404');
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    console.log('route: ', route);
    console.log('pathname: ', pathname);
    route.render(route, pathname);
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
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

function isEqual(lhs, rhs) {
  return lhs === rhs;
}

function render(query, block) {
  const root = document.querySelector(query);
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  console.log('root: ', root);
  console.log('query: ', query);
  console.log('block: ', block);
  root.append(block.render());
  return root;
}
