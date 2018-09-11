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
      '_eslintignore',
      '_eslintrc',
      '_npmrc',
      '_nvmrc',
      '_nycrc',
      'test/_setup.test.js',
      'test/mocha.opts',
    ];

    this.fs.append(
      this.destinationPath('.gitignore'),
      `coverage${EOL}.nyc_output${EOL}*.log${EOL}`
    );

    fileTemplates.forEach((filename) => {
      this.fs.copyTpl(
        this.templatePath(filename),
        this.destinationPath(filename.replace(/^_/, '.')),
        {
          title: pkgConfig.name,
        }
      );
    });
  }

  install() {
    this.npmInstall([
      'chai',
      'mocha',
      'mocha-junit-reporter',
      'nyc',
    ], { 'save-dev': true });
  }
};

