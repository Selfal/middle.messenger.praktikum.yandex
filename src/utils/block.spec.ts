import Block from './block';

import { assert } from 'chai';

describe('Тестирование блока', () => {
  it('Тстирование рендера блока', () => {
    const resultBlock = new Block('div', {
      className: 'ClassTest',
      text: 'test',
    });
    const { _meta } = resultBlock;
    const { props } = _meta;
    assert.exists(resultBlock);
    assert.propertyVal(_meta, 'tagName', 'div');
    assert.propertyVal(props, 'className', 'ClassTest');
    assert.propertyVal(props, 'text', 'test');
  });

  it('Тестирование изменения пропсов', () => {
    const resultBlock = new Block('div', {
      className: 'ClassTest',
      text: 'test',
    });

    resultBlock.setProps({ text: '1' });
    assert.propertyVal(resultBlock.props, 'text', '1');
    resultBlock.setProps({ text: '2' });
    assert.propertyVal(resultBlock.props, 'text', '2');
  });
});
