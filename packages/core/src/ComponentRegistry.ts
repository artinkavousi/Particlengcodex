export interface ComponentSchema {
  name: string
  layout: Record<string, string>
}

export default class ComponentRegistry {
  private schemas: Map<string, ComponentSchema> = new Map()

  register(schema: ComponentSchema) {
    this.schemas.set(schema.name, schema)
  }

  get(name: string): ComponentSchema | undefined {
    return this.schemas.get(name)
  }
}
