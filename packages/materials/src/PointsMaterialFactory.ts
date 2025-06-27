import { PointsMaterial } from 'three';

export interface PointsMaterialOptions {
  color?: number;
  size?: number;
}

export default function PointsMaterialFactory(opts: PointsMaterialOptions = {}) {
  return new PointsMaterial({
    color: opts.color ?? 0xffffff,
    size: opts.size ?? 1,
    sizeAttenuation: true,
  });
}
