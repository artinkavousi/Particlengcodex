## Living‑Motion Particle Engine — **Comprehensive Vision & Capability Reference**

*(Document 1 — 2025 Ultra‑Expanded Edition)*

> **Foundation Stack** ▸ Three.js r177 (WebGPU renderer) ▸ Complete **TSL Node** pipeline (compute + material + post) ▸ Pure, tree‑shakeable JSM modules ▸ React‑Three‑Fiber / Drei first‑class hooks ▸ Tweakpane (glass‑UI) overlays ▸ GSAP timelines for UI/particle choreography. **Data Sources** ▸ June‑2025 Node/TSL knowledge‑dump: *INDEX.md*, *WEBGPU\_AND\_GPGPU.md*, *NODE\_MATERIALS.md*, *POST\_PROCESSING\_EFFECTS.md*, *TSL\_CORE\_MODULES.md*, *COMPLETE\_NODE\_TSL\_FILES\_LIST\_WITH\_EXAMPLES.md*, *WebGPU\_TSL\_API\_Guide.md*, *TSL\_NODE\_MATERIALS\_COMPREHENSIVE\_GUIDE.md*, *Three\_WebGPU\_TSL\_All\_Docs\_Combined.md*, *ALLin1THREETSLNODEv1.md*.

---

### 0 · **Grand Vision: A Particle Engine That Breathes, Feels & Evolves**

We aim to build an **open‑source, GPU‑native biosphere simulator** where every point can become a droplet, a sand grain, a bird, a neuron, or a spark of plasma—**all in real time, all controlled via high‑level node graphs**.  This engine should:

- **Morph seamlessly** between solids, liquids, gases, plasmas and procedural volumes.
- **Express emotion** via colour, motion, size, light emission, sound and shader deformation.
- **React to multi‑modal inputs** (touch, voice, MIDI, OSC, XR controllers, web cams, AI prompts).
- **Render photoreal or stylised** looks by toggling NodeMaterial graphs—no shader rewrites.
- **Stay modular**: copy‑paste any folder from `@living‑motion/*` into a CDN script tag and it works.
- **Iterate vertically**: each commit produces a runnable playground so artists never wait for tech.

**Ten Guiding Principles**

1. **Everything Node—Everything TSL** → 100 % shader logic flows through TSL constructs (`Fn`, `Struct`, `Switch`, `Loop`, `Import`).
2. **GPU‑Centric Truth** → data lives in `StructuredArray` + `StorageBufferNode`; CPU merely orchestrates.
3. **Vertical‑Slice Delivery** → each milestone adds 1 feature + 1 demo + 1 unit test.
4. **Emotion‑Ready Schema** → built‑in `emotion` vec4 + mood LUTs for quick audiovisual coupling.
5. **Framework‑Agnostic Core** → plain exports usable in R3F, VueThrelte, SvelteCubed, Babylon.
6. **Fail‑Graceful Fallback** → WebGL2 ping‑pong compute path that mirrors WGSL kernels.
7. **Human‑Readable Config** → JSON / UI describes entire pipeline (emitters → solvers → post‑FX).
8. **Live‑Reload Everything** → hot‑swap node graphs & tweakpane without full refresh.
9. **AI‑Empowered** → on‑board tiny LLM prompts drive field presets & style suggestions.
10. **Docs as Code** → every example in docs compiles inside `/examples/Playground.ts`.

---

### 1 · **Particle Schema: Deep GPU Layout**

Below is the canonical `particle-schema` generator output—extended with bandwidth considerations and mobile tier fall‑backs.

