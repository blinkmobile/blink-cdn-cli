'use strict'

const ora = require('ora')
const upload = require('@blinkmobile/aws-s3').upload

const s3Factory = require('../lib/s3-bucket-factory.js')

module.exports = function (input, flags, options) {
  const spinner = ora({spinner: 'growHorizontal', text: 'Uploading to CDN'})

  let sourceDir = input[0] || null

  return s3Factory()
    .then((s3) => {
      const uploadParams = {
        s3,
        skip: flags.skip,
        prune: flags.prune
      }

      if (sourceDir) {
        uploadParams.cwd = sourceDir
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
}
