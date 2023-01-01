import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Mesh, RepeatWrapping, Texture, Vector3 } from 'three';
// import { useFrame } from '@react-three/fiber';
// import { Sky, useHelper } from '@react-three/drei';
// import { useBox } from '@react-three/cannon';
// import { RepeatWrapping, Vector2 } from 'three';
import { WWIIShipHull_OldTexture, WWIIShipHull_OldNormalTexture } from '../../images/textures'

const ArrayElement = forwardRef((_, ref: React.Ref<Mesh>) => {
  // const [texture, setTexture] = useState(() => {
  //   const texture = WWIIShipHull_OldTexture.clone();
  //   texture.wrapT = RepeatWrapping;
  //   texture.repeat.set(.333, .333 * height);
  //   return texture;
  // });
  // const inputRef = useRef();

  // useImperativeHandle(ref, () => ({
  //   texture: WWIIShipHull_OldTexture.clone()
  // }));
  
  // WWIIShipHull_OldTexture.wrapS = RepeatWrapping
  // WWIIShipHull_OldTexture.wrapT = RepeatWrapping;
  // texture.repeat.set(.5, .5 * height);
  // WWIIShipHull_OldNormalTexture.wrapS = RepeatWrapping
  // WWIIShipHull_OldNormalTexture.wrapT = RepeatWrapping
  // WWIIShipHull_OldNormalTexture.repeat.set(.5, .5);

  // console.log('ArrayElement created', height);

  return (
    <mesh
      ref={ref}
    >
      <boxGeometry />
      {/* <meshStandardMaterial
        attach='material'
        normalMap={WWIIShipHull_OldNormalTexture}
        map={texture} /> */}
    </mesh>
  )
});

export { ArrayElement };