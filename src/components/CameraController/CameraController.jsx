import { PointerLockControls, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

// TODO: Fix mouse glitching when moving sometimes
export const CameraController = ({ cameraType, target }) => {
  const { camera, gl } = useThree();

  // if (cameraType === 'orbit')
  //   return (<OrbitControls args={[camera, gl.domElement]} />)
  // else if (cameraType === 'pointer-lock')
  //   return (<PointerLockControls args={[camera, gl.domElement]} />)

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