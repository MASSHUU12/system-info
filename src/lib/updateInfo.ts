import { StatusCombined } from "../interfaces/statusCombined";
import { displayData } from "./displayData";
import { Settings } from "./settings";

export function updateInfo(status: StatusCombined): void {
  setTimeout(() => {
    displayData(status);
    updateInfo(status);
  }, Settings.getRefreshRate());
}
