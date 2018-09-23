const uuidV4Fallback = require('uuid/v4');

const {
  STAGE,
  APP,
} = process.env;

const createTask = ({ update, uuidV4 = uuidV4Fallback }) => {
  // Proxyquire assigned to global in _setup.test.js so working directory is `test/`
  return proxyquire('./../src/tasks/upsert<%= Singular %>Task', {
    'uuid/v4': uuidV4,
    'aws-sdk': {
      DynamoDB: {
        DocumentClient: function () {
          this.update = update;
        },
      },
    },
  });
};

describe('test/unit/tasks/upsert<%= Singular %>Task.test.js', () => {
  it('creates a uuid for update if none is supplied', async () => {
    const update = sinon.stub().yields(null, {});
    const upsert<%= Singular %>Task = createTask({ update, uuidV4: () => '1' });

    const event = {
      Label: 'Label',
    };

    await upsert<%= Singular %>Task(event);

    expect(update.lastCall.args[0].Key.uuid).to.eq('1');
  });

  it(`should make an update to ${APP}-${STAGE}-<%= plural %> table`, async () => {
    const update = sinon.stub().yields(null, {});
    const upsert<%= Singular %>Task = createTask({ update });

    const event = {
      Label: 'Label',
      uuid: 'uuid',
    };

    await upsert<%= Singular %>Task(event);

    expect(update.lastCall.args[0].TableName).to.eq(`${APP}-${STAGE}-<%= plural %>`);
  });

  it('uses uuid as primary key for update', async () => {
    const update = sinon.stub().yields(null, {});
    const upsert<%= Singular %>Task = createTask({ update });

    const event = {
      Label: 'Label',
      uuid: 'uuid',
    };

    await upsert<%= Singular %>Task(event);

    expect(update.lastCall.args[0].Key.uuid).to.eq(event.uuid);
  });

  it('uses Label as value for updating Label', async () => {
    const update = sinon.stub().yields(null, {});
    const upsert<%= Singular %>Task = createTask({ update });

    const event = {
      Label: 'Label',
      uuid: 'uuid',
    };

    await upsert<%= Singular %>Task(event);

    expect(update.lastCall.args[0].AttributeUpdates.Label.Value).to.eq(event.Label);
  });
});

