# ✨ Sass Configuration 
To leverage a css preprocessor we have to include additonal dependencies and add them to our configuration.

## Sass Dependencies

- [sass-loader](https://www.npmjs.com/package/sass-loader) loads a Sass/SCSS file and compiles it to CSS.
- [sass](https://www.npmjs.com/package/sass) css preprocessor. 

```bash 
yarn add sass-loader sass --dev  
```

## Sass Webpack Configuration
Now that we have our dependencies installed we can tell webpack to leverge them for sass files. 

Inside webpack.config.js:
```js 
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.jsx",
  output: {
    path: path.join(__dirname, 'public'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      /*
      Our original css test 
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
      */
     // new css test to include sass 
     {
       // looks for sass OR css files on import
      test: /\.s[ac]ss$/i,
      use: [
        // Creates `style` nodes from JS strings
        "style-loader",
        // Translates CSS into CommonJS
        "css-loader",
        // Compiles Sass to CSS
        "sass-loader",
      ],
    },
    ]
  },
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
  }
}
```

With this addition to our configuration we can now import sass files just like js files! 

Inside index.jsx: 
```js 
import React from "react";
import { createRoot } from "react-dom/client"; 
const root = createRoot(document.getElementById("root"));

// here is out import for our styles
import "./index.scss";

const App = () => {
  return <h1>Hello World</h1>
}

root.render(<App />); 
```