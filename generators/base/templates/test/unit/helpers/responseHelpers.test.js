const {
  responseDefault,
  responseOptions,
  responseSuccess,
  responseError,
} = require('./../../../src/helpers/responseHelpers');

describe('test/unit/helpers/responseHelpers.test.js', () => {
  describe('responseDefault', () => {
    it('statusCode is 405 Method Not Allowed', () => {
      const res = responseDefault();

      expect(res.statusCode).to.eq(405);
    });

    it('headers include Access Control Allow Origin with value *', () => {
      const header = 'Access-Control-Allow-Origin';

      const res = responseDefault();

      expect(res.headers[header]).to.eq('*');
    });

    it('headers include Access Control Allow Credentials with value true', () => {
      const header = 'Access-Control-Allow-Credentials';

      const res = responseDefault();

      expect(res.headers[header]).to.eq(true);
    });
  });

  describe('responseOptions', () => {
    it('headers include Access Control Allow Origin with value *', () => {
      const header = 'Access-Control-Allow-Origin';

      const res = responseOptions();

      expect(res.headers[header]).to.eq('*');
    });

    it('headers include Access Control Allow Credentials with value true', () => {
      const header = 'Access-Control-Allow-Credentials';

      const res = responseOptions();

      expect(res.headers[header]).to.eq(true);
    });

    it('headers include Access Control Allow Methods with value GET,PUT,POST,DELETE,PATCH', () => {
      const header = 'Access-Control-Allow-Methods';

      const res = responseOptions();

      expect(res.headers[header]).to.eq('GET,PUT,POST,DELETE,PATCH');
    });

    it('headers include Access Control Allow Headers with value Content-Type, *', () => {
      const header = 'Access-Control-Allow-Headers';

      const res = responseOptions();

      expect(res.headers[header]).to.eq('Content-Type, *');
    });
  });

  describe('responseSuccess', () => {
    it('returns response.body as a JSON string', () => {
      const data = { status: 'success' };
      const res = responseSuccess(data);

      expect(res.body).to.eq(JSON.stringify(data));
    });

    it('returns response.statusCode 200', () => {
      const data = { status: 'success' };
      const res = responseSuccess(data);

      expect(res.statusCode).to.eq(200);
    });

    it('headers include Access Control Allow Origin with value *', () => {
      const header = 'Access-Control-Allow-Origin';

      const data = { status: 'success' };
      const res = responseSuccess(data);

      expect(res.headers[header]).to.eq('*');
    });

    it('headers include Access Control Allow Credentials with value true', () => {
      const header = 'Access-Control-Allow-Credentials';

      const data = { status: 'success' };
      const res = responseSuccess(data);

      expect(res.headers[header]).to.eq(true);
    });
  });

  describe('responseError', () => {
    it('returns error code in response.body if no data or body exists in the error', () => {
      const header = 'Access-Control-Allow-Origin';

      const err = {
        response: {
          status: 502
        }
      };

      const res = responseError(err);

      expect(res.body).to.eq(502);
    });

    it('returns response.body based on error.response.body if it exists', () => {
      const header = 'Access-Control-Allow-Origin';

      const err = {
        response: {
          status: 404,
          body: '404 Not Found'
        }
      };

      const res = responseError(err);

      expect(res.body).to.eq('404 Not Found');
    });

    it('returns response.body based on error.response.data if it exists', () => {
      const header = 'Access-Control-Allow-Origin';

      const err = {
        response: {
          status: 404,
          data: '404 Not Found'
        }
      };

      const res = responseError(err);

      expect(res.body).to.eq('404 Not Found');
    });

    it('returns response.statusCode based on error.response.status', () => {
      const header = 'Access-Control-Allow-Origin';

      const err = {
        response: {
          status: 500
        }
      };

      const res = responseError(err);

      expect(res.statusCode).to.eq(500);
    });

    it('headers include Access Control Allow Origin with value *', () => {
      const header = 'Access-Control-Allow-Origin';

      const err = {
        response: {
          status: 500
        }
      };

      const res = responseError(err);

      expect(res.headers[header]).to.eq('*');
    });

    it('headers include Access Control Allow Credentials with value true', () => {
      const header = 'Access-Control-Allow-Credentials';

      const err = {
        response: {
          status: 500
        }
      };

      const res = responseError(err);

      expect(res.headers[header]).to.eq(true);
    });
  });
});

