export default class UniformBridge {
  private topics: Map<string, any> = new Map();

  setTopic<T>(name: string, value: T) {
    this.topics.set(name, value);
  }

  getTopic<T>(name: string): T | undefined {
    return this.topics.get(name) as T | undefined;
  }
}
