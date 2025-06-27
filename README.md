# Living-Motion Particle Engine

This repository bootstraps the project described in the vision and tech-stack documents.

The monorepo uses **pnpm** workspaces and contains the following packages:

- `@living-motion/core` – minimal engine kernel with renderer setup.
- `@living-motion/solvers` – sample solver implementations.
- `@living-motion/emitters` – basic particle emitters (sphere, point, box, meshSurface, audioFFT).
- `@living-motion/fields` – simple force field utilities (curl-noise, dipole, radial, vortex, SDF gradient, saddle).
- `@living-motion/materials` – helpers for Three.js materials (points, volume, ribbon, matcap).
- `@living-motion/post` – small postprocessing passes (bloom, motion blur, DOF, chromatic aberration).
- `@living-motion/react` – React hook wrapper for easy integration.

Run `pnpm install` then `pnpm test` to execute unit tests.
