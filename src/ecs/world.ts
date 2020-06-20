import { Entity, createEntity } from "./entity";
import { Component, getEntitiesWithComponents } from "./component";
import { System, executeSystemForEntities } from "./system";

export type WorldOptions = {
  gravity: number;
  bounce: number;
  drag: number;
  terminalVelocity: number;
};

export type World = {
  enabled: boolean;
  entities: Entity[];
  components: Component[];
  systems: System[];
  options?: WorldOptions;
};

export type WorldAPI = {
  start: () => World;
  stop: () => World;
};

export type CreateWorld = (world: Partial<World>, options?: WorldOptions) => [World, WorldAPI];

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
  const components = world.systems.reduce<Component[]>((prev, system) => {
    const entities = getEntitiesWithComponents(world.entities, prev);
    const updates = executeSystemForEntities(system, entities);
    return updates.reduce((prev, entity) => prev.concat(...entity), []);
  }, world.components);
  return {
    ...world,
    components,
  };
};
