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

    const atts = {};

    await upsert<%= Singular %>Task(atts);

    expect(update.lastCall.args[0].Key.uuid).to.eq('1');
  });

  it(`should make an update to ${APP}-${STAGE}-<%= plural %> table`, async () => {
    const update = sinon.stub().yields(null, {});
    const upsert<%= Singular %>Task = createTask({ update });

    const atts = {
      uuid: 'uuid',
    };

    await upsert<%= Singular %>Task(atts);

    expect(update.lastCall.args[0].TableName).to.eq(`${APP}-${STAGE}-<%= plural %>`);
  });

  it('uses uuid as primary key for update', async () => {
    const update = sinon.stub().yields(null, {});
    const upsert<%= Singular %>Task = createTask({ update });

    const atts = {
      uuid: 'uuid',
    };

    await upsert<%= Singular %>Task(atts);

    expect(update.lastCall.args[0].Key.uuid).to.eq(atts.uuid);
  });

  it('JSON stringifies atts for the json field', async () => {
    const update = sinon.stub().yields(null, {});
    const upsert<%= Singular %>Task = createTask({ update });

    const atts = {
      uuid: 'uuid',
      foo:'bar',
    };

    await upsert<%= Singular %>Task(atts);

    expect(update.lastCall.args[0].AttributeUpdates.json.Value).to.eq('{"uuid":"uuid","foo":"bar"}');
  });

  it('if input is already a string, do not JSON stringify input', async () => {
    const update = sinon.stub().yields(null, {});
    const upsert<%= Singular %>Task = createTask({ update });

    const atts = '{"uuid":"uuid","foo":"bar"}';

    await upsert<%= Singular %>Task(atts);

    expect(update.lastCall.args[0].AttributeUpdates.json.Value).to.eq('{"uuid":"uuid","foo":"bar"}');
  });
});

