module.exports = (deps = {}) => {
  const {
    get<%= Singular %>Task,
    upsert<%= Singular %>Task,
    delete<%= Singular %>Task,
    responseBad,
    responseError,
    responseSuccess,
  } = deps;

  return (evt, ctx, cb) => {
    const queryStringParameters = evt.queryStringParameters || {};

    let body;

    try {
      body = JSON.parse(evt.body);
    } catch (e) {
      body = {};
    }

    switch (evt.httpMethod) {
      case 'GET':
        return get<%= Singular %>Task(queryStringParameters)
          .then(responseSuccess)
          .catch(responseError)
          .then(res => cb(null, res));

      case 'PUT':
        return upsert<%= Singular %>Task(body)
          .then(responseSuccess)
          .catch(responseError)
          .then(res => cb(null, res));

      case 'POST':
        return upsert<%= Singular %>Task(body)
          .then(responseSuccess)
          .catch(responseError)
          .then(res => cb(null, res));

      case 'DELETE':
        return delete<%= Singular %>Task(queryStringParameters)
          .then(responseSuccess)
          .catch(responseError)
          .then(res => cb(null, res));

      case 'PATCH':
        return upsert<%= Singular %>Task(body)
          .then(responseSuccess)
          .catch(responseError)
          .then(res => cb(null, res));

      default:
        cb(null, responseBad());
    }
  };
};


