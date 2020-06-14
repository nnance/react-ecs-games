import { Entity } from "./entity";

export interface Component {
    id: number;
    entity: number;
  };
  
const MAX_NUM = 100000;

export const componentFactory = (entity: Entity): Component => ({
  id: Math.floor(Math.random() * MAX_NUM),
  entity: entity.id,
});
