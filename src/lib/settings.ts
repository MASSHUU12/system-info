import { workspace } from "vscode";

export class Settings {
  /**
   * Get extension refresh rate
   *
   * @static
   * @return {*}
   * @memberof Settings
   */
  static getRefreshRate(): number {
    // Download the current configuration
    const configuration = workspace.getConfiguration("system-info");
    const rate = parseFloat(configuration.get("refreshRate") as string);

    // Check if parsed number is in acceptable range and return it
    return rate < 500 ? 1000 : rate;
  }
}
