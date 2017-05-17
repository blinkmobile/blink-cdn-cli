# Client Side code deployment [![npm](https://img.shields.io/npm/v/@blinkmobile/client-cli.svg?maxAge=2592000)](https://www.npmjs.com/package/@blinkmobile/client-cli) [![AppVeyor Status](https://ci.appveyor.com/api/projects/status/github/blinkmobile/client-cli?branch=master&svg=true)](https://ci.appveyor.com/project/blinkmobile/client-cli) [![Travis CI Status](https://travis-ci.org/blinkmobile/client-cli.svg?branch=master)](https://travis-ci.org/blinkmobile/client-cli) [![Greenkeeper badge](https://badges.greenkeeper.io/blinkmobile/client-cli.svg)](https://greenkeeper.io/)

This tool is for deploying client side code for web apps to the Blink Mobile CDN.

See [usage.md](https://github.com/blinkmobile/client-cli/blob/develop/docs/usage.md) for detailed usage instructions.

## Installation

```
npm install -g @blinkmobile/cli @blinkmobile/client-cli
```

## Usage

```sh
blinkm client --help

# or, shorter

bm client --help
```

```
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
      --force             => deploy without confirmation
      --skip              => bypass unchanged files (default)
      --no-skip           => upload all files, including unchanged
      --prune             => remove files that do not exist locally from the server
      --cwd <path>        => uploads files in the <path> to the scoped bucket
      --debug             => output debug information
```

### .blinkmignore

Skip ignored files and directories during upload.

See [.blinkmignore](https://github.com/blinkmobile/aws-s3.js#blinkmignore)
