import { System, Component, componentFactory, Entity } from ".";

interface Location extends Component {
  x: number;
  y: number;
}

const isLocation = (component: Component): component is Location => {
  return (component as Location).x !== undefined;
};

export const locationFactory = (entity: Entity, x = 0, y = 0): Location => {
  return { x, y, ...componentFactory(entity) };
};

interface Velocity extends Component {
  velocityX: number;
  velocityY: number;
}

const isVelocity = (component: Component): component is Velocity => {
  return (component as Velocity).velocityX !== undefined;
};

export const velocityFactory = (
  entity: Entity,
  velocityX = 0,
  velocityY = 0
): Velocity => {
  return { velocityX, velocityY, ...componentFactory(entity) };
};

interface Angle extends Component { angle: number };

export const angleFactory = (
  entity: Entity,
  angle = 0
): Angle => {
  return { angle, ...componentFactory(entity) };
};

export const movementSystem: System = {
  selector: (components) => {
    return components.find(isLocation) && components.find(isVelocity)
      ? true
      : false;
  },
  executor: (components) => {
    return components.map((component) => {
      return isLocation(component)
        ? { ...component }
        : isVelocity(component)
        ? { ...component }
        : component;
    });
  },
};
