const {
  STAGE,
  APP,
} = process.env;

const createTask = ({ get, scan }) => {
  // Proxyquire assigned to global in _setup.test.js so working directory is `test/`
  return proxyquire('./../src/tasks/getDefaultTask', {
    'aws-sdk': {
      DynamoDB: {
        DocumentClient: function () {
          this.get = get;
          this.scan = scan;
        },
      },
    },
  });
};

describe('test/unit/tasks/getDefaultTask.test.js', () => {
  it(`if uuid is supplied it gets item with that uuid from ${APP}-${STAGE}-defaults table and does not scan`, async () => {
    const scan = sinon.stub().yields(null, {});
    const get = sinon.stub().yields(null, {});

    const event = {
      uuid: '1',
    };

    const getDefaultTask = createTask({ scan, get });

    await getDefaultTask(event);

    expect(scan.called).to.be.false;
    expect(get.called).to.be.true;
    expect(get.firstCall.args[0].TableName).to.eq(`${APP}-${STAGE}-defaults`);
    expect(get.firstCall.args[0].Key.uuid).to.eq(event.uuid);
  });

  it(`if no uuid is supplied it scans ${APP}-${STAGE}-defaults table and does not get`, async () => {
    const scan = sinon.stub().yields(null, {});
    const get = sinon.stub().yields(null, {});

    const event = {};

    const getDefaultTask = createTask({ scan, get });

    await getDefaultTask(event);

    expect(scan.called).to.be.true;
    expect(scan.firstCall.args[0].TableName).to.eq(`${APP}-${STAGE}-defaults`);
    expect(get.called).to.be.false;
  });
});

