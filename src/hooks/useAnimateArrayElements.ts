import { useEffect, useCallback, useMemo } from 'react';
import { Mesh, Vector3 } from 'three';
import { RefArray } from '../components/ArrayElements';
import { useAnimationStore } from './useAnimationStore';
import { useAnimation } from './useAnimation';
import {
  AnimatedSorter,
  SwapCallback,
  SetColorCallback,
  ResetColorCallback } from '../utils/animatedSortings';
import { useArrayStore } from './useArrayStore';

const DEFAULT_DURATION_MS = 1000.0;

export const useAnimateArrayElements = (refArray: RefArray, elements: Array<number>) => {
  const [ animSpeed, setHandleSortButton, setHandleRandomizeButton ] = useAnimationStore(
    state => [ state.animSpeed, state.setHandleSortButton, state.setHandleRandomizeButton ]);
  const [ randomizeArrayElements ] = useArrayStore(state => [ state.randomizeArrayElements ]);
  const { animate, cancelAllAnimations } = useAnimation();

  const moveElement = useCallback(
      (meshA: Mesh, meshB: Mesh, durationMs: number, zOffset: number) => {
    let initialPos = meshA.position.clone();
    let finalPos = meshB.position.clone();
    finalPos.y = initialPos.y;

    animate(meshA, [
      {position: initialPos, progress: 0},
      {position: initialPos.clone().add(new Vector3(0, 0, zOffset)), progress: 0.2},
      {position: finalPos.clone().add(new Vector3(0, 0, zOffset)), progress: 0.8},
      {position: finalPos, progress: 1},
    ],
    durationMs);
  }, [animate]);

  const swapCallback: SwapCallback = useCallback(
      (a, b, speedMultiplier = 1) => {
    const duration = speedMultiplier * DEFAULT_DURATION_MS / animSpeed;
    
    moveElement(refArray[a].current, refArray[b].current, duration, 1.2);
    moveElement(refArray[b].current, refArray[a].current, duration, 2.4);

    [refArray[a].current, refArray[b].current] =
      [refArray[b].current, refArray[a].current];
      
    return new Promise(res => setTimeout(res, duration));
  }, [moveElement, animSpeed, refArray]);

  const setElementColor: SetColorCallback = useCallback(
      (index, color, speedMultiplier = 1) => {
    // @ts-ignore
    refArray[index].current.material.color.setHex(color);
    return new Promise(res => setTimeout(res, speedMultiplier * DEFAULT_DURATION_MS / animSpeed));
  }, [animSpeed, refArray]);

  const resetElementColor: ResetColorCallback = useCallback(
      (index, speedMultiplier = 1) => {
    // @ts-ignore
    refArray[index].current.material.color.setHex(0xFFFFFF);
    return new Promise(res => setTimeout(res, speedMultiplier * DEFAULT_DURATION_MS / animSpeed));
  }, [animSpeed, refArray]);

  const animatedSorter = useMemo(
    () => {
      console.log('animatedSorter created');
      return new AnimatedSorter(swapCallback, setElementColor, resetElementColor);
    },
    []
  );

  useEffect(() => {
    animatedSorter.swapCallback = swapCallback;
    animatedSorter.setElementColor = setElementColor;
    animatedSorter.resetElementColor = resetElementColor;
  }, [swapCallback, setElementColor, resetElementColor])

  useEffect(() => {
    setHandleSortButton(async (algorithmOption: string) => {
      cancelAllAnimations();
      await animatedSorter.stop();
      // @ts-ignore
      animatedSorter[algorithmOption as keyof AnimatedSorter](elements);
    });
    
    setHandleRandomizeButton(async () => {
      cancelAllAnimations();
      await animatedSorter.stop();

      randomizeArrayElements();
    });
  },
    [elements, setHandleSortButton, setHandleRandomizeButton, animatedSorter]
  );
}