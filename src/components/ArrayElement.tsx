import React, { forwardRef } from 'react';
import { Mesh } from 'three';

const ArrayElement = forwardRef((_, ref: React.Ref<Mesh>) => {
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