import { createWorld } from "./world";

test("starting the world", () => {
  const [, api] = createWorld();
  const world = api.start();
  expect(world.enabled).toBeTruthy();
});

test("stopping the world", () => {
  const [, api] = createWorld({ enabled: true });
  const world = api.stop();
  expect(world.enabled).toBeFalsy();
});