| Field          | Type (desktop) | Mobile Tier B | Purpose & Implementation Notes                                       |
| -------------- | -------------- | ------------- | -------------------------------------------------------------------- |
| `position`     | `vec3<f32>`    | same          | World position; updated by integrators & morphers.                   |
| `velocity`     | `vec3<f32>`    | same          | Δ pos / dt.                                                          |
| `acceleration` | `vec3<f32>`    | half‑float    | Force sum; can be compressed on low‑end.                             |
| `quat`         | `vec4<f32>`    | half‑float    | Orientation for rigid sprites / instanced meshes.                    |
| `scale`        | `f32`          | half‑float    | Uniform or axial scale multiplier.                                   |
| `age`          | `f32`          | same          | Seconds since spawn.                                                 |
| `lifetime`     | `f32`          | same          | Despawn test: `age ≥ lifetime`.                                      |
| `mass`         | `f32`          | half‑float    | Influences SPH, MPM, XPBD inertia.                                   |
| `temperature`  | `f32`          | u16 fixed     | Drives black‑body colour or smoke buoyancy.                          |
| `emotion`      | `vec4<f32>`    | `vec4<f16>`   | (joy, anger, fear, calm) – maps to colour / jitter / solver weights. |
| `userA‑D`      | `vec4<f32>`    | user‑defined  | 4 free vec4s for custom modules (wave phase, trail idx, etc.).       |

A ``** factory** autogenerates WGSL `struct Particle { … };` and the matching JS typed‑array view, ensuring alignment paddings (std430) match across browsers (see Section *2.3 in **`WEBGPU_AND_GPGPU.md`*).

**Memory Footprint**: default desktop layout = 112 bytes/particle → 10 M particles ≈ 1.07 GB VRAM; mobile tier truncates half‑floats, hitting ≈ 540 MB.  Developers may toggle the *lite layout preset* via:

```ts
engine.setLayout( ParticlePresets.LITE_64 );
```

---

### 2 · **Subsystem Constellation & Scheduling Graph**

```
Frame Tick ─┬╴▶ SpawnerSys   □ fill buffer tail
            ├╴▶ NeighbourGrid □ hash & link cells
            ├╴▶ FieldSumSys   □ sample global fields
            ├╴▶ SolverSys     □ XPBD / SPH / …
            ├╴▶ MorphSys      □ blend to SDF / mesh / volume
            ├╴▶ PostEmitHook  □ custom user compute
            ├╴▶ RenderPrepSys □ pack instance attributes
            └╴▶ NodeMaterialDrawPass
GPU ↻ Async compute queues overlap before render barrier.
```

*Scheduling Rules*

1. Each system declares **read/write ranges** (particle sub‑buffers).
2. Scheduler auto‑sorts passes to avoid WAR/WAW hazards.
3. Heavy solvers (`MLS‑MPM`, `FLIP`) run on **secondary queue** so UI stays 60 fps.

---

### 3 · **Solver & Behaviour Arsenal**

A greatly expanded catalogue cross‑referenced with *`COMPLETE_NODE_TSL_FILES_LIST_WITH_EXAMPLES.md`*.

| Family            | WGSL Passes                            | Adjustable Parameters (GUI Path)                      | Typical Use‑Cases                                   |
| ----------------- | -------------------------------------- | ----------------------------------------------------- | --------------------------------------------------- |
| **Newtonian**     | `EulerIntegratorFn`, `RK4Fn`, `DragFn` | `gravity`, `drag`, `windVector`                       | Simple fireworks, confetti, GPU particles in games. |
| **XPBD**          | distance, bend, volume, shape‑match    | `stiffness`, `compliance`, `projIters`                | Cloth, soft‑body jelly, snow‑ball v2.               |
| **SPH**           | density, pressure, XSPH viscosity      | `restρ`, `γ`, `tension`, `kernel_h`                   | Fluids, splashes, molten metal.                     |
| **FLIP/APIC**     | P2G, GridUpdate, Vorticity, G2P        | `flipRatio`, `jacobiIters`, `gravityScale`            | High‑energy liquids, surf‑splashes.                 |
| **MLS‑MPM**       | Affine‑P2G, GridSolve, PlasticYield    | `E`, `ν`, `hardening`, `θc`, `θs`                     | Snow, sand, mud tyre tracks.                        |
| **Boids 3D**      | hashgrid build, steerStep              | `viewRadius`, `separationW`, `alignW`, `cohesionW`    | Bird flocks, fish schools, crowd viz.               |
| **FEM Tetra**     | StVK, corotational, polar‑decomp       | `E`, `ν`, `damping`                                   | Real‑time flesh, muscles (medical sim).             |
| **Physarum**      | trail deposit, diffusion, sensor steer | `sensorAngle`, `sensorDist`, `trailDecay`, `rotSpeed` | Generative art, network optimisation demo.          |
| **Magneto**       | Biot‑Savart, Lorentz, dipole lattice   | `mu0`, `current`, `falloffExp`                        | Ferrofluid art, EM field education.                 |
| **RD Gray‑Scott** | update A,B fields, colour map          | `feed`, `kill`, `diffU`, `diffV`                      | Turing patterns on planes, volumetric blobs.        |
| **Nano‑RL**       | GPU Q‑table, ε‑greedy policy           | `α`, `γ`, `ε`, `rewardFunc`                           | Self‑organising flock avoiding obstacles in VR.     |

