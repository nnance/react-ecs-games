import { Component } from "./component";

export type System = {
  selector: (components: Component[]) => Component[];
  executor: (components: Component[][]) => object[];
};
