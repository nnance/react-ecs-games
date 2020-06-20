import {
  createWorld,
  addEntity,
  addComponent,
  execute,
  createEntity,
  componentFactory,
} from "../ecs";

import { locationFactory, velocityFactory, Location, movementSystem, rotateSystem, angleFactory, VELOCITY } from "./fixtures";

const ball = createEntity();
const wall = createEntity();

const entities = [ball, wall];

const components = [
  locationFactory(ball), 
  velocityFactory(ball),
  locationFactory(wall),
  angleFactory(wall),
];

const [world, api] = createWorld({
  systems: [movementSystem, rotateSystem],
  entities,
  components
});

test("adding entities to the world", () => {
  const [newWorld, entity] = addEntity(world);
  const results = entities.length + 1;

  expect(newWorld.entities.length).toBe(results);
  expect(entity).not.toBeUndefined();
});

test("adding components by entity", () => {
  const component = componentFactory(ball);
  const result = components.length + 1;

  expect(addComponent(world, component).components.length).toBe(result);
});

test("executing systems for components", () => {
  expect((execute(world).components[0] as Location).x).toBe(VELOCITY);
});

test("starting the world", () => {
  const world = api.start();
  expect(world.enabled).toBeTruthy();
});

test("stopping the world", () => {
  const world = api.stop();
  expect(world.enabled).toBeFalsy();
});
