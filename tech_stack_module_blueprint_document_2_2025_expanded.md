## Living‑Motion Particle Engine — **Tech‑Stack & Module Blueprint**

*(Document 2 — 2025 Mega‑Expanded Edition · rev 1.2)*

> **Mission of this file:** give a *copy‑paste‑ready* technical map of *every* package, coding rule, build artefact, CI job, and Node/TSL authoring guideline that turns the vision in **Doc 1** into a shippable, tree‑shakeable JSM library.
>
> **Data Sources ingested:** June‑2025 TSL corpus (`INDEX.md`, `NODE_MATERIALS.md`, `POST_PROCESSING_EFFECTS.md`, `WEBGPU_AND_GPGPU.md`, `TSL_CORE_MODULES.md`, the all‑in‑one file list, and the combined WebGPU TSL API guide).

---

### 0 · 📌 At‑a‑Glance Stack Matrix

| Layer                     | Tech                                                                  | Why We Chose It                                                                                                                  | Mobile / Fallback                                                                       |
| ------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Renderer**              | Three.js r177 `WebGPURenderer`                                        | Straight‑forward WGSL ↔ TSL bridge, built‑in MRT, compute & render pass chaining, same API across desktop & mobile.              | Safari TP (WebGPU) ‑or‑ automatic polyfill to WebGL2 + single‑precision float fallback. |
| **Shader/Node Graph**     | **TSL** (Three Shader Language)                                       | Declarative; auto‑generates both WGSL and GLSL. Compute + fragment parity; shares code between XPBD kernels and bloom threshold. | Emits ES module with GLSL version if WebGPU not present.                                |
| **Compute**               | `GPUComputePassEncoder` + TSL `ComputeNode`                           | One source for solver + hashgrid; supports async dispatch and multi‑queue on Metal.                                              | Ping‑pong Float RTT for WebGL2.                                                         |
| **Scene Framework**       | React‑Three‑Fiber 9 / Drei 10                                         | Suspense‑friendly, hot‑reloadable, composable hooks; Drei includes `CameraControls`, `HDRI`, etc.                                | Works in React‑Native‑Skia (experimental) ; gracefully disables WebGPU.                 |
| **UI**                    | **Tweakpane 2** (glassmorphism preset) + Zustand store                | Tiny, themeable, 60 fps, pointer‑friendly; Zustand keeps param state outside React waterfall.                                    | CSS backdrop‑filter polyfilled for Safari 14.                                           |
| **Animation / Timelines** | GSAP 3 • `MotionNode` for TSL                                         | Drives DOM, React state, and `UniformNode` arrays in lock‑step; scrubbable.                                                      | Prefers `linear` tick on low‑power devices.                                             |
| **Bundler**               | *Dev* — Vite 5 (ESBuild)  ♦  *Lib* — Rollup 4 (TS‑up)                 | Rapid HMR for examples; Rollup emits ESM + CJS + TS d.ts + `.min.mjs` w/ terser.                                                 | Vite auto‑detects https & HMR websockets on LAN devices.                                |
| **Testing**               | Vitest (jsdom + happy‑dom)  ♦  Playwright 1.43 (Chromium Canary WGSL) | Unit + headless GPU screenshot diff; can inject WGSL disassembly for debug.                                                      | CI uses Mesa WGSL CPU path when GPU not available.                                      |
| **CI/CD**                 | GitHub Actions + pnpm workspace cache                                 | Matrix builds for linux‑chrome, mac‑safari‑tp, windows‑edge‑canary; auto‑bench & release.                                        | Can publish nightly `canary‑next` tag.                                                  |
| **Docs**                  | Storybook 7 (MDX) + Typedoc + Docusaurus @ `packages/docs`            | Live “playroom” injection of engine; typed code samples import real modules.                                                     | Generates static HTML for offline bundles.                                              |

---

### 1 · 🌲 Monorepo Forest (pnpm workspaces)

```
root/
├─ packages/
│   ├─ core/                # engine kernel (scheduler, pool, registry, math)
│   ├─ solvers/             # XPBD, SPH, FLIP, MPM, Electromag, Boids, Phasor
│   ├─ fields/              # vector/scalar field libraries + GPU SDFs
│   ├─ emitters/            # point, mesh‑surface, phyllotaxis spiral, slime‑pulse
│   ├─ materials/           # TSL node mats: Points, Volumetric, Ribbon, Matcap
│   ├─ post/                # BloomNode, SSRNode, GodRayNode, TAA, GTAO, LUT
│   ├─ react/               # R3F hooks, Drei wrappers, dev HUD overlays
│   ├─ examples/            # vite sites (01‑hello‑world → 15‑boids‑fluid‑mix)
│   ├─ devtools/            # spector‑like frame inspector overlay
│   └─ docs/                # MDX; imports real TS snippets using `virtual:source`
└─ infra/
    ├─ configs/rollup.*.mjs
    ├─ configs/vite.*.mjs
    └─ github/workflows/
        ├─ ci.yml
        ├─ doc‑deploy.yml
        └─ release‑please.yml
```

