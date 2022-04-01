# ✨ Image Assets Configuration
By default webpack will not allow the module import of image assets. To allow this we will include a new rule to permit this. 

Inside webpack.config.js:
```js
 module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      // our new rule to allow the import of image assets 
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
```

With that set we can now import images into our files. 

Inside index.jsx: 
```js 
import React from "react";
import { createRoot } from "react-dom/client"; 
const root = createRoot(document.getElementById("root")); 

import "./index.scss";

import hello from "./images/helloworld.gif";

const App = () => {
  return (
    <div className='app'>
      <h1>Hello World</h1>
      <img src={hello} alt='hello world animated' />
    </div>
  );
};

root.render(<App />); 
```
