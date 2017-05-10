module.exports = `
  Usage: bm client <command>

  Where command is one of:

  scope, deploy

Initial settings:
    scope                 => outputs the current scope
    scope <S3Bucket>      => sets the bucket
      --region <S3Region> => optionally sets the region

Deploying client side code:
    deploy <path>         => uploads files in <path> to the scoped bucket
      --skip              => bypass unchanged files (default)
      --no-skip           => upload all files, including unchanged
      --prune             => remove files that do not exist locally from the server
`
