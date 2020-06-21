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

const VELOCITY = 10;

const ball = createEntity();
const wall = createEntity();

const components: Component[] = [
  locationFactory(ball),
  velocityFactory(ball, VELOCITY),
  locationFactory(wall),
];

const entities = [ball, wall];

test("moving an entity", () => {
  const entitiesComponents = getEntitiesWithComponents(entities, components);
  const selected = selectEntitiesBySystem(movementSystem, entitiesComponents);
  const results = executeSystemForEntities(movementSystem, selected)[0];

  expect(selected.length).toBe(1);
  expect((results.components[0] as Location).x).toBe(VELOCITY);
});

test("applying gravity and friction to an entity", () => {
  const force = components.concat(gravityFactory(ball));

  const entitiesComponents = getEntitiesWithComponents(entities, force);
  const selected = selectEntitiesBySystem(forceSystem, entitiesComponents);
  const results = executeSystemForEntities(forceSystem, selected)[0];

  expect(selected.length).toBe(1);
  expect((results.components[0] as Location).x).toBeLessThan(VELOCITY);
});
