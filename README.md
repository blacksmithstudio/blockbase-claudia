# Driver Claudia JS for Blockbase
Compatible with Blockbase Framework

### Version
0.0.1

### How to install ?
```shell
$ npm i --save blockbase-claudia
```

Then add to your `config/{env}.yml` the following (example) instructions depending of your system
```yml
claudia :
    routes :
        # Classic view with no Controller
        - type: view
          src: /
          dest: index
          method: get
          extra: 
            apiKeyRequired: true
        # Controller Related route 
        - type: controller
          src: /api/foo
          dest: foo::bar
          method: get
```

### Usage
The entire usage of the driver is done by the `config/{env}.yml`, we've tried to make it as simple as it need.
It refers to the [Claudia JS API Builder](https://github.com/claudiajs/claudia-api-builder) to push lambda function directly in the cloud from your project.

#### Project Init
We've added in blockbase the possibility to remove the init callback so you can export directly the app (requirement from AWS Lambda).

You `src/app.js` would look like that
```js
const blockbase = require('blockbase')

const app = blockbase({root: __dirname})
let api = app.drivers.claudia.api;

module.exports = api
```

#### Routing
A route can have two type : `controller` or `view`.
As it looks like a controller will be a program call (in a `app.controller.*` controller) and a view will call a view in the folder `/views`.

The following routes are programmed as described below :

* controller
ex : creates a route on `localhost:1340/foo/bar` that will trigger the `app.controllers.foo.bar()` method on the GET method
```yml
      - type: controller
        src: /foo/bar
        dest: /controllers/foo::bar
        method: get
```

* view
ex : creates a route on `localhost:1340/` that will show the `/views/home.twig` template on the GET method
```yml
      - type: view
        src: /
        dest: home
        method: get
```

### Routes[i].extra
You can populate the `route.extra` value with a json (yml formatted) object, corresponding to the last parameter of the `api(path, method, extra)` method.

For example 
```yml
claudia :
    routes :
        - type: controller
          src: /echo
          dest: index
          method: get
          extra: 
            apiKeyRequired: true
```
is equivalent to 
```js
api.get('/echo', function (request) { ... }, { apiKeyRequired: true });
```

#### Deploy
You can easily deploy to Lambda your blockbase project using `claudia create` and `claudia update` commands (in package.json scripts for ex).

Example `claudia create --use-local-dependencies --region eu-west-1 --api-module src/app` 
For advanced usage, please refer to [the official Claudia documentation](https://claudiajs.com/documentation.html).


Issues
-
If you find any issue, feel free to post it in the [repo on Github](https://github.com/blacksmithstudio/blockbase-claudia/issues)

License
----
(Licence [MIT](https://github.com/blacksmithstudio/blockbase-claudia/blob/master/LICENCE))
Coded by [Blacksmith](https://www.blacksmith.studio)


**Free Software, Hell Yeah!**

[Node.js]:https://nodejs.org/en
[NPM]:https://www.npmjs.com
