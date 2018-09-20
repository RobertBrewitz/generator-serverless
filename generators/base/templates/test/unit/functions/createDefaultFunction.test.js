const createDefaultFunction = require('./../../../src/functions/createDefaultFunction');

describe('test/unit/functions/createDefaultFunction.test.js', () => {
  it('default behavior', () => {
    const responseDefault = sinon.stub().returns('default');

    const func = createDefaultFunction({
      responseDefault,
    });

    const evt = {};
    const ctx = {};
    const cb = sinon.spy();

    func(evt, ctx, cb);

    expect(cb.calledWith(null, 'default'), 'cb').to.be.true;
  });

  describe('GET', () => {
    it('recieves query parameters', async () => {
      const getDefaultTask = sinon.stub().resolves();
      const responseSuccess = sinon.stub().returns('resolves');

      const func = createDefaultFunction({
        getDefaultTask,
        responseSuccess,
      });

      const evt = { queryStringParameters: { foo: 'bar' }, httpMethod: 'GET' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(getDefaultTask.calledWith(evt.queryStringParameters)).to.be.true;
    });

    it('resolves', async () => {
      const getDefaultTask = sinon.stub().resolves();
      const responseSuccess = sinon.stub().returns('resolves');

      const func = createDefaultFunction({
        getDefaultTask,
        responseSuccess,
      });

      const evt = { httpMethod: 'GET' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(getDefaultTask.calledOnce, 'getDefaultTask').to.be.true;
      expect(responseSuccess.calledOnce, 'responseSuccess').to.be.true;
      expect(cb.calledWith(null, 'resolves'), 'cb').to.be.true;
    });

    it('rejects', async () => {
      const getDefaultTask = sinon.stub().rejects();
      const responseError = sinon.stub().returns('rejects');

      const func = createDefaultFunction({
        getDefaultTask,
        responseError,
      });

      const evt = { httpMethod: 'GET' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(getDefaultTask.calledOnce, 'getDefaultTask').to.be.true;
      expect(responseError.calledOnce, 'responseError').to.be.true;
      expect(cb.calledWith(null, 'rejects'), 'cb').to.be.true;
    });
  });

  describe('PUT', () => {
    it('receives parsed body', async () => {
      const upsertDefaultTask = sinon.stub().resolves();
      const responseSuccess = sinon.stub().returns('resolves');

      const func = createDefaultFunction({
        upsertDefaultTask,
        responseSuccess,
      });

      const expected = { uuid: '1' };

      const evt = { body: JSON.stringify(expected), httpMethod: 'PUT' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(upsertDefaultTask.calledWith(expected)).to.be.true;
    });

    it('resolves', async () => {
      const upsertDefaultTask = sinon.stub().resolves();
      const responseSuccess = sinon.stub().returns('resolves');

      const func = createDefaultFunction({
        upsertDefaultTask,
        responseSuccess,
      });

      const evt = { httpMethod: 'PUT' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(upsertDefaultTask.calledOnce, 'upsertDefaultTask').to.be.true;
      expect(responseSuccess.calledOnce, 'responseSuccess').to.be.true;
      expect(cb.calledWith(null, 'resolves'), 'cb').to.be.true;
    });

    it('rejects', async () => {
      const upsertDefaultTask = sinon.stub().rejects();
      const responseError = sinon.stub().returns('rejects');

      const func = createDefaultFunction({
        upsertDefaultTask,
        responseError,
      });

      const evt = { httpMethod: 'PUT' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(upsertDefaultTask.calledOnce, 'upsertDefaultTask').to.be.true;
      expect(responseError.calledOnce, 'responseError').to.be.true;
      expect(cb.calledWith(null, 'rejects'), 'cb').to.be.true;
    });
  });

  describe('POST', () => {
    it('receives parsed body', async () => {
      const upsertDefaultTask = sinon.stub().resolves();
      const responseSuccess = sinon.stub().returns('resolves');

      const func = createDefaultFunction({
        upsertDefaultTask,
        responseSuccess,
      });

      const expected = { uuid: '1' };

      const evt = { body: JSON.stringify(expected), httpMethod: 'PUT' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(upsertDefaultTask.calledWith(expected)).to.be.true;
    });

    it('resolves', async () => {
      const upsertDefaultTask = sinon.stub().resolves();
      const responseSuccess = sinon.stub().returns('resolves');

      const func = createDefaultFunction({
        upsertDefaultTask,
        responseSuccess,
      });

      const evt = { httpMethod: 'POST' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(upsertDefaultTask.calledOnce, 'upsertDefaultTask').to.be.true;
      expect(responseSuccess.calledOnce, 'responseSuccess').to.be.true;
      expect(cb.calledWith(null, 'resolves'), 'cb').to.be.true;
    });

    it('rejects', async () => {
      const upsertDefaultTask = sinon.stub().rejects();
      const responseError = sinon.stub().returns('rejects');

      const func = createDefaultFunction({
        upsertDefaultTask,
        responseError,
      });

      const evt = { httpMethod: 'POST' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(upsertDefaultTask.calledOnce, 'upsertDefaultTask').to.be.true;
      expect(responseError.calledOnce, 'responseError').to.be.true;
      expect(cb.calledWith(null, 'rejects'), 'cb').to.be.true;
    });
  });

  describe('PATCH', () => {
    it('receives parsed body', async () => {
      const upsertDefaultTask = sinon.stub().resolves();
      const responseSuccess = sinon.stub().returns('resolves');

      const func = createDefaultFunction({
        upsertDefaultTask,
        responseSuccess,
      });

      const expected = { uuid: '1' };

      const evt = { body: JSON.stringify(expected), httpMethod: 'PATCH' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);


      expect(upsertDefaultTask.calledWith(expected)).to.be.true;
    });

    it('resolves', async () => {
      const upsertDefaultTask = sinon.stub().resolves();
      const responseSuccess = sinon.stub().returns('resolves');

      const func = createDefaultFunction({
        upsertDefaultTask,
        responseSuccess,
      });

      const evt = { httpMethod: 'PATCH' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(upsertDefaultTask.calledOnce, 'upsertDefaultTask').to.be.true;
      expect(responseSuccess.calledOnce, 'responseSuccess').to.be.true;
      expect(cb.calledWith(null, 'resolves'), 'cb').to.be.true;
    });

    it('rejects', async () => {
      const upsertDefaultTask = sinon.stub().rejects();
      const responseError = sinon.stub().returns('rejects');

      const func = createDefaultFunction({
        upsertDefaultTask,
        responseError,
      });

      const evt = { httpMethod: 'PATCH' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(upsertDefaultTask.calledOnce, 'upsertDefaultTask').to.be.true;
      expect(responseError.calledOnce, 'responseError').to.be.true;
      expect(cb.calledWith(null, 'rejects'), 'cb').to.be.true;
    });
  });

  describe('DELETE', () => {
    it('recieves query parameters', async () => {
      const deleteDefaultTask = sinon.stub().resolves();
      const responseSuccess = sinon.stub().returns('resolves');

      const func = createDefaultFunction({
        deleteDefaultTask,
        responseSuccess,
      });

      const evt = { queryStringParameters: { foo: 'bar' }, httpMethod: 'DELETE' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(deleteDefaultTask.calledWith(evt.queryStringParameters)).to.be.true;
    });

    it('resolves', async () => {
      const deleteDefaultTask = sinon.stub().resolves();
      const responseSuccess = sinon.stub().returns('resolves');

      const func = createDefaultFunction({
        deleteDefaultTask,
        responseSuccess,
      });

      const evt = { httpMethod: 'DELETE' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(deleteDefaultTask.calledOnce, 'deleteDefaultTask').to.be.true;
      expect(responseSuccess.calledOnce, 'responseSuccess').to.be.true;
      expect(cb.calledWith(null, 'resolves'), 'cb').to.be.true;
    });

    it('rejects', async () => {
      const deleteDefaultTask = sinon.stub().rejects();
      const responseError = sinon.stub().returns('rejects');

      const func = createDefaultFunction({
        deleteDefaultTask,
        responseError,
      });

      const evt = { httpMethod: 'DELETE' };
      const ctx = {};
      const cb = sinon.spy();

      await func(evt, ctx, cb);

      expect(deleteDefaultTask.calledOnce, 'deleteDefaultTask').to.be.true;
      expect(responseError.calledOnce, 'responseError').to.be.true;
      expect(cb.calledWith(null, 'rejects'), 'cb').to.be.true;
    });
  });
});

