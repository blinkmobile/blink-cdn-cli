module.exports = `
  Usage: bm client <command>

  Where command is one of:

  scope, deploy

Initial settings:
    scope              => outputs the current scope
    scope --bucket <s3 bucket name> [--region <s3 region>] => sets the bucket and optionally the region

Deploying client side code:
    deploy <path>      => uploads any modified files in <path> to the bucket set via the scope command
`;
