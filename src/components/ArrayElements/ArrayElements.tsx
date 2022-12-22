import React, { createRef, useEffect, useLayoutEffect, useRef } from 'react';
import { useArrayStore } from '../../hooks/useArrayStore.tsx';
import { useKeyboard } from '../../hooks/useKeyboard';
import { AnimatedSorter, createRandomArray } from '../../utils/';
import { ArrayElement } from '../ArrayElement/ArrayElement';
import { Mesh } from 'three';

/**
 * Callback to be passed to AnimatedSorter.
 * 1. Swap mesh position in the 3D world
 * 2. Swap mesh refs position in the array of references to match 3D world
 * @param arrayRefs array of references
 * @param a position of element a
 * @param b position of element b
 */
const swapElements = (arrayRefs: RefArray, a: number, b: number) => {
  let elementA = arrayRefs.current[a].current;
  let elementB = arrayRefs.current[b].current;
  let elementAPositionX = elementA.position.x;
  elementA.position.x = elementB.position.x;
  elementB.position.x = elementAPositionX;

  [arrayRefs.current[a].current, arrayRefs.current[b].current] =
    [arrayRefs.current[b].current, arrayRefs.current[a].current];
}

const changeArrayLength = (arrayRefs: RefArray, elements: Array<number>) => {
  arrayRefs.current = Array(elements.length).fill(null).map(
    (_, i: number) => arrayRefs.current[i] || createRef());
  }

type RefArray = React.MutableRefObject<
  Array<React.MutableRefObject<Mesh>>
>

export const ArrayElements: React.FC<{ gap: number }> = ({ gap }) => {
  const [ elements, setArrayElements, arraySettings ] = useArrayStore(
    state => [ state.elements, state.setArrayElements, state.arraySettings, state.setArraySettings ]
  );

  const { addKeydownEvent } = useKeyboard();
  const arrayRefs: RefArray = useRef(Array(elements.length).fill(null).map(() => createRef()));
  const animatedSorter = new AnimatedSorter((a: number, b: number) => swapElements(arrayRefs, a, b));

  useEffect(() => {
    console.log('useEffect by elements');
    addKeydownEvent('KeyX', () => {
      animatedSorter.insertion(elements);
      // swapElements(arrayRefs, 1, 3);
    });
  }, [elements])

  useEffect(() => {
    console.log('useEffect in ArrayElements');
    setArrayElements(createRandomArray(
      arraySettings.minElement,
      arraySettings.maxElement,
      arraySettings.amountElements
    ));

    // return () => removeKeydownEvent(keyRHandler);
  }, [arraySettings, setArrayElements]);

  useEffect(() => {
    addKeydownEvent('KeyR', () => {
      console.log('arrayElements: ', arrayRefs);
      arrayRefs.current[4].current.position.set(0, 0, 5);
    });
  }, [arrayRefs])

  // useLayoutEffect(() => {
  //   arrayElementsRefs.current = Array(elements.length).fill(null).map(
  //     (_, i) => arrayElementsRefs.current[i] || createRef());
  // }, [elements])

  if (arrayRefs.current !== null && (elements.length !== arrayRefs.current.length)) {
    changeArrayLength(arrayRefs, elements);
  }

  console.log();

  return (
    elements.map((v: number, k: number) => {
      return (
        <ArrayElement
          key={k}
          ref={arrayRefs.current[k]}
          position={[k * (1 + gap) , v / 2, 0]}
          height={v} />
      )
    })
  );
}