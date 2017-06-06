# Change Log


## Unreleased

### Added

-   CC-37: `environment` parameter when assuming AWS role
-   CC-37: `bm client deploy <path>` parameter to allow deploying files in a sub directory relative to the current working directory or `--cwd` flag if specified

### Changed

-   CC-37: CI node version from 6 and 7 to 6 and 8

## 1.0.0 - 2017-05-23

### Added

-   CC-20: Integrate bm-identity.js to allow for single login
-   CC-31: Update Documentation for identity cli integration
-   CC-32: Error stack trace output when using `--debug` flag
-   CC-32: `--cwd` flag to `deploy` and `scope` commands
-   CC-32: `--force` flag to `deploy` command to prevent confirmation prompt
-   CC-32: `--env` flag to `deploy` command to deploy to a specific environment

### Removed

-   CC-32: `<path>` option from deploy command (functionality has been replaced by `--cwd` flag)


### Changed

-   CC-20: dropped semistandard style in favor of standard style


### Dependencies

-   no longer depend upon [@blinkmobile/aws-profile-management](https://www.npmjs.com/package/@blinkmobile/aws-profile-management)

-   update [@blinkmobile/aws-s3](https://www.npmjs.com/package/@blinkmobile/aws-s3) to [2.2.0](https://github.com/blinkmobile/aws-s3.js/blob/master/CHANGELOG.md) (from [
2.1.0](https://github.com/blinkmobile/aws-s3.js/releases/tag/2.1.0))

-   no longer depend upon [elegant-spinner](https://www.npmjs.com/package/elegant-spinner)

-   no longer depend upon [log-update](https://www.npmjs.com/package/log-update)

-   update [update-notifier](https://www.npmjs.com/package/update-notifier) to 2.1.0 (from 1.0.2)

-   depend upon [@blinkmobile/bm-identity](https://www.npmjs.com/package/@blinkmobile/bm-identity) [2.3.4](https://github.com/blinkmobile/bm-identity.js/blob/master/CHANGELOG.md)

-   depend upon [aws-sdk](https://www.npmjs.com/package/aws-sdk) [2.55.0](https://github.com/aws/aws-sdk-js/blob/master/CHANGELOG.md)

-   depend upon [chalk](https://www.npmjs.com/package/chalk) 1.1.3

-   depend upon [inquirer](https://www.npmjs.com/package/inquirer) 3.0.6

-   depend upon [ora](https://www.npmjs.com/package/ora) 1.2.0


## 0.3.0 - 2016-10-31


### Added

-   CC-17: ignore files per [.blinkmignore](https://github.com/blinkmobile/aws-s3.js#blinkmignore)


### Changed

-   CC-17: update to  [blinkmobile/aws-s3.js 2.1.0](https://github.com/blinkmobile/aws-s3.js/releases/tag/2.1.0)



## 0.2.0


### Changed

- CC-16: update to  [blinkmobile/aws-s3.js 2.0.0](https://github.com/blinkmobile/aws-s3.js/releases/tag/2.0.0)


### Added

- CC-16: `deploy --prune` options


### Fixed

- CC-14: `deploy` now uses the cwd if no path is specified


## 0.1.0 - 2016-04-05


### Added

- CC-11: `deploy --skip` (default) and `deploy --no-skip` options (#13, @jokeyrhyme)


### Changed

- CC-11: update to [blinkmobile/aws-s3.js 1.2.0](https://github.com/blinkmobile/aws-s3.js/releases/tag/1.2.0) (#13, @jokeyrhyme)

- made documentation a bit more like [blinkmobile/bmp-cli](https://github.com/blinkmobile/bmp-cli), which means CLI `--help` and README.md are synchronised via copy-paste (simpler than 2 versions)
