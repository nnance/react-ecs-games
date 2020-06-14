export type WorldOptions = {
  gravity: number;
  bounce: number;
  drag: number;
  terminalVelocity: number;
};

export type World = {
  enabled: boolean;
  options?: WorldOptions;
};

export type WorldAPI = {
  start: () => World;
  stop: () => World;
};

export type WorldState = [World, WorldAPI];

export type CreateWorld = (options?: WorldOptions) => WorldState;
