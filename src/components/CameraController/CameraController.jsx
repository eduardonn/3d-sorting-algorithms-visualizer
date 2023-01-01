import { PointerLockControls, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

// TODO: Fix mouse glitching when moving sometimes
export const CameraController = ({ cameraType, target, camPos=[0, 0, 15]}) => {
  const { camera, gl } = useThree();
  camera.position.set(...camPos);

  return cameraType === 'orbit'
    ? (<OrbitControls
      target={target}
      zoomSpeed={5}
      // position={new Vector3(0, 50, 0)}
      args={[camera, gl.domElement]} />)

    : cameraType === 'first-person'
      ? (<PointerLockControls args={[camera, gl.domElement]} />)

      : null;
}