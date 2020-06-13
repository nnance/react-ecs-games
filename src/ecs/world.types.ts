export type World = {
  enabled: boolean;
  gravity?: number;
  bounce?: number;
  drag?: number;
  terminalVelocity?: number;
};

export type WorldAPI = {
  start: () => World;
  stop: () => World;
};

export type WorldState = [World, WorldAPI];

export type CreateWorld = (world?: World) => WorldState;
