const create<%= Singular %>Function = require('./../../../src/functions/create<%= Singular %>Function');

describe('test/unit/functions/create<%= Singular %>Function.test.js', () => {
  it('default behavior', () => {
    const responseBad = sinon.stub().returns('default');

    const func = create<%= Singular %>Function({
      responseBad,
    });

    const evt = {};
    const ctx = {};
    const cb = sinon.spy();

    func(evt, ctx, cb);

    expect(cb.calledWith(null, 'default'), 'cb').to.be.true;
  });

  describe('GET', () => {
    it('recieves query parameters', async () => {
      const get<%= Singular %>Task = sinon.stub().resolves();
      const responseSuccess = sinon.stub().returns('resolves');

      const func = create<%= Singular %>Function({
        get<%= Singular %>Task,
        responseSuccess,
      });

      const evt = { queryStringParameters: { foo: 'bar' }, httpMethod: 'GET' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(get<%= Singular %>Task.calledWith(evt.queryStringParameters)).to.be.true;
    });

    it('resolves', async () => {
      const get<%= Singular %>Task = sinon.stub().resolves();
      const responseSuccess = sinon.stub().returns('resolves');

      const func = create<%= Singular %>Function({
        get<%= Singular %>Task,
        responseSuccess,
      });

      const evt = { httpMethod: 'GET' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(get<%= Singular %>Task.calledOnce, 'get<%= Singular %>Task').to.be.true;
      expect(responseSuccess.calledOnce, 'responseSuccess').to.be.true;
      expect(cb.calledWith(null, 'resolves'), 'cb').to.be.true;
    });

    it('rejects', async () => {
      const get<%= Singular %>Task = sinon.stub().rejects();
      const responseError = sinon.stub().returns('rejects');

      const func = create<%= Singular %>Function({
        get<%= Singular %>Task,
        responseError,
      });

      const evt = { httpMethod: 'GET' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(get<%= Singular %>Task.calledOnce, 'get<%= Singular %>Task').to.be.true;
      expect(responseError.calledOnce, 'responseError').to.be.true;
      expect(cb.calledWith(null, 'rejects'), 'cb').to.be.true;
    });
  });

  describe('PUT', () => {
    it('receives parsed body', async () => {
      const upsert<%= Singular %>Task = sinon.stub().resolves();
      const responseSuccess = sinon.stub().returns('resolves');

      const func = create<%= Singular %>Function({
        upsert<%= Singular %>Task,
        responseSuccess,
      });

      const expected = { uuid: '1' };

      const evt = { body: JSON.stringify(expected), httpMethod: 'PUT' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(upsert<%= Singular %>Task.calledWith(expected)).to.be.true;
    });

    it('resolves', async () => {
      const upsert<%= Singular %>Task = sinon.stub().resolves();
      const responseSuccess = sinon.stub().returns('resolves');

      const func = create<%= Singular %>Function({
        upsert<%= Singular %>Task,
        responseSuccess,
      });

      const evt = { httpMethod: 'PUT' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(upsert<%= Singular %>Task.calledOnce, 'upsert<%= Singular %>Task').to.be.true;
      expect(responseSuccess.calledOnce, 'responseSuccess').to.be.true;
      expect(cb.calledWith(null, 'resolves'), 'cb').to.be.true;
    });

    it('rejects', async () => {
      const upsert<%= Singular %>Task = sinon.stub().rejects();
      const responseError = sinon.stub().returns('rejects');

      const func = create<%= Singular %>Function({
        upsert<%= Singular %>Task,
        responseError,
      });

      const evt = { httpMethod: 'PUT' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(upsert<%= Singular %>Task.calledOnce, 'upsert<%= Singular %>Task').to.be.true;
      expect(responseError.calledOnce, 'responseError').to.be.true;
      expect(cb.calledWith(null, 'rejects'), 'cb').to.be.true;
    });
  });

  describe('POST', () => {
    it('receives parsed body', async () => {
      const upsert<%= Singular %>Task = sinon.stub().resolves();
      const responseSuccess = sinon.stub().returns('resolves');

      const func = create<%= Singular %>Function({
        upsert<%= Singular %>Task,
        responseSuccess,
      });

      const expected = { uuid: '1' };

      const evt = { body: JSON.stringify(expected), httpMethod: 'PUT' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(upsert<%= Singular %>Task.calledWith(expected)).to.be.true;
    });

    it('resolves', async () => {
      const upsert<%= Singular %>Task = sinon.stub().resolves();
      const responseSuccess = sinon.stub().returns('resolves');

      const func = create<%= Singular %>Function({
        upsert<%= Singular %>Task,
        responseSuccess,
      });

      const evt = { httpMethod: 'POST' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(upsert<%= Singular %>Task.calledOnce, 'upsert<%= Singular %>Task').to.be.true;
      expect(responseSuccess.calledOnce, 'responseSuccess').to.be.true;
      expect(cb.calledWith(null, 'resolves'), 'cb').to.be.true;
    });

    it('rejects', async () => {
      const upsert<%= Singular %>Task = sinon.stub().rejects();
      const responseError = sinon.stub().returns('rejects');

      const func = create<%= Singular %>Function({
        upsert<%= Singular %>Task,
        responseError,
      });

      const evt = { httpMethod: 'POST' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(upsert<%= Singular %>Task.calledOnce, 'upsert<%= Singular %>Task').to.be.true;
      expect(responseError.calledOnce, 'responseError').to.be.true;
      expect(cb.calledWith(null, 'rejects'), 'cb').to.be.true;
    });
  });

  describe('PATCH', () => {
    it('receives parsed body', async () => {
      const upsert<%= Singular %>Task = sinon.stub().resolves();
      const responseSuccess = sinon.stub().returns('resolves');

      const func = create<%= Singular %>Function({
        upsert<%= Singular %>Task,
        responseSuccess,
      });

      const expected = { uuid: '1' };

      const evt = { body: JSON.stringify(expected), httpMethod: 'PATCH' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);


      expect(upsert<%= Singular %>Task.calledWith(expected)).to.be.true;
    });

    it('resolves', async () => {
      const upsert<%= Singular %>Task = sinon.stub().resolves();
      const responseSuccess = sinon.stub().returns('resolves');

      const func = create<%= Singular %>Function({
        upsert<%= Singular %>Task,
        responseSuccess,
      });

      const evt = { httpMethod: 'PATCH' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(upsert<%= Singular %>Task.calledOnce, 'upsert<%= Singular %>Task').to.be.true;
      expect(responseSuccess.calledOnce, 'responseSuccess').to.be.true;
      expect(cb.calledWith(null, 'resolves'), 'cb').to.be.true;
    });

    it('rejects', async () => {
      const upsert<%= Singular %>Task = sinon.stub().rejects();
      const responseError = sinon.stub().returns('rejects');

      const func = create<%= Singular %>Function({
        upsert<%= Singular %>Task,
        responseError,
      });

      const evt = { httpMethod: 'PATCH' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(upsert<%= Singular %>Task.calledOnce, 'upsert<%= Singular %>Task').to.be.true;
      expect(responseError.calledOnce, 'responseError').to.be.true;
      expect(cb.calledWith(null, 'rejects'), 'cb').to.be.true;
    });
  });

  describe('DELETE', () => {
    it('recieves query parameters', async () => {
      const delete<%= Singular %>Task = sinon.stub().resolves();
      const responseSuccess = sinon.stub().returns('resolves');

      const func = create<%= Singular %>Function({
        delete<%= Singular %>Task,
        responseSuccess,
      });

      const evt = { queryStringParameters: { foo: 'bar' }, httpMethod: 'DELETE' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(delete<%= Singular %>Task.calledWith(evt.queryStringParameters)).to.be.true;
    });

    it('resolves', async () => {
      const delete<%= Singular %>Task = sinon.stub().resolves();
      const responseSuccess = sinon.stub().returns('resolves');

      const func = create<%= Singular %>Function({
        delete<%= Singular %>Task,
        responseSuccess,
      });

      const evt = { httpMethod: 'DELETE' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(delete<%= Singular %>Task.calledOnce, 'delete<%= Singular %>Task').to.be.true;
      expect(responseSuccess.calledOnce, 'responseSuccess').to.be.true;
      expect(cb.calledWith(null, 'resolves'), 'cb').to.be.true;
    });

    it('rejects', async () => {
      const delete<%= Singular %>Task = sinon.stub().rejects();
      const responseError = sinon.stub().returns('rejects');

      const func = create<%= Singular %>Function({
        delete<%= Singular %>Task,
        responseError,
      });

      const evt = { httpMethod: 'DELETE' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(delete<%= Singular %>Task.calledOnce, 'delete<%= Singular %>Task').to.be.true;
      expect(responseError.calledOnce, 'responseError').to.be.true;
      expect(cb.calledWith(null, 'rejects'), 'cb').to.be.true;
    });
  });
});

