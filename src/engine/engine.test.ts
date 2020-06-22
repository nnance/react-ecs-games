import {
  createEntity,
  Component,
  selectEntitiesBySystem,
  executeSystemForEntities,
  getEntitiesWithComponents,
} from "../ecs";
import { locationFactory, velocityFactory, Location, movementSystem } from ".";
import { forceSystem } from "./systems/force";
import { gravityFactory } from "./components/gravity";
import { Velocity } from "./components/velocity";

const VELOCITY = 10;
const MAX_VELOCITY = 10;

const ball = createEntity();
const bounce = createEntity();
const wall = createEntity();

const components: Component[] = [
  locationFactory(ball),
  velocityFactory(ball, VELOCITY, VELOCITY, MAX_VELOCITY),
  locationFactory(bounce),
  velocityFactory(bounce, VELOCITY, VELOCITY, MAX_VELOCITY),
  gravityFactory(bounce),
  locationFactory(wall),
];

const entities = [ball, bounce, wall];

const entitiesComponents = getEntitiesWithComponents(entities, components);

test("moving an entity", () => {
  const selected = selectEntitiesBySystem(movementSystem, entitiesComponents);
  const results = executeSystemForEntities(movementSystem, selected)[0];

  expect(selected.length).toBe(2);
  expect((results.components[0] as Location).x).toBe(VELOCITY);
});

test("limiting max velocity", () => {
  const selected = selectEntitiesBySystem(movementSystem, entitiesComponents);
  (selected[0].components[1] as Velocity).velocityX = 40;
  const results = executeSystemForEntities(movementSystem, selected)[0];

  expect((results.components[0] as Location).x).toBe(MAX_VELOCITY);
});

test("applying gravity and friction to an entity", () => {
  const selected = selectEntitiesBySystem(forceSystem, entitiesComponents);
  const results = executeSystemForEntities(forceSystem, selected)[0];

  expect(selected.length).toBe(1);
  expect((results.components[0] as Location).x).toBeLessThan(VELOCITY);
});
