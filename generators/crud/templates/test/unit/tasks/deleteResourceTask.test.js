const {
  STAGE,
  APP,
} = process.env;

const createTask = ({ del }) => {
  // Proxyquire assigned to global in _setup.test.js so working directory is `test/`
  return proxyquire('./../src/tasks/delete<%= Singular %>Task', {
    'aws-sdk': {
      DynamoDB: {
        DocumentClient: function () {
          this.delete = del;
        },
      },
    },
  });
};

describe('test/unit/tasks/delete<%= Plural %>Task.test.js', () => {
  it('strict on uuid to being supplied and does not call delete', async () => {
    const del = sinon.stub().yields(null, {});
    const delete<%= Singular %>Task = createTask({ del });

    const event = {};

    await delete<%= Singular %>Task(event)
      .catch((err) => {
        expect(err.response.status).to.eq(400);
      });

    expect(del.called).to.be.false;
  });

  it(`calls delete with the uuid to the ${APP}-${STAGE}-<%= plural %> table`, async () => {
    const del = sinon.stub().yields(null, {});
    const delete<%= Singular %>Task = createTask({ del });

    const event = {
      uuid: '1',
    };

    await delete<%= Singular %>Task(event);

    expect(del.firstCall.args[0].Key.uuid).to.eq(event.uuid);
    expect(del.firstCall.args[0].TableName).to.eq(`${APP}-${STAGE}-<%= plural %>`);
  });
});

