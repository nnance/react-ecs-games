import { Component, Entity, componentFactory } from "../../ecs";

export interface Location extends Component {
  x: number;
  y: number;
}

export const isLocation = (component: Component): component is Location => {
  return (component as Location).x !== undefined;
};

export const locationFactory = (entity: Entity, x = 0, y = 0): Location => {
  return { x, y, ...componentFactory(entity) };
};
