# Change Log


## Unreleased

### Added

-   CC-20: Integrate bm-identity.js to allow for single login
-   CC-31: Update Documentation for identity cli integration
-   CC-32: Error stack trace output when using `--debug` flag

### Changed

-   CC-20: dropped semistandard style in favor of standard style

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
