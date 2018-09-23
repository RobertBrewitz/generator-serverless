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
      'config/functions/resources-function.yml',
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
        this.destinationPath(filename.replace(/Resource/, Singular).replace(/resources-/,`${plural}-`)),
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

    const newHandler = handler.toString().split(EOL).map((line, index) => {
      if (index === 3) {
        line += `${EOL}const create${Singular}Function = require('./src/functions/create${Singular}Function');`;
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

      return line;
    }).join(EOL);

    this.fs.write(this.destinationPath('handler.js'), newHandler)

    // Update serverless.yml
    const serverlessYaml = yaml.safeLoad(this.fs.read(this.destinationPath('serverless.yml')));
    serverlessYaml.functions.push(`\${file(config/functions/${plural}-function.yml)}`);
    serverlessYaml.resources.push(`\${file(config/resources/${plural}-table.yml)}`);
    this.fs.write(this.destinationPath('serverless.yml'), yaml.safeDump(serverlessYaml));

    // DynamoDB IAM Policy
    const dynamoDBIamYaml = yaml.safeLoad(this.fs.read(this.destinationPath('config/resources/dynamodb-iam-policy.yml')));
    dynamoDBIamYaml.Resources.DynamoDBIamPolicy.DependsOn.push(`${Plural}Table`);
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


