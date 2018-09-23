const AWS = require('aws-sdk');
const uuidV4 = require('uuid/v4');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-central-1' });

const {
  STAGE,
  APP,
} = process.env;

module.exports = (atts) => {
  return new Promise((resolve, reject) => {
    if (!atts.uuid) {
      atts.uuid = uuidV4();
    }

    const {
      Label,
      uuid,
    } = atts;

    const params = {
      TableName: `${APP}-${STAGE}-defaults`,
      Key: {
        uuid
      },
      AttributeUpdates: {
        Label: {
          Value: Label,
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

