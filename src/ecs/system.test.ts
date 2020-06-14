import {
  System,
  Component,
  createEntity,
  componentFactory,
  Entity,
} from "../ecs";

interface Location extends Component {
  x: number;
  y: number;
}

const isLocation = (component: Component): component is Location => {
  return (component as Location).x !== undefined;
};

const locationFactory = (entity: Entity, x = 0, y = 0): Location => {
  return { x, y, ...componentFactory(entity) };
};

interface Velocity extends Component {
  velocityX: number;
  velocityY: number;
}

const isVelocity = (component: Component): component is Velocity => {
  return (component as Velocity).velocityX !== undefined;
};

const velocityFactory = (
  entity: Entity,
  velocityX = 0,
  velocityY = 0
): Velocity => {
  return { velocityX, velocityY, ...componentFactory(entity) };
};

const movementSystem: System = {
  selector: (components) => {
    return components.find(isLocation) && components.find(isVelocity)
      ? [
          components.find(isLocation) as Location,
          components.find(isVelocity) as Velocity,
        ]
      : [];
  },
  executor: (components) => {
    return components;
  },
};

test("selecting an entity", () => {
  const ball = createEntity();
  const ballLocation = locationFactory(ball);
  const ballVelocity = velocityFactory(ball);

  const components: Component[] = [ballLocation, ballVelocity];
  expect(movementSystem.selector(components).length).toBe(2);
});
