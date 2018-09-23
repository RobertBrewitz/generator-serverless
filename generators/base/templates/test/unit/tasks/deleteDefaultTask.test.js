const {
  STAGE,
  APP,
} = process.env;

const createTask = ({ del }) => {
  // Proxyquire assigned to global in _setup.test.js so working directory is `test/`
  return proxyquire('./../src/tasks/deleteDefaultTask', {
    'aws-sdk': {
      DynamoDB: {
        DocumentClient: function () {
          this.delete = del;
        },
      },
    },
  });
};

describe('test/unit/tasks/deleteDefaultTask.test.js', () => {
  it('strict on uuid to being supplied and does not call delete', async () => {
    const del = sinon.stub().yields(null, {});
    const deleteDefaultTask = createTask({ del });

    const event = {};

    await deleteDefaultTask(event)
      .catch((err) => {
        expect(err.response.status).to.eq(400);
      });

    expect(del.called).to.be.false;
  });

  it(`calls delete with the uuid to the ${APP}-${STAGE}-defaults table`, async () => {
    const del = sinon.stub().yields(null, {});
    const deleteDefaultTask = createTask({ del });

    const event = {
      uuid: '1',
    };

    await deleteDefaultTask(event);

    expect(del.firstCall.args[0].Key.uuid).to.eq(event.uuid);
    expect(del.firstCall.args[0].TableName).to.eq(`${APP}-${STAGE}-defaults`);
  });
});

