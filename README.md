**WORK IN PROGRESS**

# react-component-tasks

This component provides a simple cli interface for authoring and distributing React Components. It takes advantage of some conventions that allow you to build your component with almost zero configuration.

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

	Usage: `rct <task-name> [opts] [-- suboptions]`

	```json
	"scripts": {
	    "start": "rct webpack-dev",
	    "dist": "rct webpack-dist",
	    "deploy": "rct webpack-demosite && rct github-deploy"
	}
	```

`rtc` is a shortcut for `react-component-task` cli.


### Configuration

There are two kinds of configurations in **react-component-tasks**:

- **Project configuration**

	General configuration for the whole project, mainly paths, and names. (Defaults)[./src/config/defaults.js] can be overriden adding the proper params after the task name.

		$ rct webpack-dev --path.src '~/src' --path.dist '~/dist'

- **Task configuration**

	Each task might also have its own configuration. Tasks can define a set of defaults based on the current Project configuration. See [here](./src/tasks/eslint.js)

	This defaults can also be overriden just passing the proper params after `--`.

		$ rct webpack-dev --path.src '~/src' -- --bail


## Available Tasks

### webpack-dev

### webpack-dist

### webpack-demosite

### github-deploy

- `-d, --dist <dist>` base directory for all source files. Default: `'./gh-pages'`.
- `-s, --src <src>` pattern used to select which files should be published.


## Running the project locally

Clone the project and from the root of the repo run the following commands:

	$ npm install
	$ npm link
	$ cd examples/
	$ npm install
	$ npm link react-component-tasks

Then, from `examples/` you can run with `npm run <task>` all the available task in the `scripts` attribute of `examples/package.json`.

### Debugging

With [iron-node](http://s-a.github.io/iron-node/)

	$ iron-node ./node_modules/react-component-tasks/src/cli.js babel-es5

With [node-inspector](https://github.com/node-inspector/node-inspector)

	$ node-debug ./node_modules/react-component-tasks/src/cli.js babel-es5

Remember to replace `babel-es5` in the previous commands with the task you want to debug.


## License

Distributed under the MIT license.

## TO-DO

- add remaining tasks:
	- lint
	- es5
	- test
	- documentation
	- tdd
	- link (something to automate linking projects for local development)
- allow any webpack config to be overrided
- default styling for demo page
- update documentation
	- optional .eslintrc
	- babel attr in package.json
	- .gitignore
