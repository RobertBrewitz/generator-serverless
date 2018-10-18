module.exports = {
  responseBad: () => {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    };
  },
  responseSuccess: (res = {}) => {
    let body = res.data || res.body;

    try {
      if (body) {
        body = JSON.stringify(body);
      } else {
        body = JSON.stringify(res);
      }
    } catch (e) {
      // Do nothing
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body,
    };
  },
  responseError: (err) => {
    return {
      statusCode: (err.response && err.response.status) || 502,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: err.response && (err.response.body || err.response.data || err.response.status) || err
    };
  },
};

