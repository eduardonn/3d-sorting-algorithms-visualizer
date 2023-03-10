import { usePlane } from '@react-three/cannon';
import { RepeatWrapping } from 'three';
import { metalThreadPlateAlbedoTexture, metalThreadPlateNormalTexture } from '../images/textures';

export const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    material: { friction: 0.99 }
  }))

  metalThreadPlateAlbedoTexture.wrapS = RepeatWrapping;
  metalThreadPlateAlbedoTexture.wrapT = RepeatWrapping;
  metalThreadPlateAlbedoTexture.repeat.set(120, 120);

  console.log('Ground called');

  return (
    <mesh receiveShadow ref={ref}>
      <planeGeometry attach='geometry' args={[300, 100]} />
      <meshStandardMaterial
        map={metalThreadPlateAlbedoTexture}
        normalMap={metalThreadPlateNormalTexture} />
    </mesh>
  )
}