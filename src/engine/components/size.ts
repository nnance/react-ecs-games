import { Component, Entity, componentFactory } from "../../ecs";

export interface Size extends Component {
  radius: number;
}

export const isSize = (component: Component): component is Size => {
  return (component as Size).radius !== undefined;
};

export const sizeFactory = (entity: Entity, radius = 0): Size => {
  return { radius, ...componentFactory(entity) };
};
