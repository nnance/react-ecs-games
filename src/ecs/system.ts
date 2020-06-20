import { System, SystemEntity } from "./types";

export const selectEntitiesBySystem = (
  system: System,
  entities: SystemEntity[]
): SystemEntity[] => {
  return entities.reduce<SystemEntity[]>(
    (prev, entity) => (system.selector(entity) ? prev.concat([entity]) : prev),
    []
  );
};

export const executeSystemForEntities = (
  system: System,
  entities: SystemEntity[]
): SystemEntity[] => entities.map(system.executor);
