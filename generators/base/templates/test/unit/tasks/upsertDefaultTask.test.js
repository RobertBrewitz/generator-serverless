const uuidV4Fallback = require('uuid/v4');

const {
  STAGE,
  APP,
} = process.env;

const createTask = ({ update, uuidV4 = uuidV4Fallback }) => {
  // Proxyquire assigned to global in _setup.test.js so working directory is `test/`
  return proxyquire('./../src/tasks/upsertDefaultTask', {
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

describe('test/unit/tasks/upsertDefaultTask.test.js', () => {
  it('creates a uuid for update if none is supplied', async () => {
    const update = sinon.stub().yields(null, {});
    const upsertDefaultTask = createTask({ update, uuidV4: () => '1' });

    const event = {
      Label: 'Label',
    };

    await upsertDefaultTask(event);

    expect(update.lastCall.args[0].Key.uuid).to.eq('1');
  });

  it(`should make an update to ${APP}-${STAGE}-defaults table`, async () => {
    const update = sinon.stub().yields(null, {});
    const upsertDefaultTask = createTask({ update });

    const event = {
      Label: 'Label',
      uuid: 'uuid',
    };

    await upsertDefaultTask(event);

    expect(update.lastCall.args[0].TableName).to.eq(`${APP}-${STAGE}-defaults`);
  });

  it('uses uuid as primary key for update', async () => {
    const update = sinon.stub().yields(null, {});
    const upsertDefaultTask = createTask({ update });

    const event = {
      Label: 'Label',
      uuid: 'uuid',
    };

    await upsertDefaultTask(event);

    expect(update.lastCall.args[0].Key.uuid).to.eq(event.uuid);
  });

  it('uses Label as value for updating Label', async () => {
    const update = sinon.stub().yields(null, {});
    const upsertDefaultTask = createTask({ update });

    const event = {
      Label: 'Label',
      uuid: 'uuid',
    };

    await upsertDefaultTask(event);

    expect(update.lastCall.args[0].AttributeUpdates.Label.Value).to.eq(event.Label);
  });
});

