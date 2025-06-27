# Living-Motion Particle Engine

This repository bootstraps the project described in the vision and tech-stack documents.

The monorepo uses **pnpm** workspaces and contains the following packages:

- `@living-motion/core` – minimal engine kernel with renderer setup.
- `@living-motion/solvers` – sample solver implementations.
- `@living-motion/emitters` – basic particle emitters.
- `@living-motion/fields` – simple force field utilities.
- `@living-motion/materials` – helpers for Three.js materials.
- `@living-motion/post` – small postprocessing passes.
- `@living-motion/react` – React hook wrapper for easy integration.

Run `pnpm install` then `pnpm test` to execute unit tests.
