import React from "react";
import reactDOM from "react-dom";
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

reactDOM.render(<App />, document.getElementById("root"));
