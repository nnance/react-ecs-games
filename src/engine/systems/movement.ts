import { System } from "../../ecs";
import { isLocation } from "../components/location";
import { isVelocity } from "../components/velocity";

export const movementSystem: System = {
  selector: (entity) => {
    const { components } = entity;
    return components.find(isLocation) && components.find(isVelocity)
      ? true
      : false;
  },
  executor: (entity) => {
    const { components } = entity;
    const vel = components.find(isVelocity);

    return vel
      ? {
          ...entity,
          components: components.map((comp) =>
            isLocation(comp)
              ? {
                  ...comp,
                  x: comp.x + (vel.velocityX || 0),
                  y: comp.y + (vel.velocityY || 0),
                }
              : comp
          ),
        }
      : entity;
  },
};
