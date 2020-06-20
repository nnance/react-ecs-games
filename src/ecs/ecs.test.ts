import {
  createWorld,
  addEntity,
  addComponent,
  execute,
  createEntity,
  componentFactory,
  getComponentsByEntity,
  getEntitiesWithComponents,
  selectEntitiesBySystem,
  executeSystemForEntities,
} from ".";

import {
  locationFactory,
  velocityFactory,
  Location,
  movementSystem,
  rotateSystem,
  angleFactory,
  VELOCITY,
} from "./fixtures";

const ball = createEntity();
const wall = createEntity();

const entities = [ball, wall];

const ballLocation = locationFactory(ball);
const ballVelocity = velocityFactory(ball);
const ballAngle = angleFactory(ball);

const components = [
  ballLocation,
  ballVelocity,
  locationFactory(wall),
  ballAngle,
];

const [world, api] = createWorld({
  systems: [movementSystem, rotateSystem],
  entities,
  components,
});

/**
 * Component Tests
 */

test("get components by entity", () => {
  expect(getComponentsByEntity(ball, components).components.length).toBe(3);
  expect(getComponentsByEntity(wall, components).components.length).toBe(1);
});

test("get entities with components", () => {
  expect(getEntitiesWithComponents(entities, components).length).toBe(2);
});

/**
 * System Tests
 */

test("selecting an entity", () => {
  const entitiesComponents = getEntitiesWithComponents(entities, components);
  expect(selectEntitiesBySystem(movementSystem, entitiesComponents).length).toBe(1);
});

test("updating an entity", () => {
  const entitiesComponents = getEntitiesWithComponents(entities, components);
  const selected = selectEntitiesBySystem(movementSystem, entitiesComponents);
  const ball = executeSystemForEntities(movementSystem, selected)[0];
  expect((ball.components[0] as Location).x).toBe(10);
  expect(ball.components[1]).toBe(ballVelocity);
  expect(ball.components[2]).toBe(ballAngle);
});

/**
 * World Tests
 */

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

test("executing systems loop", () => {
  expect((execute(world).components[0] as Location).x).toBe(VELOCITY);
});

test("executing multiple systems loop", () => {
  const next = execute(world);
  expect((execute(next).components[0] as Location).x).toBe(VELOCITY * 2);
});

test("starting the world", () => {
  const world = api.start();
  expect(world.enabled).toBeTruthy();
});

test("stopping the world", () => {
  const world = api.stop();
  expect(world.enabled).toBeFalsy();
});
