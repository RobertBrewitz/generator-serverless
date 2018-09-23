const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-central-1' });

const {
  STAGE,
  APP,
} = process.env;

module.exports = (atts) => {
  return new Promise((resolve, reject) => {
    if (!atts.uuid) {
      return reject({
        response: {
          body: JSON.stringify({
            message: 'Must supply a uuid',
          }),
          status: 400,
        }
      });
    }

    const {
      uuid,
    } = atts;

    const params = {
      Key: {
        uuid,
      },
      TableName: `${APP}-${STAGE}-<%= plural %>`,
    };

    docClient.delete(params, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
}

