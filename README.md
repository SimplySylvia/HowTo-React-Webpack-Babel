# HOW TO: React Setup with Webpack and Babel 
In this breakdown we will be going over how to setup a react development enviroment from scratch. This enviroment will include Webpack and Babel for easy development that will include hot reloading. 

>NOTE: This repo contains the finialized code for this setup. 

## Roadmap 
1. Create source 📁  directories and 📝 files.
2. Install and setup 🧶 Yarn. 
3. Install ⚙️ application dependencies.
4. Set up 📦 Webpack Configuration for bundeling. 
5. Set up 🪄 Babel Configuration. 
6. Set up Webpack Development Server for 🔥 hot reloading.

## Create source 📁  directories and 📝 files.
For our application we will create some starting directories and files. 

Inside of your project directory:
```bash
mkdir src public && touch src/index.js public/index.html
```

> NOTE: `src` will be the directory where we will hold all of our development code.`public` will be where our html and bundled js will go.

#### Current Directory
```
App Directory
├── public
│  └── index.html
└── src
   └── index.js
```

We will need other files, but we will add them as we go. This would be a good time to create your .gitignore and set the default node ignores. 

Let's setup our base html file.

Inside our index.html: 
```html 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React App</title>
</head>
<body>
  <!-- This element is where our react application will be mounted -->
  <div id="root"></div>
  <!-- This script will be created with webpack-->
  <script src="./bundle.js"></script>
</body>
</html>
```

> For now we will not do anything to the src/index.js. We will once we install the required dependencies for our application. 

