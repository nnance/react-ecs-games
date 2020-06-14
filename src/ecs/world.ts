import { CreateWorld, World, WorldAPI } from "./world.types";

type Setter = (world: World) => World;

const worldDefaults: World = {
  enabled: false,
};

const start: Setter = (world) => ({
  ...world,
  enabled: true,
});

const stop: Setter = (world) => ({
  ...world,
  enabled: false,
});

export const createWorld: CreateWorld = (options) => {
  let state: World = {
      ...worldDefaults,
      options,
  };

  const setState = (setter: Setter): World => (state = setter(state));

  const api: WorldAPI = {
    start: () => setState(start),
    stop: () => setState(stop),
  };

  return [state, api];
};
