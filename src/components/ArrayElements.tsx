import React, { createRef, useEffect, useMemo } from 'react';
import { useArrayStore } from '../hooks/useArrayStore';
import { ArrayElement } from './ArrayElement';
import { Mesh, MeshStandardMaterial, RepeatWrapping, sRGBEncoding, UVMapping } from 'three';
// import { useKeyboard } from '../../hooks/useKeyboard';
import { useAnimateArrayElements } from '../hooks/useAnimateArrayElements';
import { WWIIShipHull_OldTexture } from '../images/textures';

export type RefArray = Array<React.MutableRefObject<Mesh>>;

export const ArrayElements: React.FC<{ gap: number }> = ({ gap }) => {
  const [ elements, { numElements, maxElement } ] = useArrayStore(
    state => [ state.elements, state.arraySettings ]);
  
  const refArray: RefArray = useMemo(() =>{
    // TODO: Make array scale dynamically
    return Array(elements.length).fill(null).map(() => createRef() as React.MutableRefObject<Mesh>);
  }, [elements]);

  useEffect(() => {
    elements.forEach((v, i) => {
      refArray[i].current.position.set(
        (i - numElements / 2) * (1 + gap),
        v / 2,
        0
      );
      refArray[i].current.scale.set(1, v, 1);

      const texture = WWIIShipHull_OldTexture.clone();
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(.333, .333 * v);
      texture.encoding = sRGBEncoding;

      const material = new MeshStandardMaterial();
      material.map = texture;
      refArray[i].current.material = material;
    });
    
    // TODO: Calculate camera position from numElements
    // console.log(camera);
    // const radius = numElements * (1 + gap) / 2;
    // const distance = -radius / Math.tan(75 * 180 / Math.PI);
    // console.log('distance: ', distance);
  }, [elements]);

  useAnimateArrayElements(refArray, elements);

  console.log('ArrayElements called');

  return (
    <>
      { elements.map((_, k: number) => <ArrayElement key={k} ref={refArray[k]} />) }
    </>
  )
}