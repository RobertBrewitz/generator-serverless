const Generator = require('yeoman-generator');
const { execSync } = require('child_process');
const { EOL } = require('os');
const yaml = require('js-yaml');

const {
  upcaseFirstLetter,
  downcaseFirstLetter,
  kebabCase,
} = require('./../helpers/inputHelpers');

module.exports = class extends Generator {
  prompting() {
    const done = this.async();

    const singular = {
      type: 'input',
      name: 'singular',
      message: 'Singular resource name? (CamelCase)',
    };

    const plural = {
      type: 'input',
      name: 'plural',
      message: 'Plural resource name? (CamelCase)',
    };

    return this.prompt([
      singular,
      plural,
    ]).then((answers) => {
      this.answers = {
        singular: downcaseFirstLetter(answers.singular),
        plural: downcaseFirstLetter(answers.plural),
      };

      done();
    });
  }

  writing() {
    const {
      plural,
      singular,
    } = this.answers;

    const pluralFilename = kebabCase(plural);
    const singularFilename = kebabCase(singular);

    const Plural = upcaseFirstLetter(plural);
    const Singular = upcaseFirstLetter(singular);

    const fileTemplates = [
      'config/functions/resource-function.yml',
      'config/resources/resources-table.yml',
      'src/functions/createResourceFunction.js',
      'src/tasks/deleteResourceTask.js',
      'src/tasks/getResourceTask.js',
      'src/tasks/upsertResourceTask.js',
      'test/unit/functions/createResourceFunction.test.js',
      'test/unit/tasks/deleteResourceTask.test.js',
      'test/unit/tasks/getResourceTask.test.js',
      'test/unit/tasks/upsertResourceTask.test.js',
    ];

    fileTemplates.forEach((filename) => {
      this.fs.copyTpl(
        this.templatePath(filename),
        this.destinationPath(
          filename
            .replace(/Resource/, Singular)
            .replace(/resource-function/, `${singularFilename}-function`)
            .replace(/resources-table/, `${pluralFilename}-table`)
        ),
        {
          Plural,
          Singular,
          plural,
          singular,
          pluralFilename,
        }
      );
    });

    // Update handler.js
    const handler = this.fs.read(this.destinationPath('handler.js'));

    const newHandler = handler.toString().split(EOL).map((line, index) => {
      const originalLine = line;

      if (index === 0) {
        line = '';
        line += `const create${Singular}Function = require('./src/functions/create${Singular}Function');${EOL}`;
        line += `const delete${Singular}Task = require('./src/tasks/delete${Singular}Task');${EOL}`;
        line += `const get${Singular}Task = require('./src/tasks/get${Singular}Task');${EOL}`;
        line += `const upsert${Singular}Task = require('./src/tasks/upsert${Singular}Task');${EOL}`;
        line += originalLine;
      }

      if (line.match(/module.exports = {/)) {
        line += EOL;
        line += `  ${singular}Function: create${Singular}Function({${EOL}`;
        line += `    delete${Singular}Task,${EOL}`;
        line += `    get${Singular}Task,${EOL}`;
        line += `    responseBad,${EOL}`;
        line += `    responseError,${EOL}`;
        line += `    responseSuccess,${EOL}`;
        line += `    upsert${Singular}Task,${EOL}`;
        line += '  }),';
      }

      return line;
    }).join(EOL);

    this.fs.write(this.destinationPath('handler.js'), newHandler)

    // Update serverless.yml
    const serverlessYaml = yaml.safeLoad(this.fs.read(this.destinationPath('serverless.yml')));
    serverlessYaml.functions = serverlessYaml.functions || [];
    serverlessYaml.functions.push(`\${file(config/functions/${singularFilename}-function.yml)}`);
    serverlessYaml.resources.push(`\${file(config/resources/${pluralFilename}-table.yml)}`);
    this.fs.write(this.destinationPath('serverless.yml'), yaml.safeDump(serverlessYaml));

    // DynamoDB IAM Policy
    const dynamoDBIamYaml = yaml.safeLoad(this.fs.read(this.destinationPath('config/resources/dynamodb-iam-policy.yml')));
    dynamoDBIamYaml.Resources.DynamoDBIamPolicy.DependsOn = dynamoDBIamYaml.Resources.DynamoDBIamPolicy.DependsOn || [];
    dynamoDBIamYaml.Resources.DynamoDBIamPolicy.DependsOn.push(`${Plural}Table`);
    dynamoDBIamYaml.Resources.DynamoDBIamPolicy.Properties.PolicyDocument.Statement = dynamoDBIamYaml.Resources.DynamoDBIamPolicy.Properties.PolicyDocument.Statement || [];
    dynamoDBIamYaml.Resources.DynamoDBIamPolicy.Properties.PolicyDocument.Statement.push({
      Effect: 'Allow',
      Action: [
        'dynamodb:DescribeTable',
        'dynamodb:Query',
        'dynamodb:Scan',
        'dynamodb:GetItem',
        'dynamodb:PutItem',
        'dynamodb:UpdateItem',
        'dynamodb:DeleteItem',
      ],
      Resource: [
        { 'Fn::GetAtt': `${Plural}Table.Arn` },
      ],
    });
    this.fs.write(this.destinationPath('config/resources/dynamodb-iam-policy.yml'), yaml.safeDump(dynamoDBIamYaml));
  }
};


