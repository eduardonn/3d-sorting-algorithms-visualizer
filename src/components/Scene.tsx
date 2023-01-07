import React from 'react';
import { Physics } from '@react-three/cannon';
import { Sky } from '@react-three/drei';
import { Ground, CameraController, ArrayElements } from './';
import { Lights } from './Lights';

export const Scene = () => {
  return (
    <>
      <Sky sunPosition={[100, 100, 20]} />
      <ambientLight intensity={.7} />
      <directionalLight position={[10, 10, 10]} />
      {/* <Lights gap={0.3} /> */}
      <ArrayElements gap={0.3} />
      <CameraController cameraType='orbit'/>
      <Physics>
        <Ground />
        {/* <Player /> */}
      </Physics>
    </>
  );
}