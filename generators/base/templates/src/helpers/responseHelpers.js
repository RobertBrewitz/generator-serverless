module.exports = {
  responseDefault: () => {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    };
  },
  responseSuccess: (data) => {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(data)
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

