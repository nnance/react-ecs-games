import { Component } from "./component";

export type System = {
  selector: (components: Component[]) => boolean;
  executor: (components: Component[]) => Component[];
};

export const selectEntitiesBySystem = (
  system: System,
  entities: Component[][]
): Component[][] => {
  return entities.reduce<Component[][]>(
    (prev, entity) => (system.selector(entity) ? prev.concat([entity]) : prev),
    []
  );
};

export const executeSystemForEntities = (
  system: System,
  entities: Component[][]
): Component[][] => {
  return entities.map((entity) => {
    return system.executor(entity);
  });
};
