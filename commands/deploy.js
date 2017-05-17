/* @flow */
'use strict'

const ora = require('ora')
const upload = require('@blinkmobile/aws-s3').upload

const confirm = require('../lib/utils/confirm.js')
const s3Factory = require('../lib/s3-bucket-factory.js')

module.exports = function (
  input /* : string[] */,
  flags /* : Object */
) /* : Promise<void> */ {
  return confirm(flags.force)
    .then((confirmation) => {
      if (!confirmation) {
        return
      }

      const spinner = ora({spinner: 'growHorizontal', text: 'Uploading to CDN'})

      return s3Factory(flags.cwd)
        .then((s3) => {
          const uploadParams = {
            s3,
            skip: flags.skip,
            prune: flags.prune,
            cwd: flags.cwd
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
          spinner.stop()
        })
        .catch((err) => {
          spinner.stop()
          return Promise.reject(err)
        })
    })
}
