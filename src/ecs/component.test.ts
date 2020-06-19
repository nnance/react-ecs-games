import { createEntity } from "./entity";
import { locationFactory, velocityFactory } from "./fixtures";
import {
  Component,
  getComponentsByEntity,
  getEntitiesWithComponents,
} from "./component";

const ball = createEntity();
const wall = createEntity();

const components: Component[] = [
  locationFactory(ball),
  velocityFactory(ball),
  locationFactory(wall),
];

const entities = [ball, wall];

test("get components by entity", () => {
  expect(getComponentsByEntity(ball, components).length).toBe(2);
  expect(getComponentsByEntity(wall, components).length).toBe(1);
});

test("get entities with components", () => {
  expect(getEntitiesWithComponents(entities, components).length).toBe(2);
});
