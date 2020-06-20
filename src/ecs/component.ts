import { Entity, Component, SystemEntity } from "./types";

const MAX_NUM = 100000;

export const componentFactory = (entity: Entity): Component => ({
  id: Math.floor(Math.random() * MAX_NUM),
  entity: entity.id,
});

export const getComponentsByEntity = (
  entity: Entity,
  components: Component[]
): SystemEntity => {
  return {
    ...entity,
    components: components.filter((comp) => comp.entity === entity.id),
  };
};

export const getEntitiesWithComponents = (
  entities: Entity[],
  components: Component[]
): SystemEntity[] => {
  return entities.map((entity) => getComponentsByEntity(entity, components));
};
