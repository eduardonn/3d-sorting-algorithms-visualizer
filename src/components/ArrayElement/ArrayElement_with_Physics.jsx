import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sky, useHelper } from '@react-three/drei';
import { useBox } from '@react-three/cannon';
import { RepeatWrapping, Vector2 } from 'three';
import { WWIIShipHull_OldTexture, WWIIShipHull_OldNormalTexture } from '../../images/textures'

const ArrayElement = (props) => {
  const [ hovered, hover ] = useState(false);
  const [ collided, collide ] = useState(false);
  const [ clicked, click ] = useState(false);
  
  const [ref, api] = useBox(() => ({
    args: [1, props.height, 1],
    mass: props.height,
    position: props.position,
    rotation: [0, 0, 0],
    type: 'Dynamic',
  }));
  
  // WWIIShipHull_OldTexture.wrapS = RepeatWrapping
  // WWIIShipHull_OldTexture.wrapT = RepeatWrapping
  // WWIIShipHull_OldTexture.repeat.set(.5, .5 * props.height);
  // WWIIShipHull_OldNormalTexture.wrapS = RepeatWrapping
  // WWIIShipHull_OldNormalTexture.wrapT = RepeatWrapping
  // WWIIShipHull_OldNormalTexture.repeat.set(.5, .5 * props.height);

  // useHelper(ref, Box3Helper, 'red');

  useEffect(() => {
    // api.scaleOverride([1, props.height, 1]);
    api.scaleOverride([1, props.height, 1]);
    api.applyImpulse([0, 100, 0], [0, 0, 0])
    // api.position.set(...props.position);
    // api.rotation.set(0, 0, 0);
    api.velocity.set(0, 0, 0);
    api.angularVelocity.set(0, 0, 0);
    api.mass.set(props.height);
  },
  [props.height, props.position, api]);

  return (
    <mesh
      ref={ref}
      scale={[1, props.height, 1]}
      position={props.position}
      onClick={(event) => click(!clicked)}
      // onWheel={(event) => ref.current.scale.x *= (1 - event.deltaY * .001) }
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        attach='material'
        normalMap={WWIIShipHull_OldNormalTexture}
        map={WWIIShipHull_OldTexture} />
    </mesh>
  )
}

export { ArrayElement };