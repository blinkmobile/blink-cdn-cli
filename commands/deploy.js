/* @flow */
'use strict'

const ora = require('ora')
const chalk = require('chalk')
const upload = require('@blinkmobile/aws-s3').upload

const confirm = require('../lib/utils/confirm.js')
const bucketParams = require('../lib/s3-bucket-params.js')

const s3Factory = require('../lib/s3-bucket-factory.js')

function getFQDN (
  project /* : string */,
  env /* : string */
) /* : string */ {
  if (env.toLowerCase() === 'prod') {
    return project
  }
  const arr = project.split('.')
  arr[0] += `-${env}`
  return arr.join('.')
}

module.exports = function (
  input /* : string[] */,
  flags /* : Object */
) /* : Promise<void> */ {
  return bucketParams.read(flags.cwd)
    .then((bucketDetails) => {
      const fqdn = getFQDN(bucketDetails.params.Bucket, flags.env)
      return confirm(flags.force, flags.env)
        .then((confirmation) => {
          if (!confirmation) {
            return
          }

          const spinner = ora({spinner: 'dots', text: 'Uploading to CDN'})

          return s3Factory(bucketDetails, flags.env)
            .then((s3) => {
              const uploadParams = {
                s3,
                skip: flags.skip,
                prune: flags.prune,
                cwd: flags.cwd,
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
            })
            .then(() => {
              spinner.succeed('Deployment complete - Origin: ' + chalk.bold(`https://${fqdn}`))
            })
            .catch((err) => {
              spinner.fail('Deployment failed!')
              return Promise.reject(err)
            })
        })
    })
}
