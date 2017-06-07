# blinkmobile / client-cli

# Client Side Code Deployment

This tool is for deploying client side code for web apps to the Blink Mobile CDN.

## Setting Scope

```sh
blinkm client scope <your bucket name>
```

`<your bucket name>` is supplied by Blink Mobile

## Scope Information

```sh
blinkm client scope
```

Will tell you what your bucket name and region are currently set to.

## Deploying files

The deploy command requires a login to BlinkMobile before use.
For help on the login and logout commands please see: [Identity CLI Usage](https://github.com/blinkmobile/identity-cli#usage)

```sh
blinkm client deploy <path-to-files> --env <environment> --cwd <path-to-project>`
```

When uploading, the specified path will become the root folder in the CDN:

### Example

Running:

```
blinkm client deploy www
```

on a directory with the following:

```
|-- .blinkmrc.json
|-- www
|   |-- index.html
|   |-- js
|   |   |-- app.js
|   |-- img
|   |   |-- logo.png
|   |   |-- cta.jpg
|   |-- css
|   |   |-- layout.css
|   |   |-- bootstrap.css
```

will deploy the following folder structure on the CDN:

```
|-- index.html
|-- js
|   |-- app.js
|-- img
|   |-- logo.png
|   |-- cta.jpg
|-- css
|   |-- layout.css
|   |-- bootstrap.css
```


## Removing files from the cdn

Remove the files from your local folder, then deploy using `--prune`:

```sh
bm client deploy <path-to-files> --env <environment> --cwd <path-to-project> --prune
```
