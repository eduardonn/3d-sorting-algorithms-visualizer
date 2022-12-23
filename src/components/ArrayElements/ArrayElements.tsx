import React, { createRef, useLayoutEffect, useMemo } from 'react';
import { useArrayStore } from '../../hooks/useArrayStore';
import { AnimatedSorter } from '../../utils/';
import { ArrayElement } from '../ArrayElement/ArrayElement';
import { Mesh, Vector3 } from 'three';
import { useAnimationStore } from '../../hooks/useAnimationStore';

type RefArray = Array<React.MutableRefObject<Mesh>>

/**
 * Callback to be passed to AnimatedSorter.
 * 1. Swap mesh position in the 3D world
 * 2. Swap mesh refs position in the array of references to match 3D world
 * @param arrayRefs array of references
 * @param a position of element a
 * @param b position of element b
 */
const swapElements = (arrayRefs: RefArray, a: number, b: number) => {
  [arrayRefs[a].current.position.x, arrayRefs[b].current.position.x] =
    [arrayRefs[b].current.position.x, arrayRefs[a].current.position.x];

  [arrayRefs[a].current, arrayRefs[b].current] =
    [arrayRefs[b].current, arrayRefs[a].current];
}

// const changeArrayLength = (arrayRefs: RefArray, elements: Array<number>) => {
//   arrayRefs.current = Array(elements.length).fill(null).map(
//     (_, i: number) => arrayRefs.current[i] || createRef());
//   }

export const ArrayElements: React.FC<{ gap: number }> = ({ gap }) => {
  const [ elements ] = useArrayStore(
    state => [ state.elements ]
  );

  const [ setStartAnimation ] = useAnimationStore(
    state => [ state.setStartAnimation ]
  );

  const refArray: RefArray = useMemo(() =>
    Array(elements.length).fill(null).map(() => createRef() as React.MutableRefObject<Mesh>),
    [elements],
  );

  const animatedSorter = new AnimatedSorter((a: number, b: number) => {
    swapElements(refArray, a, b)
    return new Promise(res => setTimeout(res, 200));
  });

  const startAnimationCallback = (algorithmOption: keyof AnimatedSorter) => {
    animatedSorter[algorithmOption](elements);
  };

  useLayoutEffect(() => {
    console.log('setting start animation from ArrayElements');
    // setStartAnimation(() => console.log('start animation test'));
    setStartAnimation(startAnimationCallback);

    // return () => removeKeydownEvent(keyRHandler)
  }, //eslint-disable-next-line
  [startAnimationCallback]
  )

  return (
    <> 
      { elements.map((v: number, k: number) => {
        return (
          <ArrayElement
            key={k}
            ref={refArray[k]}
            position={new Vector3(k * (1 + gap), v / 2.0, 0)}
            height={v} />
        )
      }) }
    </>
  );
}