# Yeoman generator for Rapid Proof-of-Concepts in Serverless

[![npm](https://img.shields.io/npm/v/@rpoc/generator-serverless.svg)](https://www.npmjs.com/package/@rpoc/generator-serverless)
[![npm](https://img.shields.io/npm/dt/@rpoc/generator-serverless.svg)](https://www.npmjs.com/package/@rpoc/generator-serverless)
[![NpmLicense](https://img.shields.io/npm/l/@rpoc/generator-serverless.svg)](https://opensource.org/licenses/MIT)

A collection of Serverless generators for developing Rapid Proof-of-Concepts.

## Node version

Using the latest major LTS node version, currently Node 8.

## Installation

```bash
nvm use 8
npm install -g serverless yo @rpoc/generator-serverless
```

## Generators

### Base

Sets up a unit-tested RESTful API serverless application for AWS API Gateway, using Lambda and DynamoDB.

- AWS-SDK
- Axios
- Chai
- Editorconfig
- Eslint
- Mocha
- Nyc
- Proxyquire
- Sinon
- UUID

```bash
serverless create --template aws-nodejs --path myapi
cd myapi
npm init
yo @rpoc/serverless:base
sls deploy
```

You can now invoke your RESTful API, your endpoint (<endpoint URL>) is outputted when deploy is done.

```bash
  curl -X OPTIONS <endpoint URL>
  curl -X POST <endpoint URL> --data '"{ "uuid": "1", "Label": "Default 1" }'
  curl -X PUT <endpoint URL> --data '"{ "uuid": "1", "Label": "Default One" }'
  curl -X PATCH <endpoint URL> --data '"{ "uuid": "1", "Label": "Default #1" }'
  curl -X GET <endpoint URL>
  curl -X GET <endpoint URL>?uuid=1
  curl -X DELETE <endpoint URL>?uuid=1
```

### CRUD

Add a Resource with create, read, update, and delete REST API.

Requires `@rpoc/serverless:base` generator to have been run

```
yo @rpoc/serverless:crud
```

## LICENSE

Copyright 2018 Robert Brewitz Borg

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
