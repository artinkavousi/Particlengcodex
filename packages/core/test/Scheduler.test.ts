import { describe, it, expect, vi } from 'vitest';
import Scheduler from '../src/Scheduler.js';

describe('Scheduler', () => {
  it('runs steps with delta time', () => {
    const scheduler = new Scheduler();
    const fn = vi.fn();
    scheduler.add(fn);
    scheduler.update();
    expect(fn).toHaveBeenCalled();
    const dt = fn.mock.calls[0][0];
    expect(typeof dt).toBe('number');
  });
});
