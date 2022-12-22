import React, { forwardRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { Sky, useHelper } from '@react-three/drei';
// import { useBox } from '@react-three/cannon';
// import { RepeatWrapping, Vector2 } from 'three';
import { WWIIShipHull_OldTexture, WWIIShipHull_OldNormalTexture } from '../../images/textures'

const ArrayElement = forwardRef(({ height, position }: { height: number, position: number}, ref: React.ForwardedRef<unknown>) => {
  
  // WWIIShipHull_OldTexture.wrapS = RepeatWrapping
  // WWIIShipHull_OldTexture.wrapT = RepeatWrapping
  // WWIIShipHull_OldTexture.repeat.set(.5, .5 * props.height);
  // WWIIShipHull_OldNormalTexture.wrapS = RepeatWrapping
  // WWIIShipHull_OldNormalTexture.wrapT = RepeatWrapping
  // WWIIShipHull_OldNormalTexture.repeat.set(.5, .5 * props.height);

  return (
    <mesh
      ref={ref}
      name={'i am ' + height}
      scale={[1, height, 1]}
      position={position} >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        attach='material'
        normalMap={WWIIShipHull_OldNormalTexture}
        map={WWIIShipHull_OldTexture} />
    </mesh>
  )
});

export { ArrayElement };