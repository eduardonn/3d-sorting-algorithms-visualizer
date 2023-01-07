import React, { useEffect } from 'react';
import { PointerLockControls, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useArrayStore } from '../hooks/useArrayStore';

// TODO: Fix mouse glitching when moving sometimes
export const CameraController = ({ cameraType }: { cameraType: string } ) => {
  const { camera, gl } = useThree();
  const [ { maxElement } ] = useArrayStore(state => [ state.arraySettings ]);

  useEffect(() => {
    camera.position.set(
      0,
      maxElement * 0.7,
      // distance,
      8 + maxElement * 0.6
    );
  }, []);

  if (cameraType === 'orbit') {
    // const fov = 2 * Math.atan(numElements);
    // console.log('calculated fov: ', fov);
    // @ts-ignore
    // console.log('camera: ', camera);

    return (
      <OrbitControls
        target={new Vector3(0, maxElement / 2, 0)}
        zoomSpeed={5}
        // position={new Vector3(0, 50, 0)}
        args={[camera, gl.domElement]} />
      )
  } else
    if (cameraType === 'first-person')
      return (<PointerLockControls args={[camera, gl.domElement]} />);
    else return null;
}