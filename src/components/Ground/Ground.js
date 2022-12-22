import { usePlane } from '@react-three/cannon';
import { RepeatWrapping } from 'three';
import { metalThreadPlateAlbedoTexture, metalThreadPlateNormalTexture } from '../../images/textures';

export const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    material: { friction: 0.99 }
  }))

  metalThreadPlateAlbedoTexture.wrapS = RepeatWrapping;
  metalThreadPlateAlbedoTexture.wrapT = RepeatWrapping;
  metalThreadPlateAlbedoTexture.repeat.set(120, 120);

  return (
    <mesh receiveShadow ref={ref}>
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      <meshStandardMaterial
        attach='material'
        color={[.84, .84, .84]}
        map={metalThreadPlateAlbedoTexture}
        normalMap={metalThreadPlateNormalTexture} />
    </mesh>
  )
}