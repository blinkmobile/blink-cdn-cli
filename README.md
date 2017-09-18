# blinkmobile / client-cli  [![npm](https://img.shields.io/npm/v/@blinkmobile/client-cli.svg?maxAge=2592000)](https://www.npmjs.com/package/@blinkmobile/client-cli) [![AppVeyor Status](https://ci.appveyor.com/api/projects/status/github/blinkmobile/client-cli?branch=master&svg=true)](https://ci.appveyor.com/project/blinkmobile/client-cli) [![Travis CI Status](https://travis-ci.org/blinkmobile/client-cli.svg?branch=master)](https://travis-ci.org/blinkmobile/client-cli) [![Greenkeeper badge](https://badges.greenkeeper.io/blinkmobile/client-cli.svg)](https://greenkeeper.io/)

CLI to deploy client-side web applications with BlinkMobile.

## Installation

```
npm install -g @blinkmobile/cli @blinkmobile/identity-cli @blinkmobile/client-cli
```

## Documentation

See the [Documentation](./docs/README.md) directory for more details.

## Usage

```sh
blinkm client --help

# or, shorter
bm client --help
```

```
Usage: blinkm client <command>

Where command is one of:

  scope, deploy

Initial settings:
    scope                 => outputs the current scope
    scope <S3Bucket>      => sets the bucket
      --region <S3Region> => optionally sets the region
      --cwd <path>        => outputs or set the scope in <path>
      --debug             => output debug information

Deploying client side code:

  The deploy command requires a login to BlinkMobile before use.
  For help on the login and logout commands please see:
  https://github.com/blinkmobile/identity-cli#usage

    deploy                => uploads files in the current working directory to the scoped bucket
      <path>              => uploads files in <path> (relative to the --cwd flag) to the scoped bucket
      --env <environment> => optionally sets the environment to deploy to, defaults to 'dev'
      --force             => deploy without confirmation
      --skip              => bypass unchanged files (default)
      --no-skip           => upload all files, including unchanged
      --prune             => remove files that do not exist locally from the server
      --cwd <path>        => specify the directory containing .blinkmrc.json file (defaults to '.')
      --debug             => output debug information
```

### .blinkmignore

Skip ignored files and directories during upload.

See [.blinkmignore](https://github.com/blinkmobile/aws-s3.js#blinkmignore)
