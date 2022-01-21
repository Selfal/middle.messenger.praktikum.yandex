import { assert } from 'chai';
import EventBus from './EventBus';

describe('Тестирование EventBus', () => {
  const eventBus = new EventBus();
  const { listeners } = eventBus;
  const callback = () => 'Hello';

  it('Init EventBus', () => {
    assert.exists(eventBus);
  });

  it('Добавление событий', () => {
    const events = ['first', 'second', 'threed'];

    events.forEach((event) => eventBus.on(event, callback));

    assert.hasAllKeys(listeners, events);
    assert.include(listeners['second'], callback);
  });

  it('Удаление событий', () => {
    eventBus.off('second', callback);

    assert.notInclude(listeners['second'], callback);
  });
});
