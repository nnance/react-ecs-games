import { System } from "../../ecs";
import { isGravity } from "../components/gravity";
import { isVelocity } from "../components/velocity";

export const forceSystem: System = {
  selector: (entity) => {
    const { components } = entity;
    return components.find(isGravity) ? true : false;
  },
  executor: (entity) => {
    const { components } = entity;
    const force = components.find(isGravity);

    return force
      ? {
          ...entity,
          components: components.map((comp) =>
            isVelocity(comp)
              ? {
                  ...comp,
                  velocityY: (comp.velocityY + force.gravity) * force.drag,
                  velocityX: comp.velocityX * force.drag,
                }
              : comp
          ),
        }
      : entity;
  },
};
