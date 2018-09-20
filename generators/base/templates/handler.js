const {
  responseDefault,
  responseError,
  responseSuccess,
} = require('./src/helpers/responseHelpers');

// Functions - Keep comment for generator
const createDefaultFunction = require('./src/functions/createDefaultFunction');

// Tasks - Keep comment for generator
const deleteDefaultTask = require('./src/tasks/deleteDefaultTask');
const getDefaultTask = require('./src/tasks/getDefaultTask');
const upsertDefaultTask = require('./src/tasks/upsertDefaultTask');

module.exports = {
  defaultFunction: createDefaultFunction({
    deleteDefaultTask,
    getDefaultTask,
    responseDefault,
    responseError,
    responseSuccess,
    upsertDefaultTask,
  }),
};

