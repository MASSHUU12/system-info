import { StatusItem } from "../lib/statusBar";

export interface StatusCombined {
  cpu: StatusItem;
  ram: StatusItem;
  battery: StatusItem;
}
