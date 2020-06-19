import { Entity } from "./entity";

export interface Component {
  id: number;
  entity: number;
}

const MAX_NUM = 100000;

export const componentFactory = (entity: Entity): Component => ({
  id: Math.floor(Math.random() * MAX_NUM),
  entity: entity.id,
});

export const getComponentsByEntity = (
  entity: Entity,
  components: Component[]
): Component[] => {
  return components.filter((comp) => comp.entity === entity.id);
};

export const getEntitiesWithComponents = (
  entities: Entity[],
  components: Component[]
): Component[][] => {
  return entities.map((entity) => getComponentsByEntity(entity, components));
};
