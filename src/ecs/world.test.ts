import {
  createWorld,
  addEntity,
  addComponent,
  execute,
  createEntity,
  componentFactory,
} from "../ecs";

import { locationFactory, velocityFactory, Location, movementSystem } from "./fixtures";

const ball = createEntity();
const location = locationFactory(ball);
const velocity = velocityFactory(ball);

const [world, api] = createWorld({
  systems: [movementSystem],
  entities: [ball],
  components: [location, velocity]
});

test("adding entities to the world", () => {
  const [newWorld, entity] = addEntity(world);
  expect(newWorld.entities.length).toBe(2);
  expect(entity).not.toBeUndefined();
});

test("adding components by entity", () => {
  const component = componentFactory(ball);
  expect(addComponent(world, component).components.length).toBe(3);
});

test("executing systems for components", () => {
  expect((execute(world).components[0] as Location).x).toBe(10);
});

test("starting the world", () => {
  const world = api.start();
  expect(world.enabled).toBeTruthy();
});

test("stopping the world", () => {
  const world = api.stop();
  expect(world.enabled).toBeFalsy();
});
