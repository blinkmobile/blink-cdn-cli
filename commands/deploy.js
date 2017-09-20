/* @flow */
'use strict'

const path = require('path')

const ora = require('ora')
const chalk = require('chalk')
const upload = require('@blinkmobile/aws-s3').upload

const pkg = require('../package.json')
const BlinkMobileIdentity = require('@blinkmobile/bm-identity')
const blinkMobileIdentity = new BlinkMobileIdentity(pkg.name)

const confirm = require('../lib/utils/confirm.js')
const bucketParams = require('../lib/s3-bucket-params.js')
const provisionEnvironment = require('../lib/provision-environment.js')
const getAwsCredentials = require('../lib/aws-credentials.js')
const scope = require('../lib/scope.js')
const getFQDN = require('../lib/utils/get-fqdn.js')

const s3Factory = require('../lib/s3-bucket-factory.js')

module.exports = function (
  input /* : string[] */,
  flags /* : Object */
) /* : Promise<void> */ {
  return confirm(flags.force, flags.env)
    .then((confirmation) => {
      if (!confirmation) {
        return
      }
      return Promise.all([
        blinkMobileIdentity.getAccessToken(),
        scope.read(flags.cwd)
      ])
        .then(([accessToken, cfg]) => {
          return getAwsCredentials(cfg, flags.env, accessToken)
            .then((awsCredentials) => {
              return provisionEnvironment(cfg, flags.env, accessToken)
                .then(() => awsCredentials)
            })
            .then((awsCredentials) => {
              return bucketParams.read(flags.cwd)
                .then((bucketDetails) => s3Factory(bucketDetails, awsCredentials))
            })
            .then((s3) => {
              const spinner = ora({spinner: 'dots', text: 'Uploading to CDN'})
              const uploadParams = {
                s3,
                skip: flags.skip,
                prune: flags.prune,
                // Allow deployment of files in a sub directory to the current working directory
                cwd: path.join(flags.cwd, (input[0] || '.')),
                bucketPathPrefix: flags.env
              }

              spinner.start()
              const task = upload(uploadParams)
              task.on('skipped', (fileName) => {
                spinner.warn(`skipped: ${fileName}`)
              })
              task.on('uploaded', (fileName) => {
                spinner.succeed(`uploaded: ${fileName}`)
              })
              task.on('deleted', (fileName) => {
                spinner.warn(`deleted: ${fileName}`)
              })
              return task.promise
                .then(() => {
                  const fqdn = getFQDN(s3.config.params.Bucket, flags.env)
                  spinner.succeed('Deployment complete - Origin: ' + chalk.bold(`https://${fqdn}`))
                })
                .catch((err) => {
                  spinner.fail('Deployment failed!')
                  return Promise.reject(err)
                })
            })
        })
    })
}
