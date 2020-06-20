import {
  createEntity,
  Component,
  selectEntitiesBySystem,
  executeSystemForEntities,
  getEntitiesWithComponents,
} from "../ecs";
import { locationFactory, velocityFactory, Location, movementSystem } from ".";

const VELOCITY = 10;

const ball = createEntity();
const wall = createEntity();

const components: Component[] = [
  locationFactory(ball),
  velocityFactory(ball, VELOCITY),
  locationFactory(wall),
];

const entities = [ball, wall];

test("selecting an entity", () => {
  const entitiesComponents = getEntitiesWithComponents(entities, components);
  const selected = selectEntitiesBySystem(movementSystem, entitiesComponents);
  expect(selected.length).toBe(1);
});

test("updating an entity", () => {
  const entitiesComponents = getEntitiesWithComponents(entities, components);
  const selected = selectEntitiesBySystem(movementSystem, entitiesComponents);
  const ball = executeSystemForEntities(movementSystem, selected)[0];
  expect((ball.components[0] as Location).x).toBe(VELOCITY);
});
