const AWS = require('aws-sdk');
const uuidV4 = require('uuid/v4');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-central-1' });

const {
  STAGE,
  APP,
} = process.env;

module.exports = (atts = {}) => {
  return new Promise((resolve, reject) => {
    if (!atts.uuid) {
      atts.uuid = uuidV4();
    }

    const {
      uuid,
    } = atts;

    const params = {
      TableName: `${APP}-${STAGE}-<%= plural %>`,
      Key: {
        uuid
      },
      AttributeUpdates: {
        json: {
          Value: typeof atts === 'string' ? atts : JSON.stringify(atts),
          Action: 'PUT'
        },
      },
    };

    docClient.update(params, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
}

