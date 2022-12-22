import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { Sky } from '@react-three/drei';
import { Ground, CameraController, ArrayElements, UI } from './components/';
import './App.css';
import { Vector3 } from 'three';

function App() {
  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <CameraController cameraType='orbit' target={new Vector3(4, 5, 0)}/>
        <Physics>
          <Ground />
          {/* <Player /> */}
        </Physics>
        <ArrayElements gap={0.3} />
      </Canvas>
      {/* <div className='absolute centered cursor'>+</div> */}
      <div id='gui'>
        <UI />
      </div>
    </>
  );
}

export default App;