All solvers are **decorated** with `@solverCategory` metadata so tweakpane can group them automatically (per `NODE_MATERIALS.md` integration guidelines).

---

### 4 · **Emitter & Spawn Matrix – Extended Catalogue**

#### 4.1 Built‑in Emitters

| Tag              | Generator Strategy                                | Ideal For                                     |
| ---------------- | ------------------------------------------------- | --------------------------------------------- |
| `point`          | single seed                                       | fireworks, laser strikes.                     |
| `sphere`         | radial or shell                                   | explosion bursts, planet atmospheres.         |
| `box`            | uniform AABB                                      | snowfall inside window.                       |
| `meshSurface`    | barycentric area sampling                         | characters dissolving to dust.                |
| `meshVolume`     | tetrahedralised interior                          | fire inside logo.                             |
| `skinnedSurface` | uses bone matrices to spawn per‑frame             | burning cloth on animated character.          |
| `spline`         | pre‑computed arc‑length LUT + Frenet frames       | streamers, fireworks trails.                  |
| `latlongHDR`     | spherical distribution weighted by HDRI luminance | star field around HDR skybox bright spots.    |
| `audioFFT`       | spawns per band energy                            | music‑driven spark fountains.                 |
| `GPUTexture`     | uses red channel as density probability           | generative logos from client‑supplied images. |

#### 4.2 Spawner Life‑Cycle Hooks

- `` (WGSL)    — set colour, emotion, velocity.
- `` (JS)      — schedule GSAP tween, UI events.
- **Warm Pools**    — keep N dead slots hot to minimise realloc.

---

### 5 · **Field & Force Palette — Deep Dive**

The engine exposes a ``. Developers compose forces by stacking nodes returned from `makePerlinCurlNode()`, `makeDipoleNode()`, `makeSDFGradientNode()` etc.  Each node supports **time‑varying uniforms** so fields dance with music.

Example (R3F):

```tsx
const swirl = useMemo(() => FieldNodeFactory.compose([
  FieldNodeFactory.fromCurlNoise({ scale: 0.8, octaves: 5 }),
  FieldNodeFactory.radial({ center: new Vec3(), strength: -2 }),
]), []);
engine.addField(swirl);
```

Built‑ins include:

- **Analytic** ‑ vortex, dipole, saddle, solenoid.
- **Noise** ‑ simplex, ridge, domain‑warp FBM with multi‑octave falloff.
- **Data** ‑ NASA wind tensors (NetCDF), flow nets imported via glTF volume ext.
- **AI** ‑ 3‑D vector field predicted by ONNX (latent flow stylisation).
- **Chemo** ‑ physarum trail texture feedback loop.
- **EM** ‑ Maxwell quasi‑static solver for charges.

---

### 6 · **Rendering Arsenal — Full NodeMaterial Roster**

#### 6.1 Geo Classes

- `` – sprite atlas, per‑particle soft light, built‑in depth sort (coming phase 7).
- `` – Frenet or fixed‑up forms, velocity‑based width.
- `` – optional normal mapping via matcap or PBR.
- `` – ray‑march w/ Jitter & Phase functions (Henyey‑Greenstein).