## Install and setup 🧶 Yarn. 
To manage our dependencies we will be using a package manager called 🧶 Yarn. You can learn more about it [here](https://yarnpkg.com/). 

### Yarn Installation 
```bash 
npm i -g yarn
```

You can verify your install using `yarn --version` and you should get back a response similiar to `1.22.17`. 

### Yarn Commands 

| Command  | Description  |
|----------|--------------|
| yarn init  | Initializes the development of a package/application. |
| yarn add  |  Adds a package to use in your current application. |
| yarn add global | Adds a package to globally available directory.  |
| yarn add --dev | Adds a package to your current application under the development dependencies. |
| yarn install | Installs all the dependencies defined in a package.json file. |
| yarn remove | Removes an unused package from your current package. |
| yarn [scriptname] | Runs a script defined in the package.json |

For detailed information on the commands you can check the [docs](https://classic.yarnpkg.com/en/docs/cli/).

### Yarn customization 
Want to turn on emojis in yarn for a more fun output? 
```bash 
yarn config set -- --emoji true
```
There are a bunch of configurations available for yarn so check out the docs for options! 

## Install ⚙️ application dependencies.
Our next step is to install all the dependencies that our application and development enviroment will need.

Before we can install anything we will need to initilize the directory as an node enviroment. 

```bash 
yarn init -y
```
This command will generate a package.json with default fields. If you wish to fill out all the fields manually you can run `yarn init`.

Our application is now ready for our dependencies. 

### React Dependancies 
- [React](https://www.npmjs.com/package/react) for ui component library.  
- [ReactDOM](https://www.npmjs.com/package/react-dom) for connecting the ui component library to the dom. 

```bash 
yarn add react react-dom
```
### Webpack Dependancies 

- [webpack](https://www.npmjs.com/package/webpack) for bundling our code.
- [webpack-cli](https://www.npmjs.com/package/webpack-cli) for terminal commands around bundling our code.
- [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server) for hot reloading functionality.

```bash 
yarn add webpack webpack-cli webpack-dev-server --dev
```
>NOTE: notice the `--dev` in the above command. We are installing these are development dependencies since these are only for development purposes and will not be included in our final production version. 

### Babel Dependancies 

- [@babel/core](https://babeljs.io/docs/en/babel-core) for translations between js versions.
- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) for latest support of js versions along with polyfils for browser support.
- [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react) for react support that includes jsx. 

```bash 
yarn add @babel/core @babel/preset-env @babel/preset-react --dev
```

### Loader Dependancies 
For hot loading with webpack-dev-server we will need to add the loaders we want to run. These are a few of the option that are available and the base options to start with. 

- [babel-loader](https://www.npmjs.com/package/babel-loader) to connect babel and webpack together. 
- [css-loader](https://www.npmjs.com/package/css-loader) to add support for css imports. 
- [style-loader](https://www.npmjs.com/package/style-loader) to add css injections to the dom.

```bash 
yarn add babel-loader css-loader style-loader --dev
```

### Final Dependencies 
Our final package.json should look something like this: 

```json
"devDependencies": {
    "@babel/core": "^7.17.5",
    "@babel/preset-env": "^7.16.11",
    "@babel/preset-react": "^7.16.7",
    "babel-loader": "^8.2.3",
    "css-loader": "^6.7.1",
    "style-loader": "^3.3.1",
    "webpack": "^5.70.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.7.4"
  },
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }
```

> NOTE: Your version numbers might look different since packages update over time.

#### Current Directory
```
App Directory
├── package.json
├── public
│  └── index.html
├── src
│  └── index.js
└── yarn.lock
```

## Set up 📦 Webpack Configuration for bundeling. 
Now it is time to setup our webpack configuration so our code can be bundled. 

To configure webpack we will need to create a `webpack.config.js`: 

```bash
touch webpack.config.js
```

#### Current Directory
```
App Directory
├── package.json
├── public
│  └── index.html
├── src
│  └── index.js
├── webpack.config.js
└── yarn.lock
```


Let's setup the default settings for our webpack configuration inside the file we just created. 

Inside webpack.config.js:
```js 
// For node to know our absolute file path we will be using the internal module path
const path = require("path");

// Our export here is the configuration webpack will use 
module.exports = {
  // [mode] will determine how our code will be bundled. 
  // "development" will be human readable 
  // "production" will be minified
  mode: "development",
  // [entry] this is the file where the bundling starts from. 
  entry: "./src/index.js",
  // [output] is a configuration object to determine how and where to bundle our code
  output: {
    // [path] is where to output
    path: path.join(__dirname, 'public'),
    // [filename] is the name of the file 
    filename: "bundle.js"
  }
}
```

With this setup in place we will be able to start using the webpack terminal command to bundle out code. At the moment our index.js is empty so let's change that. 

Inside src/index.js: 
```js
// Bring React in to build a component. 
import React from "react";
// Bring reactDOM in to mount component to the dom.
import reactDOM from "react-dom";

// Here is out base App component. 
// Notice we are NOT using jsx here. This is because we have not set up babel yet.
const App = React.createElement("h1",null,"Hello World");

// Render our app to the dom mounted to the element with id of root inside our public/index.html file.
reactDOM.render(App, document.getElementById("root"));
```
> NOTE: We will be adding additional configuration to webpack as we go.

To run our babel configuration let's make our life easy by adding a few scripts to our `package.json`. 

- `start` will tell webpack to bundle our code development. 
- `build` will tell webpack to bundle our code for production.

Inside package.json: 
```json 
{
  // ... all other fields 
  "scripts": {
    "start": "webpack --mode=development",
    "build": "webpack --mode=production"
  }
}
```

To run these commands all you need to do is run `yarn [command]` replacing `[command]` with the script name you want to run. 

```bash
yarn start
```

You should see an output from webpack bundling our code into the output file we specified in the `webpack.config.js` file we made earlier. 

#### Current Directory
```
App Directory
├── package.json
├── public
│  ├── bundle.js
│  └── index.html
├── src
│  └── index.js
├── webpack.config.js
└── yarn.lock
```
Now open your html file in the browser of your choice and we should see our `Hello World` message!
 

> Want to learn more about webpack? Check out the [docs](https://webpack.js.org/). 

## Set up 🪄 Babel Configuration. 
Now that webpack is set up we can configure babel to allow us to use more js features like jsx. 

To get started we need to create a .babelrc which is our config file.

```bash 
touch .babelrc
```

#### Current Directory
```
App Directory
├── package.json
├── public
│  ├── bundle.js
│  └── index.html
├── src
│  └── index.js
├── .babelrc
├── webpack.config.js
└── yarn.lock
```


Inside .babelrc:
```js
{
  // [presets] allow us to define the additional packages we would like to include. 
  // This will give us access to jsx and several other newer js features.  
  "presets": ["@babel/preset-env","@babel/preset-react"]
}
```

Now we are not quite ready to start using babel yet. We will need to configure webpack further to include it. 

Inside webpack.config.js:
```js 
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, 'public'),
    filename: "bundle.js"
  },
  // [module] will allow us to set any external modules we have added to webpack
  module: {
    // [rules] will determine the rules around those external modules
    rules: [
      // First rule is to idenify js and jsx files and turn on babel
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      // Second rule is to check for css files and load them with the following loaders
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  },
}
```

Now we can use all the cool js features like jsx! Time to update our application.

Inside src/index.js: 
```js 
import React from "react";
import reactDOM from "react-dom";

// Huzzah for jsx!
const App = () => {
  return <h1>Hello World</h1>
}

reactDOM.render(<App />, document.getElementById("root"));
```

Go ahead and run your `start` script and check it out! 

> Want to learn more about Babel? Check out the [docs](https://babeljs.io/).

## Set up Webpack Development Server for 🔥 hot reloading.
Now its time to speed up our development process with hot reloading.

To do this we will be using the webpack-dev-server that we installed. The configuration for the server will live in the webpack configuration file. 

Inside webpack.config.js:
```js 
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, 'public'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  },
  // [devtool] this is an additional source map that will let the browser know what files are running our code.
  // Helps with error tracing. Without it we will not know where our errors are coming from because it will state that everything inside the bundle file.
  devtool: "eval-cheap-module-source-map",
  // [devServer] configuration for the live server including port
  devServer: {
    // [static] config for how what to serve
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    // [port] what port on our local machine to run the dev server
    port: 3000,
  }
}
```

Now that we that we have our development server configured let's add a script to make it easy to run. 

Inside package.json:
```json 
// ... 
 "scripts": {
    "start": "webpack --mode=development",
    "build": "webpack --mode=production",
    // our new script to start up our development server
    "dev": "webpack-dev-server"
  },
```

Now all we have to do to spin up our server is to run: 
```bash 
yarn dev
```
To view your server head on over to `localhost:3000` in your browser.

And just like that we are off to the races! Enjoy and..
### Happy Hacking! 💻
