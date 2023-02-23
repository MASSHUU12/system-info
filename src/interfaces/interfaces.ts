import { StatusBarAlignment } from "vscode";
import { StatusItem } from "../lib/statusBar";

export interface StatusCombined {
  cpu: StatusItem;
  ram: StatusItem;
  battery: StatusItem;
}

export interface StatusItemOptions {
  alignment?: StatusBarAlignment;
  priority?: number;
  tooltip?: string | undefined;
  command?: string | undefined;
}
