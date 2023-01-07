import React, { useEffect, useRef } from 'react';
import { Sky, useHelper } from '@react-three/drei';
import * as THREE from 'three';
import { useControls } from 'leva';
import { Euler, Object3D } from 'three';
import { useArrayStore } from '../hooks/useArrayStore';

export const Lights: React.FC<{ gap: number }> = ({ gap }) => {
  const { spotIntensity, spotAngle, penumbra, decay } = useControls(
    { spotIntensity: .5,
      spotAngle: 1., penumbra: 1.,
      decay: 0., });
  
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);
  useHelper(directionalLightRef, THREE.DirectionalLightHelper);
  const spotLightRef = useRef<THREE.SpotLight>(null!);
  useHelper(spotLightRef, THREE.SpotLightHelper);

  const [ { numElements, maxElement } ] = useArrayStore(state => [ state.arraySettings ]);
  const spotTargets = useRef<Array<Object3D>>([]);
  const lightArray = useRef<Array<JSX.Element>>([])

  useEffect(() => {
    lightArray.current.length = 0;
    spotTargets.current.length = 0;

    // Every 10 elements, put a light source
    for (let i = 0, xPos = -(numElements * (1 + gap)) / 2;
        xPos < numElements / 2; xPos += 10 * (1 + gap),
        ++i) {
      const targetObj = new Object3D();
      targetObj.position.set(xPos, maxElement / 2, 0);
      console.log('length: ', spotTargets.current.push(targetObj));
      // spotTargets.current[index - 1].position.set(xPos, maxElement / 2, 0);

      lightArray.current.push(
        <spotLight
          intensity={spotIntensity}
          angle={spotAngle} position={[xPos, maxElement, 8 + maxElement * 0.4]} penumbra={penumbra}
          decay={decay} target={spotTargets.current[i]}
        />
      );
      console.log('i', i);
    }
    // console.log(spotTargets)
    // console.log(lightArray)
  }, [numElements, spotIntensity, spotAngle, maxElement, decay, penumbra]);

  return (
    <>
    { lightArray.current }
    </>
  )
}