*Each workspace exposes **`exports`** map so **`import '@lm/solvers/XPBD'`** treeshakes.*

---

### 2 · ⚙️ Core Package Deep‑Dive (`packages/core`)

| File                   | Purpose                                                                                     | Notes                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `ParticleEngine.ts`    | Public API: init renderer, create pools, attach solvers, `tick()` / `start()` / `dispose()` | Tiny facade; no framework deps.                                                      |
| `ParticlePool.ts`      | Manages **TSL `StructuredArray`s** for pos/vel/etc.; double‑buffer if WebGL fallback.                       | Automatically pads to 16 bytes; hot‑swaps to bigger buffer when `capacity` exceeded. |
| `Scheduler.ts`         | Inserts compute/render passes into dependency graph; merges non‑overlapping writes.         | Uses `navigator.gpu.getPreferredCanvasFormat()` for color attachments.               |
| `ComponentRegistry.ts` | ECS data schema dictionary; autogenerates TS types + WGSL structs.                          | Schema file hashed to regenerate d.ts on change.                                     |
| `UniformBridge.ts`     | Central pub/sub for UniformNodes coming from UI, OSC, MIDI, or GSAP.                        | Provides “topic” channels: `time`, `audioFFT`, `gaze`…                               |
| `GPUAssert.ts`         | WGSL `debugPrintf` & `assert` macros injection in dev mode.                                 | Stripped via Rollup `replace()` !production.                                         |
| `MathNodes.ts`         | Shared TSL helpers: `Noise3D`, `CurlNoise`, `Voronoi`, `FractalBrownianMotion`.             | Imported by solvers & materials alike to avoid code duplication.                     |

**Rule of Thumb:** `core` must stay < 20 kB gzip. Heavy domain code lives in feature packages.

---

### 3 · 🧠 TSL Authoring Playbook

1. **Prefer** `Fn` + `Struct` over ad‑hoc Node chains to improve WGSL readability.
2. **Prefix library symbols** with package name to avoid collisions (`LM_Noise.curl3d`).
3. **Expose metadata** via static export:

```js
export const meta = {
  displayName: 'XPBD Solver',
  group: 'Physics',
  params: [
    { name:'subSteps', type:'int', default:4 },
    { name:'compliance', type:'float', range:[0,1] }
  ]
};
```

GUI generators pick up `meta.params` to auto‑build Tweakpane.

4. **Use** `LoopNode` for unavoidable WGSL loops that trigger Chromium warnings.
5. **Document math** with LaTeX block in JSDoc so Typedoc renders formulas in site.

#### 💡 Boilerplate — Creating a New Compute Solver

```ts
// packages/solvers/Vorticity.ts
import { ComputeNode, Fn, UniformNode, Ref } from '@lm/core';
export const params = { strength: 2.5, dt: 0.016 };
const velTex = Ref.storageTexture('rgba16float');

export default new ComputeNode({
  workgroupSize: 8,
  resources: { velTex },
  code: Fn`
    fn main(x: vec2u) {
      let v = texLoad(velTex, x);
      let curl = curlNoise(v.xy * params.dt) * params.strength;
      texStore(velTex, x, v + curl);
    }`
});
```

Rollup emits d.ts + minified ESM; tests snapshot WGSL.

---

### 4 · ⚛️ R3F / Drei Integration Layer (`packages/react`)

| Hook                      | API                                                         | What it Does                                                                           |
| ------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `useParticleEngine(opts)` | `{ maxParticles, physics:['XPBD','FLIP'], post:['Bloom'] }` | Instantiates engine once; returns imperative handle & Drei `group` ref for transforms. |
| `useField`                | `(FieldClass, params)`                                      | Adds/removes vector field to engine; returns controls.                                 |
| `useEmitter`              | `(EmitterClass, deps)`                                      | React hook that diffs props → emitter params; tears down on unmount.                   |
| `useGSAPBridge`           | `(timeline)`                                                | Syncs GSAP keyframes to UniformBridge topics.                                          |

**Dev HUD Overlay** :

```jsx
<DevHUD fps history engineRef={engine} />
```

Displays GPU ms, particle count, memory bandwidth in corner.

---

### 5 · 🖌️ Material & Post‑FX Pipeline Details

*Based on deep study of **`NODE_MATERIALS.md`** & **`POST_PROCESSING_EFFECTS.md`*

#### 5.1 Material Nodes Library (`packages/materials`)

| Name                           | Renders                     | Features                                                                         |
| ------------------------------ | --------------------------- | -------------------------------------------------------------------------------- |
| `PointsSpriteMaterial`         | Millions of billboards      | Soft‑edge attenuation, per‑particle clip; supports `emotion` palette.            |
| `RibbonTrailMaterial`          | History‑based line strips   | Uses `LineGeometry` of Drei; supports camera‑facing twist.                       |
| `VolumeSignedDistanceMaterial` | Marching‑cubes metaball iso | GPU iso‑surf extraction in compute, shaded in fragment; supports fog absorption. |
| `MeshPhysicalNodeMaterial`     | Surface morph targets       | Adds iridescence, transmission, subsurface from TSL Core.                        |

