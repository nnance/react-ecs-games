import { createEntity, Component, selectEntitiesBySystem, executeSystemForEntities } from "../ecs";
import { locationFactory, velocityFactory, movementSystem, angleFactory, Location } from "./fixtures";
import { getEntitiesWithComponents } from "./component";

const ball = createEntity();
const wall = createEntity();

const ballVelocity = velocityFactory(ball);
const ballAngle = angleFactory(ball);

const components: Component[] = [
  locationFactory(ball),
  ballVelocity,
  ballAngle,
  locationFactory(wall)
];

const entities = [ball, wall];

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
