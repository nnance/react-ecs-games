export interface Entity {
  id: number;
}

export interface Component {
  id: number;
  entity: number;
}

export interface SystemEntity extends Entity {
  components: Component[];
}

export type System = {
  selector: (entity: SystemEntity) => boolean;
  executor: (entities: SystemEntity) => SystemEntity;
};

export interface WorldOptions {
  gravity: number;
  bounce: number;
  drag: number;
  terminalVelocity: number;
}

export interface World {
  enabled: boolean;
  entities: Entity[];
  components: Component[];
  systems: System[];
  options?: WorldOptions;
}

export interface WorldAPI {
  start: () => World;
  stop: () => World;
}

export type CreateWorld = (
  world: Partial<World>,
  options?: WorldOptions
) => [World, WorldAPI];
