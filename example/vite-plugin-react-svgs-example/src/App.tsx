import ReactSvg from './assets/react.svg?component';
import RainSvg from './assets/rain.svg?component';
import FaceSvg from './assets/face.svg?component';
import MicrophoneSvg from './assets/disable-microphone.svg?component';
import ScreenIcon from './assets/screen.svg?component';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <RainSvg color="blue" height="5em" width="5em" onClick={()=>console.log(1)}/>
      <ReactSvg width="10em" height="10em" />
      <FaceSvg color='blue' height="5em" width="5em" />
      <MicrophoneSvg height="50px" width="50px" />
      <ScreenIcon color='#28C445' height="50px" width="50px"/>
    </div>
  );
}

export default App;
