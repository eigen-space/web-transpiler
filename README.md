# About 

Transpiler service just transform your typescript code in javascript and nothing more.

# Start

```
$ git clone https://github.com/eigen-space/web-transpiler.git
$ cd web-transpiler
$ npm install
$ npm start --httpPort=3031
```

# API

`GET /` to check status service.

`POST /make` to transform code. 
- Content-Type: application/json
- Input interface:

    | Parameter | Type | Required | Description |
    | ------ | ------ | ------ | ------ |
    | source | string | true | typescript code for transpile |
    | options | ts.CompilerOptions | false | transpile options |

    By default, `options = { module: ts.ModuleKind.ES2015, jsx: 'react' }`
- Output interface:

    The interface is similar to ts.TranspileOutput

    | Parameter | Type | Required | Description |
    | ------ | ------ | ------ | ------ |
    | outputText | string | true | transpiled js code |
    | diagnostics | ts.Diagnostic[] | false |  |
    | sourceMapText | string | false |  |

# Why do we have that dependencies?

* `@eigenspace/argument-parser` - parsing script arguments.
* `@eigenspace/helper-scripts` - common scripts for dev. environment.
* `express` - web framework for node.
* `typescript` - used for transpile code.

# Why do we have that dev dependencies?

* `@eigenspace/codestyle` - includes tslint rules, config for typescript.
* `husky` - used for configure git hooks.