const createDefaultsFunction = require('./src/functions/createDefaultsFunction');
const deleteDefaultTask = require('./src/tasks/deleteDefaultTask');
const getDefaultTask = require('./src/tasks/getDefaultTask');
const upsertDefaultTask = require('./src/tasks/upsertDefaultTask');

const {
  responseDefault,
  responseError,
  responseSuccess,
} = require('./src/helpers/responseHelpers');

module.exports = {
  defaultsFunction: createDefaultsFunction({
    deleteDefaultTask,
    getDefaultTask,
    responseDefault,
    responseError,
    responseSuccess,
    upsertDefaultTask,
  }),
};

