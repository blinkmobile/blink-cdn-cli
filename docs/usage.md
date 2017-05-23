# Client Side code deployment

This tool is for deploying client side code for web apps to the Blink Mobile CDN.

## Setting scope

`blinkm client scope <your bucket name>`

`<your bucket name>` is supplied by Blink Mobile


## Scope Information

`blinkm client scope`

Will tell you what your bucket name and region are currently set to.

## Deploying files

The deploy command requires a login to BlinkMobile before use.
For help on the login and logout commands please see: [Identity CLI Usage](https://github.com/blinkmobile/identity-cli#usage)

`blinkm client deploy --env <environment> --cwd <path-to-files>`

When uploading, the specified path will become the root folder in the CDN:

### Example

Running:

```
blinkm client deploy --cwd www
```

on a directory with the following:

```
www/
   + index.html
   + js/
       + app.js
   + img/
       + logo.png
       + cta.jpg
   + css/
       + layout.css
       + bootstrap.css
```

will deploy the following folder structure on the cdn:

```
index.html
js/
  + app.js
img/
  + logo.png
  + cta.jpg
css/
  + layout.css
  + bootstrap.css
```


## Removing files from the cdn

Remove the files from your local folder, then deploy using `--prune`:

`bm client deploy --env <environment> --cwd <path-to-files> --prune`
