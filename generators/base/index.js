const Generator = require('yeoman-generator');
const { EOL } = require('os');

module.exports = class extends Generator {
  writing() {
    const pkgConfig = require(this.destinationPath('package.json'));

    pkgConfig.scripts = pkgConfig.scripts || {};

    pkgConfig.scripts['lint'] = 'eslint src/**/**.js test/**/**.js --quiet';
    pkgConfig.scripts['lint:fix'] = 'eslint src/**/**.js test/**/**.js --fix --quiet';
    pkgConfig.scripts['test'] = 'nyc mocha';
    pkgConfig.scripts['test:ci'] = 'nyc mocha -R mocha-junit-reporter && nyc report';
    pkgConfig.scripts['test:functional'] = 'nyc mocha test/functional';
    pkgConfig.scripts['test:integration'] = 'nyc mocha test/integration';
    pkgConfig.scripts['test:regression'] = 'nyc mocha test/regression';
    pkgConfig.scripts['test:unit'] = 'nyc mocha test/unit';

    this.fs.writeJSON(
      this.destinationPath('package.json'),
      pkgConfig
    );

    const fileTemplates = [
      '_editorconfig',
      '_env',
      '_eslintignore',
      '_eslintrc',
      '_npmrc',
      '_nvmrc',
      '_nycrc',
      'config/resources/cognito-user-pools-authorizer.yml',
      'config/resources/cognito-identity-pool.yml',
      'config/resources/cognito-user-pool.yml',
      'config/resources/dynamodb-iam-policy.yml',
      'handler.js',
      'serverless.yml',
      'src/helpers/responseHelpers.js',
      'test/_setup.test.js',
      'test/integration/handler.test.js',
      'test/mocha.opts',
      'test/unit/helpers/responseHelpers.test.js',
    ];

    this.fs.append(
      this.destinationPath('.gitignore'),
      `coverage${EOL}.nyc_output${EOL}*.log${EOL}`
    );

    const serviceName = pkgConfig.name.replace(/[^a-z]/gi, '');

    fileTemplates.forEach((filename) => {
      this.fs.copyTpl(
        this.templatePath(filename),
        this.destinationPath(filename.replace(/^_/, '.')),
        {
          serviceName,
        }
      );
    });
  }

  install() {
    this.npmInstall([
      'chai',
      'dotenv',
      'eslint',
      'mocha',
      'mocha-junit-reporter',
      'nyc',
      'proxyquire',
      'sinon',
    ], { 'save-dev': true });

    this.npmInstall([
      'axios',
      'aws-sdk',
      'uuid',
    ]);
  }
};

