import { Component, Entity, componentFactory } from "../../ecs";

export interface Velocity extends Component {
  velocityX: number;
  velocityY: number;
  terminal: number;
}

export const isVelocity = (component: Component): component is Velocity => {
  return (component as Velocity).velocityX !== undefined;
};

export const velocityFactory = (
  entity: Entity,
  velocityX = 0,
  velocityY = 0,
  terminal = 20
): Velocity => {
  return { velocityX, velocityY, terminal, ...componentFactory(entity) };
};
