# Client Side code deployment

This tool is for deploying client side code for web apps to the Blink Mobile CDN.

See [usage.md](https://github.com/blinkmobile/client-cli/blob/develop/docs/usage.md) for detailed usage instructions.

## Installation
```
npm install -g @blinkmobile/cli @blinkmobile/client-cli
```

## Scope

`bm client scope` => To see what the current scope is set to
`bm client scope --bucket <your bucket name>` => To set the scope to the provided bucket name

## Deploying
`bm client deploy <path to files>` => Upload the files in `<path to files>` to the specified scope
