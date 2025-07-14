# Living-Motion Particle Engine

This repository bootstraps the project described in the vision and tech-stack documents.

The monorepo targets **Three.js r178** and uses **WebGPURenderer** from `three/webgpu`.
It uses **pnpm** workspaces and contains the following packages:

- `@living-motion/core` – minimal engine kernel with renderer setup.
- `@living-motion/solvers` – sample solver implementations.
- `@living-motion/emitters` – basic particle emitters (sphere, point, box).
- `@living-motion/fields` – simple force field utilities (curl-noise, dipole, radial, vortex, SDF gradient).
- `@living-motion/materials` – helpers for Three.js materials.
- `@living-motion/post` – small postprocessing passes.
- `@living-motion/react` – React hook wrapper for easy integration.

The core engine requires calling `init()` on `ParticleEngine` before `start()`. The
React hook `useParticleEngine` handles this automatically.

Run `pnpm install` then `pnpm test` to execute unit tests.
