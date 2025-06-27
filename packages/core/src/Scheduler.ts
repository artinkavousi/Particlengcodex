export type Step = (dt: number) => void;

export default class Scheduler {
  private steps: Step[] = [];
  private lastTime = performance.now();

  add(step: Step) {
    this.steps.push(step);
  }

  remove(step: Step) {
    const idx = this.steps.indexOf(step);
    if (idx !== -1) {
      this.steps.splice(idx, 1);
    }
  }

  update() {
    const now = performance.now();
    const dt = (now - this.lastTime) / 1000;
    this.lastTime = now;
    for (const step of this.steps) {
      step(dt);
    }
  }
}