#### 6.2 Lighting Nodes

- `PhysicalLightingModelNode` (Lambert, GGX, Sheen, Clearcoat).
- `ClusteredLightsNode` – 1024 point lights with compute‑tile culling.
- `AnalyticAreaLightNode` – rect & disc shapes (IES profiles loadable via KHR\_ltc1).

#### 6.3 Specialised BRDF/BSDF Nodes

- Thin‑film interference (`IridescenceNode`)
- Anisotropic hair shading (`FiberNode`)
- Subsurface scattering via `BSSRDFNode` (random‑walk)
- Frosted / glint surfaces with `MicrofacetDistributionNode` presets.

All NodeMaterials can be **auto‑generated** from a JSON patch describing slot mapping—see `NODE_MATERIALS.md` §8.

---

### 7 · **Post‑Processing Constellation — Extended**

| Order | Node Pass             | Key Params                                     | Visual Result                            |
| ----- | --------------------- | ---------------------------------------------- | ---------------------------------------- |
| 1     | `ChromaticAberration` | `offset`, `radialBias`                         | Subtle lens dispersion.                  |
| 2     | `Bloom`               | `threshold`, `knee`, `radius`, `intensity`     | Glowy highlights.                        |
| 3     | `GTAO`                | `thickness`, `angleBias`, `power`              | Fast ground‑truth AO.                    |
| 4     | `MotionBlur`          | `samples`, `shutterAngle`, `tileMaxPasses`     | Cinematic streaks.                       |
| 5     | `DepthOfField`        | `focusDistance`, `aperture`, `bokehShapeTex`   | DSLR‑style blur.                         |
| 6     | `FilmGrain`           | `intensity`, `animated`                        | Vintage grain.                           |
| 7     | `ColorGrading`        | `lutTex3D`, `exposure`, `contrast`, `saturate` | Final tone pass with ACES or custom LUT. |

Chain described via:

```json
[
  { "BloomNode": { "radius": 0.5, "intensity": 1.4 } },
  { "FilmGrainNode": { "intensity": 0.15 } }
]
```

And hot‑swapped at runtime.

---

### 8 · **Interaction Channels & Middleware**

1. **Pointer / Touch** → ray‑casters send hit data into `UniformNode` buffer; compute pass adds local vortex force.
2. **MIDI / OSC** → lightweight `osc-js` listener maps CC messages into UI & solver knobs.
3. **Microphone / Audio** → 256‑band FFT uniform; beat detector triggers emitter bursts.
4. **WebXR** → controller pose spawns dipole field; haptic feedback amplitude tied to local particle density.
5. **AI Prompt** → LLM returns mood vector; engine blends `emotion` colours & selects appropriate post‑FX.
6. **Yjs CRDT** → multi‑user shared sliders; every peer sees identical particle state after deterministic seed.

GUI side uses **Tweakpane 2** with a frosted glassmorphism theme and **GSAP** timelines to animate panel transitions.

---

### 9 · **Performance, Profiling & Mobile Strategy**

- **StructuredArray Paging** – segmented pool to avoid 32‑bit atomic overflow; pages recycled via freelist.
- **GPU Buddy Allocator** in compute memory for transient grids (FLIP);
- **IndirectDraw + GPU Bitonic Sort** – sorts \~8 M sprites < 1 ms (desktop RTX) using shared memory tiles.
- **Tile‑Based Post‑FX** – run DOF & Bloom at quarter res with hierarchical merge to save bandwidth.
- **WebGPU Trace Names** – every buffer/texture labeled → better Chrome trace UI.
- **Fallback Paths** – on Safari iOS 17 WebGPU, disables 3‑scanline post passes & halves workgroup sizes.
- **Benchmark Harness** – `/bench/index.html` auto‑runs 9 scenes & produces CSV; GitHub CI posts trend graph.

---

### 10 · **Modular JSM Package Topology**

