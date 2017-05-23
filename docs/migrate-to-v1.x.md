# Migrating to `v1.x.x` from `v0.x.x`

Version `1.x.x` contained a number of breaking changes will need to be handled before using the Client CLI to deploy client side code again.

## Authentication

### `v0.x.x`

Authentication for project was previously handled using Access and Secret key pairs and [Profile Management](https://github.com/blinkmobile/bm-profile/blob/master/README.md).

### `v1.x.x`

Authentication will now be handled using the [Identity CLI](https://github.com/blinkmobile/identity-cli/blob/master/README.md).

**NOTE: The key pairs that have previously been handed out from BlinkMobile staff members will be deactivated shortly. Once this is done `v0.x.x` will be effectively become useless.**

## Deploying to Environments

### `v0.x.x`

Scope for a project was previously the fully qualified domain name for the project including the environment. E.g.

```
bm client scope projectname-dev.blinkm.io
bm client deploy
```

### `v1.x.x`

Scope will now be set to the production equivalent of the project's fully qualified domain name and environments can be deployed to using an `--env` flag (defaults to `dev`).

```
bm client scope projectname.blinkm.io
bm client deploy --env dev
```
