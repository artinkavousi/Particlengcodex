# Living-Motion Particle Engine

This repository bootstraps the project described in the vision and tech-stack documents.

The monorepo uses **pnpm** workspaces and contains the following packages:

- `@living-motion/core` – minimal engine kernel with renderer setup.
- `@living-motion/solvers` – sample solver implementations.
- `@living-motion/react` – React hook wrapper for easy integration.
- `@living-motion/emitters` – particle source modules.
- `@living-motion/fields` – vector and scalar field helpers.
- `@living-motion/materials` – TSL based materials.
- `@living-motion/post` – post-processing passes.
- `@living-motion/devtools` – debugging HUD components.

Recent additions implement more of the blueprint:
- `BoxEmitter` and `SphereEmitter` for spawning particles.
- `MeshSurfaceEmitter` for geometry based spawning.
- `CurlNoiseField` and `DipoleField` force helpers.
- `VortexField` swirling force sample.
- `RibbonTrailMaterial` alongside point sprite rendering.
- `VolumeSignedDistanceMaterial` and `MeshPhysicalNodeMaterial` for surfaces and volumes.
- `MotionBlurNodePass` post effect.
- `ChromaticAberrationNodePass` and `DepthOfFieldNodePass` for advanced visuals.
- `BoidsSolver` to demonstrate custom physics modules.
- `PhysarumSolver` showcasing trail feedback logic.

Run `pnpm install` then `pnpm test` to execute unit tests.
