module.exports = (deps) => {
  const {
    getDefaultTask,
    upsertDefaultTask,
    deleteDefaultTask,
    responseDefault,
    responseError,
    responseSuccess,
  } = deps;

  return (evt, ctx, cb) => {
    const queryStringParameters = evt.queryStringParameters || {};

    let body;

    try {
      body = JSON.parse(evt.body);
    } catch (e) {
      body = {};
    }

    switch (evt.httpMethod) {
      case 'GET':
        return getDefaultTask(queryStringParameters)
          .then(responseSuccess)
          .catch(responseError)
          .then(res => cb(null, res));
      break;

      case 'PUT':
        return upsertDefaultTask(body)
          .then(responseSuccess)
          .catch(responseError)
          .then(res => cb(null, res));
      break;

      case 'POST':
        return upsertDefaultTask(body)
          .then(responseSuccess)
          .catch(responseError)
          .then(res => cb(null, res));
      break;

      case 'DELETE':
        return deleteDefaultTask(queryStringParameters)
          .then(responseSuccess)
          .catch(responseError)
          .then(res => cb(null, res));
      break;

      case 'PATCH':
        return upsertDefaultTask(body)
          .then(responseSuccess)
          .catch(responseError)
          .then(res => cb(null, res));
      break;

      default:
        cb(null, responseDefault());
      break;
    }
  };
};


