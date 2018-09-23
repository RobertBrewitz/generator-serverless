const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-central-1' });

const {
  STAGE,
  APP,
} = process.env;

const ITEM_STRUCT = {
  Label: '',
};

module.exports = (atts) => {
  return new Promise((resolve, reject) => {
    if (!atts.uuid) {
      const params = {
        TableName: `${APP}-${STAGE}-defaults`,
      };

      return docClient.scan(params, (err, data) => {
        if (err) {
          return reject(err);
        }

        resolve(data);
      });
    }

    const {
      uuid,
    } = atts;

    const params = {
      Key: {
        uuid,
      },
      TableName: `${APP}-${STAGE}-defaults`,
    };

    docClient.get(params, (err, res) => {
      if (err) {
        return reject(err);
      }

      if (res.data && res.data.Item) {
        res.data.Item = {
          ...ITEM_STRUCT,
          ...res.data.Item,
        };
      }

      resolve(res);
    });
  });
}

