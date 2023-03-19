import ReactSvg from './assets/react.svg?component';
import RainSvg from './assets/rain.svg?component';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <RainSvg color="blue" height="5em" width="5em" />
      <ReactSvg width={"10em"} height="10em" />
      <RainSvg color="#f0f0f0" height="5em" width="5em" />
    </div>
  );
}

export default App;
