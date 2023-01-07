import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';
import { UI } from './components';
import './App.css';

function App() {
  return (
    <>
      <Canvas>
        <Scene />
      </Canvas>
      {/* <div className='absolute centered cursor'>+</div> */}
      <div id='gui'>
        <UI />
      </div>
    </>
  );
}

export default App;