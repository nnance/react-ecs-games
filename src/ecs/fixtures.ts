import { System, Component, componentFactory, Entity } from ".";

export const VELOCITY = 10;

export interface Location extends Component {
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
  velocityX = VELOCITY,
  velocityY = 0
): Velocity => {
  return { velocityX, velocityY, ...componentFactory(entity) };
};

interface Angle extends Component {
  angle: number;
}

export const angleFactory = (entity: Entity, angle = 0): Angle => {
  return { angle, ...componentFactory(entity) };
};

const isAngle = (component: Component): component is Angle => {
  return (component as Angle).angle !== undefined;
};

export const movementSystem: System = {
  selector: (entity) => {
    const { components } = entity;
    return components.find(isLocation) && components.find(isVelocity)
      ? true
      : false;
  },
  executor: (entity) => {
    const { components } = entity;
    const velocityX = components.find(isVelocity)?.velocityX;

    return {
      ...entity,
      components: components.map((comp) => 
        isLocation(comp) ? { ...comp, x: comp.x + (velocityX || 0) } : comp
      ),
    };
  },
};

export const rotateSystem: System = {
  selector: ({ components }) => (components.find(isAngle) ? true : false),
  executor: ({ components, ...entity }) => {
    return {
      ...entity,
      components: components.map((comp) =>
        isAngle(comp) ? { ...comp, angle: 90 } : comp
      ),
    };
  },
};
