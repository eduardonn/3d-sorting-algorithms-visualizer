import { TextureLoader } from 'three';

import {
  metalThreadPlateAlbedoImg,
  metalThreadPlateNormalImg,
  metalThreadPlateRoughnessImg,
  WWIIShipHull_OldImg,
  WWIIShipHull_OldNormalImg,
} from './images';

const metalThreadPlateAlbedoTexture = new TextureLoader().load(metalThreadPlateAlbedoImg);
const metalThreadPlateNormalTexture = new TextureLoader().load(metalThreadPlateNormalImg);
const metalThreadPlateRoughnessTexture = new TextureLoader().load(metalThreadPlateRoughnessImg);
const WWIIShipHull_OldTexture = new TextureLoader().load(WWIIShipHull_OldImg);
const WWIIShipHull_OldNormalTexture = new TextureLoader().load(WWIIShipHull_OldNormalImg);

export {
  metalThreadPlateAlbedoTexture,
  metalThreadPlateNormalTexture,
  metalThreadPlateRoughnessTexture,
  WWIIShipHull_OldTexture,
  WWIIShipHull_OldNormalTexture,
}