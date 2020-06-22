import { System } from "../../ecs";
import { isLocation } from "../components/location";
import { isVelocity, Velocity } from "../components/velocity";

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

    const checkMaxVelocity = (
        pos: number,
        terminalVelocity: number
      ): number => {
        return pos > terminalVelocity
          ? terminalVelocity
          : pos < -terminalVelocity
          ? -terminalVelocity
          : pos;
      };
  
      const getYVelocity = ({ velocityY, terminal }: Velocity): number =>
        checkMaxVelocity(velocityY, terminal);
  
      const getXVelocity = ({ velocityX, terminal }: Velocity): number =>
        checkMaxVelocity(velocityX, terminal);
  
      return vel
      ? {
          ...entity,
          components: components.map((comp) =>
            isLocation(comp)
              ? {
                  ...comp,
                  x: comp.x + (getXVelocity(vel) || 0),
                  y: comp.y + (getYVelocity(vel) || 0),
                }
              : comp
          ),
        }
      : entity;
  },
};
