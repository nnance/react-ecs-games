import { World, CreateWorld, Entity, Component, WorldAPI, SystemEntity } from "./types";
import { createEntity } from "./entity";
import { getEntitiesWithComponents } from "./component";
import { executeSystemForEntities } from "./system";

type Setter = (world: World) => World;

const worldDefaults: World = {
  enabled: false,
  entities: [],
  components: [],
  systems: [],
};

const start: Setter = (world) => ({
  ...world,
  enabled: true,
});

const stop: Setter = (world) => ({
  ...world,
  enabled: false,
});

export const createWorld: CreateWorld = (world, options) => {
  let state: World = {
    ...worldDefaults,
    ...world,
    options,
  };

  const setState = (setter: Setter): World => (state = setter(state));

  const api: WorldAPI = {
    start: () => setState(start),
    stop: () => setState(stop),
  };

  return [state, api];
};

export const addEntity = (world: World): [World, Entity] => {
  const entity = createEntity();
  const update = {
    ...world,
    entities: world.entities.concat(entity),
  };
  return [update, entity];
};

export const addComponent = (world: World, component: Component): World => {
  return {
    ...world,
    components: world.components.concat(component),
  };
};

export const execute = (world: World): World => {
  const entities = getEntitiesWithComponents(world.entities, world.components);

  const components = world.systems.reduce<SystemEntity[]>((prev, system) => {
    return executeSystemForEntities(system, prev);
  }, entities);

  return {
    ...world,
    components: components.reduce<Component[]>((prev, entity) => prev.concat(entity.components), []),
  };
};
