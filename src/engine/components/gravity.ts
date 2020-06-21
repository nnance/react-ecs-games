import { Component, Entity, componentFactory } from "../../ecs";

export interface Gravity extends Component {
  gravity: number;
  drag: number;
}

export const isGravity = (component: Component): component is Gravity => {
  return (component as Gravity).gravity !== undefined;
};

export const gravityFactory = (entity: Entity, gravity = 0.25, drag = 0.998): Gravity => {
  return { gravity, drag, ...componentFactory(entity) };
};
