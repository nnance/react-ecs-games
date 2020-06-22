import { Component, Entity, componentFactory } from "../../ecs";

export interface Boundary extends Component {
  width: number;
  height: number;
}

export const isBoundary = (component: Component): component is Boundary => {
  return (component as Boundary).width !== undefined;
};

export const boundaryFactory = (entity: Entity, width = 0, height = 0): Boundary => {
  return { width, height, ...componentFactory(entity) };
};
