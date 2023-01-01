import React, { createRef, useEffect, useLayoutEffect, useMemo, useCallback } from 'react';
import { useArrayStore } from '../../hooks/useArrayStore';
import { ArrayElement } from '../ArrayElement/ArrayElement';
import { Mesh, MeshStandardMaterial, RepeatWrapping, sRGBEncoding } from 'three';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useAnimateArrayElements } from '../../hooks/useAnimateArrayElements';
import { WWIIShipHull_OldTexture, WWIIShipHull_OldNormalTexture } from '../../images/textures'

export type RefArray = Array<React.MutableRefObject<Mesh>>

// TODO: Make array scale dynamically
// const changeArrayLength = (arrayRefs: RefArray, elements: Array<number>) => {
//   arrayRefs.current = 
//   }

export const ArrayElements: React.FC<{ gap: number }> = ({ gap }) => {
  const [ elements ] = useArrayStore(state => [ state.elements ]);
  const { addKeydownEvent } = useKeyboard();
  // const sorter = useAnimatedSortings();
  
  const refArray: RefArray = useMemo(() =>{
    console.log('elements changed');
    return Array(elements.length).fill(null).map(() => createRef() as React.MutableRefObject<Mesh>);
  },
  [elements],
  );

  useAnimateArrayElements(refArray, elements);

  useEffect(() => {
    elements.forEach((v, i) => {
      refArray[i].current.position.set(i * (1 + gap), v / 2.0, 0);
      refArray[i].current.scale.set(1, v, 1);

      const texture = WWIIShipHull_OldTexture.clone();
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(.333, .333 * v);
      texture.encoding = sRGBEncoding;

      const material = new MeshStandardMaterial();
      material.map = texture;
      refArray[i].current.material = material;
      // refArray[i].current.texture.wrapT = RepeatWrapping;
      // refArray[i].current.texture.repeat.set(.5, .5 * v);    
    })
    // position={new Vector3(k * (1 + gap), v / 2.0, 0)}
    // height={v}
  }, [elements]);

  console.log('ArrayElements called');

  return (
    <>
      { elements.map((v, k: number) => 
        <ArrayElement key={k} ref={refArray[k]} />
      ) }
    </>
  )
}