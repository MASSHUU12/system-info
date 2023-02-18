import { StatusItem } from "../lib/statusBar";

export interface StatusCombined {
  cpu: StatusItem;
  gpu: StatusItem;
  ram: StatusItem;
  battery: StatusItem;
}
