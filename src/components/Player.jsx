import { useThree, useFrame } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { useRef, useEffect, useCallback } from 'react';
import { Vector3 } from 'three';
import { useKeyboard } from '../hooks/useKeyboard';
import { useArrayStore } from '../hooks/useArrayStore.tsx';
import { useControls } from 'leva';
import { createRandomArray } from '../utils';

const JUMP_FORCE = 400;
// const WALK_FORCE = 1250;
const WALK_SPEED = 4.7;

export const Player = () => {
  const setArrayElements = useArrayStore((state) => state.setArrayElements );
  const { friction, restitution, angularDamping, jumpForce } = useControls({
    friction: 0.03,
    restitution: 1.0,
    angularDamping: 0.9,
    jumpForce: JUMP_FORCE,
  });
  const { moveForward, moveBackward, moveLeft, moveRight, KeyT, KeyR } = useKeyboard();
  const { camera } = useThree();
  const [ ref, api ] = useSphere(() => ({
    mass: 50,
    type: 'Dynamic',
    position: [0, 5, 5],
    // fixedRotation: true,
    // angularDamping: 1.0,
    material: { friction: 0.03, restitution: 1.0 }
  }));

  const handleInputs = useCallback((e) => {
    switch (e.code) {
      case 'KeyC':
        setArrayElements(createRandomArray(0, 10, 10));
        break;
      case 'Space':
        api.applyImpulse([0, jumpForce, 0], [0, 0, 0]);
        api.applyForce([0, jumpForce, 0], [0, 0, 0]);
        // api.velocity.set(0, 40, 0);
        // api.position.set(0, 10, 0);
        console.log('pressed Space | jumpForce: ', jumpForce);
        break;
      default:
    }
  }, [jumpForce, api, setArrayElements]);

  useEffect(() => {
    console.log('useEffect in Player');
    document.addEventListener('keydown', handleInputs);
    return () => document.removeEventListener('keydown', handleInputs);
  }, [handleInputs]);

  useEffect(() => {
    api.material.set({ friction, restitution })
    api.angularDamping.set(angularDamping);
  }, [api.material, api.angularDamping, friction, restitution, angularDamping]);
  
  const vel = useRef([0, 0, 0]);
  useEffect(() => {
    const unsubscribe = api.velocity.subscribe((v) => vel.current = v);
    return unsubscribe;
  }, [api.velocity]);
  
  const pos = useRef([0, 0, 0]);
  useEffect(() => {
    const unsubscribe = api.position.subscribe((p) => pos.current = p);
    return unsubscribe;
  }, [api.position]);

  useFrame(() => {
    camera.position.copy(new Vector3(...pos.current));

    const direction = new Vector3(
      (moveRight ? 1 : 0) - (moveLeft ? 1 : 0),
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0),
    )
      .normalize()
      .multiplyScalar(WALK_SPEED)
      .applyEuler(camera.rotation)

    // console.log('direction: ', direction);

    api.velocity.set(direction.x, vel.current[1], direction.z);
    // api.applyForce([...direction], [0, 0, 0]);

    if (KeyR) {
      api.applyForce([0, 1000, 0], [0, 0, 0]);
    }

    if (KeyT) {
      api.position.set(0, 3, 3);
      api.velocity.set(0, 0, 0);
    }
  })

  return <mesh ref={ref}></mesh>
}