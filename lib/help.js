module.exports = `
  Usage: bm client <command>

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
      --skip              => bypass unchanged files (default)
      --no-skip           => upload all files, including unchanged
      --prune             => remove files that do not exist locally from the server
      --cwd <path>        => uploads files in the <path> to the scoped bucket
      --debug             => output debug information
`
