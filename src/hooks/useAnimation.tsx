import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";

interface Keyframe {
  position: Vector3;
  progress: number;
  interpolation?: string;
}

interface LinearAnimation {
  object: Mesh;
  keyframes: Array<Keyframe>;
  durationMs: number;
  progress: number;
}

type UpdateAnimation = (animation: LinearAnimation, deltaTimeMs: number) => boolean;

export const useAnimation = () => {
  const animations = useRef<Set<LinearAnimation>>(new Set());

  const animate = (object: Mesh, keyframes: Array<Keyframe>, durationMs: number) => {
    animations.current.add(
      {
        object,
        keyframes,
        durationMs,
        progress: 0
      }
    );
  };

  const updateAnimation: UpdateAnimation = (animation, deltaTimeMs) => {
    const { object, keyframes, durationMs } = animation;
    if (!object) return false;

    animation.progress += deltaTimeMs / durationMs;
    
    if (animation.progress > 1) {
      object.position.set(
        keyframes[keyframes.length - 1].position.x,
        object.position.y,
        0 // Hard coding to zero because animation could start before previous animation
          // finished, resulting in a non-zero z value
      );
      return true;
    }

    let keyframesLength = keyframes.length;
    let i;

    for (i = 0; i < keyframesLength; ++i) {
      if (animation.progress < keyframes[i].progress) break;
    }

    let currentPoint = keyframes[i - 1];
    let nextPoint = keyframes[i];

    // object.position.set(...nextPoint.position);
    object.position.lerpVectors(
      currentPoint.position, nextPoint.position,
      (animation.progress - currentPoint.progress) / (nextPoint.progress - currentPoint.progress));

    return false;
  }

  const updateAnimations = (deltaTime: number) => {
    for (let animation of animations.current) {
      if (updateAnimation(animation, deltaTime)) animations.current.delete(animation);
    }
  }

  const cancelAllAnimations = () => {
    for (let animation of animations.current) {
      // Force finish
      updateAnimation(animation, Infinity);
    }
    animations.current.clear();
  };

  useFrame((_, delta) => {
    updateAnimations(delta * 1000);
  });

  return { animate, cancelAllAnimations };
}