```
@living‑motion/
 ├─ core/
 │   ├─ ParticleEngine.js           // orchestrator
 │   ├─ ParticlePool.js             // StructuredArray wrappers
 │   ├─ Scheduler.js                // dependency graph & barriers
 │   └─ UniformBridge.js            // R3F hook glue
 │
 ├─ solvers/
 │   ├─ XPBD.js
 │   ├─ SPH.js
 │   ├─ FLIP.js
 │   ├─ MLS‑MPM.js
 │   ├─ Boids.js
 │   └─ Physarum.js
 │
 ├─ emitters/
 │   ├─ SphereEmitter.js
 │   ├─ MeshSurfaceEmitter.js
 │   └─ AudioFFTEmitter.js
 │
 ├─ fields/
 │   ├─ CurlNoiseField.js
 │   ├─ DipoleField.js
 │   └─ SDFGradientField.js
 │
 ├─ materials/
 │   ├─ PointsMaterialFactory.js
 │   ├─ VolumeMaterialFactory.js
 │   └─ RibbonMaterialFactory.js
 │
 ├─ post/
 │   ├─ BloomNodePass.js
 │   ├─ MotionBlurNodePass.js
 │   └─ DOFNodePass.js
 │
 ├─ react/
 │   └─ useParticleSystem.tsx       // easy R3F hook
 └─ examples/
     ├─ Flock.ts
     ├─ SandCastle.ts
     └─ LiquidShaderBall.ts
```

Each file is **stand‑alone JSM**: imports from local `core/` only, no bundler magic needed; copy‑paste into any Vite or CDN environment.

---

### 11 · **Extensibility Recipes & Code Snippets**

**Custom Solver In < 30 Lines**

```js
// /solvers/GravityWaves.js
import { ComputeNode, Fn, Struct } from '@living‑motion/core';
const GravityWaves = new ComputeNode({
  workgroupSize: 128,
  code: Fn(
    /* wgsl */
    `fn main(idx: u32) {
      var p = particles[idx];
      let wave = sin(time * 2.0 + p.position.x * 4.0) * 0.5;
      p.acceleration.y += wave;
    }`
  )
});
export default GravityWaves;
```

Register:

```ts
engine.addSolver('GravityWaves', GravityWaves, { order: 'postField' });
```

**Attach a New Post‑FX Node**

```js
import { FilmGrainNode } from '@living‑motion/post';
post.addEffect(FilmGrainNode, { intensity: 0.12, animated: true });
```

**R3F Quick Start**

```tsx
function MyParticles() {
  const { ref } = useParticleSystem({
    max: 2_000_000,
    emitters: [ SphereEmitter({ radius: 1, rate: 50_000 }) ],
    solvers: [ 'XPBD', 'GTAO' ],
    post: [ 'Bloom', 'MotionBlur' ],
  });
  return <primitive object={ref.current} />;
}
```

---

### 12 · **Future Roadmap Snapshots** (excerpt from Doc 5)

- **Phase 6 – GPU Sorting & Indirect Draw** (Oct 2025) – transparent depth sorting for dense metaball sprites.
- **Phase 7 – Mobile Parity + iOS** – optimise for A17 GPU; half‑res volumetrics, tile‑based compute.
- **Phase 8 – Ray‑Query NodeMaterials** – path‑traced point sprites via WebGPU ray tracing proposal.
- **Phase 9 – Procedural AI Assist** – GPT‑powered node‑graph generator (“Paint me a nebula flock”).

Progress visualised on *projects board* inside repo.

---

### 13 · **Glossary & Quick Links**

- **TSL** – Three Shader Language, a node‑graph meta‑DSL that outputs WGSL/GLSL.
- **WGSL** – WebGPU Shading Language.
- **XPBD** – Extended Position‑Based Dynamics.
- **MLS‑MPM** – Moving Least Squares Material Point Method.
- **TSN** – Tweakpane Structured Node (our UI preset JSON).

— End of Document 1 (Ultra‑Expanded).

