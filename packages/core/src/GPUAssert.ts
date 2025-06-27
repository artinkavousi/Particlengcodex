export function gpuAssert(condition: boolean, message: string) {
  if (!condition && process.env.NODE_ENV !== 'production') {
    console.warn('GPUAssert:', message)
  }
}
