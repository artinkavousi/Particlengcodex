export interface ChromaticAberrationOptions {
  offset: number
}

export default class ChromaticAberrationNodePass {
  constructor(public options: ChromaticAberrationOptions) {}
}
