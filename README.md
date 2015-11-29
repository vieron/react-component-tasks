**WORK IN PROGRESS**

# react-component-tasks

This component provides a simple interface for authoring and distributing React Components. It takes advantage of some conventions that allow you to build your component with almost zero configuration.

## Features

- Write your code in ES6.
- Bundle your React Component with webpack.
- Spin up a dev server with hot loading using webpack-dev-server.
- Generate a demo site.
- Deploy demo site to Github Pages.

## Conventions

- Component code in `src/` and entry point is `src/index.{js,jsx}`.
- Demo code in `demo/` and entry point is `demo/index.{js,jsx}`.
- Dist is generated in `dist/`.
- Demosite is generated in `gh-pages/`.
- It resolves `.eslintrc` if exists.
- Webpack
	- `.jsx`: babel (presets: `es2015`, `stage-1`, `react`) (plugins: `transform-runtime`)
	- `.js`: babel (presets: `es2015`, `stage-1`, `react`) (plugins: `transform-runtime`)
	- `.icss`: css-modules, postcss (autoprefixer)
	- `.css`: regular css, postcss (autoprefixer)
	- `.scss`: sass, postcss (autoprefixer)
	- `.(jpe?g|png|gif|svg)`: optimized using image-webpack, inlined if size <=8k.

## Usage

1. Install `react-component-tasks` in your project.

	```shell
	$ npm install --save-dev react-component-tasks
	```

2. Create a `webpack.config.js` file in the root of your project. And add the following:

	```javascript
	module.exports = require('react-component-tasks').webpack.getConfig();
	```

3. Add the tasks you need to the `scripts` attribute of your `package.json`.

	```json
	"scripts": {
	    "start": "rct webpack-dev",
	    "dist": "rct webpack-dist",
	    "deploy": "rct webpack-demosite && rct github-deploy"
	}
	```

`rtc` is a shortcut for `react-component-task` cli.


## CLI

### webpack-dev

### webpack-dist

### webpack-demosite

### github-deploy

- `-d, --dist <dist>` base directory for all source files. Default: `'./gh-pages'`.
- `-s, --src <src>` pattern used to select which files should be published.


## Running this project in locally

Clone the project and from the root of the repo run the following commands:

	$ npm install
	$ npm link
	$ cd examples/
	$ npm link react-component-tasks

Then, from `examples/` you can run with `npm run <task>` all the available task in the `scripts` attribute of `examples/package.json`.


## License

Distributed under the MIT license.