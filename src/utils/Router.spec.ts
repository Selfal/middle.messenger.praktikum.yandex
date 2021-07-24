import { assert } from 'chai';
import Block from './Block';
import { Router } from './Router';
class FirstTestBlock extends Block {
  constructor(props) {
    super('div', props);
  }

  render() {
    return `<div class="first-test">1</div>`;
  }
}

class SecondTestBlock extends Block {
  constructor(props) {
    super('div', props);
  }

  render() {
    return `<div class="first-test">2</div>`;
  }
}

describe('Router', () => {
  it('Init', () => {
    const router = new Router('.app');
    assert.exists(router);
  });

  it('Пустой роутер', () => {
    const router = new Router('.app');
    assert.isArray(router.routes, 'Routes is array');
    assert.lengthOf(router.routes, 0, 'No routes');
  });

  it('Добавление роута', () => {
    const router = new Router('.app');
    router.use('/first-test', new FirstTestBlock({}));

    const routes = router.routes;
    assert.lengthOf(routes, 1, 'Added a route');
    assert.equal(routes[0]._pathname, '/first-test');
  });

  it('Переходы', () => {
    const router = new Router('.app');
    router.use('/second-test', new SecondTestBlock({})).start();

    assert.equal(
      router.getRoute('/first-test')._pathname,
      '/first-test',
    );
    assert.isUndefined(router.getRoute('/error'));
  });
});