#### 5.2 Post Stack Implementation

Pipeline builder reads `manifest` JSON (can be mutated at runtime):

```json
[
  { "GTAONode": { "radius": 0.75 } },
  { "BloomNode": { "threshold": 0.85, "smooth": 0.02, "intensity": 1.4 } },
  { "MotionBlurNode": { "shutter": 0.9, "samples": 32 } },
  { "ColorGradingNode": { "lut": "./luts/teal.ktx2" } }
]
```

*Chain Builder Steps:*

1. Parse JSON → dependency DAG.
2. For each node choose: *full* or *half* res; if half res, insert bilinear upsampler.
3. Allocate `GPUTexture` pool keyed by dimensions + format.
4. Reuse ping‑pong attachments among compatible nodes.
5. Insert `RenderPassEncoder` only when MRT layout changes.

Perf logging prints GPU timestamp diff per node in dev console.

---

### 6 · 🔄 Build, Test, Release Workflow in Detail

1. **Dev Cycle**
   - `pnpm dev` → starts Vite, opens playground.
   - HMR updates TSL graphs without full reload (thanks to `vite-plugin-wgsl-hot`).
2. **Pre‑commit Hook** – `husky` runs `pnpm lint && pnpm typecheck && pnpm test:unit`.
3. **CI Job Graph**  (ci.yml)
   - `setup` → checkout, pnpm install, cache.
   - `typecheck` → `tsc -p tsconfig.lib.json`.
   - `unit` → Vitest.
   - `visual` → Playwright screenshot diff (threshold 1px / 3%).
   - `bench` → run `examples/bench.ts` headless (GPU timing) → push results to GH Pages.
   - `bundle‑size` → `rollup --config`, compare gzip results vs budget.
4. **Release‑please Bot**
   - Scans commits, bumps version, opens PR.
   - On merge, publishes `@living-motion/*` packages.
5. **Nightly Canary**
   - Cron triggers doc site build from main; deploys to `canary.living-motion.dev`.

---

### 7 · 🧪 Comprehensive Testing Matrix

| Suite                 | Tool                | Key Metrics                                                       | Notes                                     |
| --------------------- | ------------------- | ----------------------------------------------------------------- | ----------------------------------------- |
| **Unit**              | Vitest              | Fast math correctness, ECS registry ops, hashgrid lookups.        | Runs <200 ms.                             |
| **Shader AST**        | Custom `wgsl‑xform` | Compares generated WGSL vs golden.                                | Catches node graph regressions.           |
| **Visual Regression** | Playwright          | Screenshot diff; GPU dithering tolerant.                          | 20 scenes × 3 DPRs.                       |
| **Perf Bench**        | Browser harness     | Logs FPS, GPU ms, mem; exports CSV + flamegraph.                  | Baseline budgets stored in `/bench/data`. |
| **E2E Interactive**   | Cypress             | Mounts R3F playground, simulates pointer, asserts particle count. | Headless Chrome.                          |

---

### 8 · 🧩 Coding Standards & Lint Setup

- **ESLint** with `@typescript-eslint`, `import‑plugin`, `simple‑import‑sort`.
- **Prettier** enforced (100 col, single‑quotes, no‑semicolon).
- **TSConfig** strictest flags; `exactOptionalPropertyTypes`.
- **Commitlint** conventional.
- **Danger.js** bot comments PR with bundle size diff & TODO tags.

---

### 9 · 📈 Size Budgets & Performance Targets

| Asset                       | Budget                                  | Strategy                                                 |
| --------------------------- | --------------------------------------- | -------------------------------------------------------- |
| Core gzip                   | **< 20 kB**                             | No external deps besides Three.js; aggressive treeshake. |
| Each solver                 | < 5 kB                                  | Shared math imported from `@lm/core`.                    |
| First demo (Hello 250k pts) | 60 fps desktop, 30 fps mid‑range mobile | Half‑res bloom, limit compute to 1 sub‑step on mobile.   |

Continuous benchmark dash updates every commit.

---

### 10 · ➡️ Path to Contribute / Extending the Engine

1. **Fork & clone**; `pnpm i`.
2. `pnpm new:solver boids‑swarm` → Yeoman generator scaffolds module with tests.
3. Implement WGSL; run `pnpm test:unit --filter boids‑swarm`.
4. Document params in MDX demo under `packages/examples/14‑boids`.
5. PR; CI must pass green ✓.
6. Maintainers review node graph + perf; label `feat:` for automatic minor release.

---

### 🔚 Recap

This blueprint defines a *battle‑proven* architecture that:

- Treats **TSL** as first‑class source, compiling both compute & material graphs.
- Provides ESM packages that drop into **React‑Three‑Fiber** or plain Three.js.
- Ships with full CI, visual regression, and size budgets to keep the codebase healthy.

Next up → we’ll mirror this depth in **Document 3 — Integration & Companion Guide** including concrete recipes for Vue, Svelte, OSC, MIDI, AI agents, and Unity WebGPU via emscripten.

