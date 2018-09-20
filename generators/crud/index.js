const Generator = require('yeoman-generator');
const { execSync } = require('child_process');
const { EOL } = require('os');
const yaml = require('js-yaml');

const capitalise = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};

module.exports = class extends Generator {
  prompting() {
    const done = this.async();

    const plural = {
      type: 'input',
      name: 'plural',
      message: 'Plural resource name?',
    };

    const singular = {
      type: 'input',
      name: 'singular',
      message: 'Singular resource name?',
    };

    return this.prompt([
      plural,
      singular,
    ]).then((answers) => {
      this.answers = {
        plural: answers.plural.toLowerCase(),
        singular: answers.singular.toLowerCase(),
      };

      done();
    });
  }

  writing() {
    const {
      plural,
      singular,
    } = this.answers;

    const Plural = capitalise(plural);
    const Singular = capitalise(singular);

    const fileTemplates = [
      'src/functions/createResourceFunction.js',
      'src/tasks/upsertResourceTask.js',
      'src/tasks/getResourceTask.js',
      'src/tasks/deleteResourceTask.js',
      'test/unit/functions/createResourceFunction.test.js',
      'test/unit/tasks/upsertResourceTask.test.js',
      'test/unit/tasks/getResourceTask.test.js',
      'test/unit/tasks/deleteResourceTask.test.js',
    ];

    fileTemplates.forEach((filename) => {
      this.fs.copyTpl(
        this.templatePath(filename),
        this.destinationPath(filename.replace(/Resource/, Singular)),
        {
          Plural,
          Singular,
          plural,
          singular,
        }
      );
    });

    // Update handler.js
    const handler = this.fs.read(this.destinationPath('handler.js'));

    const newHandler = handler.toString().split(EOL).map((line) => {
      if (line.match(/\/\/ Functions/)) {
        line += `${EOL}const create${Singular}Function = require('./src/functions/create${Singular}Function');`;
      }

      if (line.match(/\/\/ Tasks/)) {
        line += `${EOL}const delete${Singular}Task = require('./src/tasks/delete${Singular}Task');`;
        line += `${EOL}const get${Singular}Task = require('./src/tasks/get${Singular}Task');`;
        line += `${EOL}const upsert${Singular}Task = require('./src/tasks/upsert${Singular}Task');`;
      }

      if (line.match(/module.exports = {/)) {
        line += EOL;
        line += `  ${singular}Function: create${Singular}Function({${EOL}`;
        line += `    delete${Singular}Task,${EOL}`;
        line += `    get${Singular}Task,${EOL}`;
        line += `    responseDefault,${EOL}`;
        line += `    responseError,${EOL}`;
        line += `    responseSuccess,${EOL}`;
        line += `    upsert${Singular}Task,${EOL}`;
        line += '  }),';
      }

      if (line.match(/const stores/) && !createStoresDone) {
        line += storeCreate;
        line += listStoreCreate;

        createStoresDone = true;
      }

      return line;
    }).join(EOL);

    this.fs.write(this.destinationPath('handler.js'), newHandler)

    // Update serverless.yml
    const serverlessYaml = yaml.safeLoad(this.fs.read(this.destinationPath('serverless.yml')));

    // DynamoDB Table
    serverlessYaml.resources.Resources[`${Plural}Table`] = {
      Type: 'AWS::DynamoDB::Table',
      Properties: {
        TableName: `\${self:provider.stage}-${plural}`,
        AttributeDefinitions: [
          {
            AttributeName: 'uuid',
            AttributeType: 'S',
          },
        ],
        KeySchema: [
          {
            AttributeName: 'uuid',
            KeyType: 'HASH',
          },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    };

    // DynamoDB IAM Policy
    serverlessYaml.resources.Resources.DynamoDBIamPolicy.DependsOn.push(`${Plural}Table`);
    serverlessYaml.resources.Resources.DynamoDBIamPolicy.Properties.PolicyDocument.Statement.push({
      Effect: 'Allow',
      Action: [
        'dynamodb:Scan',
        'dynamodb:GetItem',
        'dynamodb:UpdateItem',
        'dynamodb:DeleteItem',
      ],
      Resource: `arn:aws:dynamodb:*:*:table/\${self:provider.stage}-${plural}`,
    });

    // Function
    serverlessYaml.functions[`${singular}Function`] = {
      name: `\${self:provider.stage}-${singular}Function`,
      handler: `handler.${singular}Function`,
      memorySize: 128,
      events: [
        {
          http: {
            path: plural,
            method: 'any',
            cors: {
              allowCredentials: false,
              origin: '*',
              headers: [
                'Content-Type',
                'Access-Control-Allow-Origin',
                'Authorization',
              ],
            },
          },
        },
      ],
    };

    this.fs.write(this.destinationPath('serverless.yml'), yaml.safeDump(serverlessYaml));
  }
};


