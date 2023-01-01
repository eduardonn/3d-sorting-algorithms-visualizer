import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";

interface Keyframe {
  position: Vector3;
  progress: number;
  interpolation?: string;
}

interface LinearAnimationProps {
  object: Mesh;
  keyframes: Array<Keyframe>;
  durationMs: number;
}

const LinearAnimation = ({ object, keyframes: points, durationMs }: LinearAnimationProps) => {
  let startTime: number;
  // console.log('startTime: ' + this.startTime);

  const update = (time: number) => {
    if (!object) return;
    if (!startTime) startTime = time;
  
    let progress = (time - startTime) / durationMs;
    if (progress > 1) {
        object.position.copy(points[points.length - 1].position);
        return true;
    }
    
    let pointsLength = points.length;
    let i;

    for (i = 0; i < pointsLength; ++i) {
        if (progress < points[i].progress) break;
    }

    let currentPoint = points[i - 1];
    let nextPoint = points[i];
    
    // object.position.set(...nextPoint.position);
    object.position.lerpVectors(
        currentPoint.position, nextPoint.position,
        (progress - currentPoint.progress) / (nextPoint.progress - currentPoint.progress));

    return false;
  }

  return update;
}

export const useAnimation = () => {
  const animations = useRef<Set<(time: number) => boolean | undefined>>(new Set());
  const addAnimation = (object: Mesh, keyframes: Array<Keyframe>, durationMs: number) => {
    animations.current.add(LinearAnimation({ object, keyframes, durationMs }));
  };

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime() * 1000;
    for (let anim of animations.current) {
      if (anim(elapsedTime)) animations.current.delete(anim);
    }
  });

  return { addAnimation };
}