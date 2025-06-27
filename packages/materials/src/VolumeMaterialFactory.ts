import { ShaderMaterial } from 'three';

export default function VolumeMaterialFactory() {
  return new ShaderMaterial({
    transparent: true,
    depthWrite: false,
  });
}
