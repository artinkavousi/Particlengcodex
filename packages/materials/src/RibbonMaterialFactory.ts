import { LineBasicMaterial } from 'three';

export default function RibbonMaterialFactory() {
  return new LineBasicMaterial({ color: 0xffffff });
}
