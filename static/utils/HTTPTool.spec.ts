import HTTPTransport from './HTTPTool';

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('Тестирование HTTPTools', () => {
  let request: HTTPTransport;

  beforeEach(() => {
    request = new HTTPTransport('http://localhost');
  });

  it('Метод GET', () => {
    const requestSpy = sinon.spy(request, 'request');
    request.get('/test');

    expect(requestSpy).to.have.been.calledWith('/test', {
      method: 'GET',
      mode: 'cors',
    });
  });

  it('Метод POST', () => {
    const requestSpy = sinon.spy(request, 'request');
    request.post('/test', {});

    expect(requestSpy).to.have.been.calledWith('/test', {
      method: 'POST',
      mode: 'cors',
    });
  });

  it('Метод PUT', () => {
    const requestSpy = sinon.spy(request, 'request');
    request.put('/test', {});

    expect(requestSpy).to.have.been.calledWith('/test', {
      method: 'PUT',
    });
  });

  it('Метод DELETE', () => {
    const requestSpy = sinon.spy(request, 'request');
    request.delete('/test', {});

    expect(requestSpy).to.have.been.calledWith('/test', {
      method: 'DELETE',
    });
  });
});
