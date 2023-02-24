import { StatusCombined } from "../interfaces/interfaces";
import { ManageItems } from "./manageItems";
import { Settings } from "./settings";

/**
 * Main loop of the extension
 *
 * @export
 * @param {StatusCombined} status
 */
export function updateInfo(status: StatusCombined): void {
  setTimeout(async () => {
    await ManageItems.run(status);
    updateInfo(status);
  }, Settings.getRefreshRate());
}
