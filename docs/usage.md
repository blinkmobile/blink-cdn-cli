# blinkmobile / client-cli

# Client Side Code Deployment

This tool is for deploying client side code for web apps to the OneBlink Web App / CDN Hosting service.

## Setting Scope

Before you deploy, you will need to set the scope for your project. The scope will specify where your project will be deployed to.

```sh
bm client scope <your web/cdn hosting url>
```

`<your web/cdn hosting url>` is provided to you after you create the new Web App/CDN Hosting instance within the OneBlink Console.

## Scope Information

```sh
bm client scope
```

Running the _scope_ command without specifying a URL will return the current scope.

## Deploying files

### Authentication
Before you're able to deploy to your web app/CDN hosting instance, you will need to be authenticated. This is done by logging in with the OneBlink Identity CLI.

```sh
bm identity login
```

If you haven't installed or used the Identity CLI before, please see: [Identity CLI Usage](https://github.com/blinkmobile/identity-cli#usage)

### Basic Deployment
To deploy your code or assets, run the _deploy_ command:
```sh
bm client deploy
```
This will upload the files in your current directory to a "dev" environment for your Web App/CDN Hosting.

You can change the default behaviour by using additional options:

### Additional Options

#### --env
This option allows you to specify an environment. If the environment doens't yet exist, it will be created when you first deploy to it.

```sh
bm client deploy --env test
```
The above code will deploy to your "test" environment, and will be specified as part of the subdomain for your deployment.

For example:
```
https://myorg-mywebapp-test.oneblink.io
```

When you're ready to deploy to production, use the environment _prod_
```
bm client deploy --env prod
```
This will deploy to your production environment and give you a URL that does not contain an environment tag.

For example:
```
https://myorg-mywebapp.oneblink.io
```

#### --cwd
This option allows you to set your current working directory for deployment purposes.

For example, within your local directory you may have project code, however you only want to deploy the final build from your "www" folder. This can be done by specifying the cwd:
```
bm client deploy --cwd ./www
```
By default, your current directory will be used.

#### --force
This will deploy your project without asking for confirmation. This feature is designed to allow automatic deployments for those interested in an automated release.
```
bm client deploy --force
```

#### --skip
The "skip" option will bypass unchanged files (default) on your local machine.
```
bm client deploy --skip
```

#### --no-skip
The "no-skip" option will upload all files, including unchanged files on your local machine.
```
bm client deploy --no-skip
```

#### --prune
The "prune" option will remove any files from your hosting that don't exist on your local machine.
```
bm client deploy --prune
```

#### --debug
The "debug" option will display extra debugging information. This is useful if you are having issues deploying your web app.
```
bm client deploy --debug
```



