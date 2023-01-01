import React, { useEffect, useCallback, useMemo } from 'react';
import { Mesh, Vector3 } from 'three';
import { RefArray } from '../components/ArrayElements/ArrayElements';
import { useAnimationStore } from './useAnimationStore';
import { useAnimation } from './useAnimation';
import { AnimatedSorter } from '../utils/';

export const useAnimateArrayElements = (refArray: RefArray, elements: Array<number>) => {
  const [ animDuration, setStartAnimation ] = useAnimationStore(
    state => [ state.animDuration, state.setStartAnimation ]);
  const { addAnimation } = useAnimation();

  const moveElement = useCallback(
      (meshA: Mesh, meshB: Mesh, duration: number, zOffset: number) => {
    let initialPos = meshA.position.clone();
    let finalPos = meshB.position.clone();
    finalPos.y = initialPos.y;

    addAnimation(meshA, [
      {position: initialPos, progress: 0},
      {position: initialPos.clone().add(new Vector3(0, 0, zOffset)), progress: 0.2},
      {position: finalPos.clone().add(new Vector3(0, 0, zOffset)), progress: 0.8},
      {position: finalPos, progress: 1},
    ],
    duration,);
  }, [addAnimation]);

  const swapElements = useCallback(
      (arrayRefs: RefArray, a: number, b: number, duration: number) => {
    moveElement(arrayRefs[a].current, arrayRefs[b].current, duration, 1.2);
    moveElement(arrayRefs[b].current, arrayRefs[a].current, duration, 2.4);

    [arrayRefs[a].current, arrayRefs[b].current] =
      [arrayRefs[b].current, arrayRefs[a].current];
      
    return new Promise(res => setTimeout(res, duration + 100));
  }, []);

  const swapCallback = useCallback((a: number, b: number) =>
    swapElements(refArray, a, b, animDuration),
    [animDuration, refArray]);

  const animatedSorter = useMemo(
    () => new AnimatedSorter(swapCallback),
    []
  );

  useEffect(() => {
    animatedSorter.swapCallback = swapCallback;
  }, [swapCallback])

  useEffect(() => {
    const startAnimationCallback = (algorithmOption: string) => {
      animatedSorter[algorithmOption as keyof AnimatedSorter](elements);
    };

    // const startAnimationCallback = (algorithmOption: string) => {
    //   // const sorts = Object.create(animatedSortings);
    //   sorter[algorithmOption as keyof (typeof sorter)](elements, (a, b, animDuration) => {
    //     swapElements(refArray, a, b, animDuration);
    //     return new Promise(res => setTimeout(res, animDuration + 100));
    //   });
    // };

    setStartAnimation(startAnimationCallback);
    },
    [elements, refArray]
  );

  return { swapElements };
}