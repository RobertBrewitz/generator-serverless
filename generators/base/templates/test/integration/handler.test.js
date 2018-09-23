const handler = require('./../../handler');

describe('test/integration/handler.test.js', () => {
  it('initializes without any hiccups', () => {
    expect(handler.defaultsFunction).to.be.a('function');
  });
});

