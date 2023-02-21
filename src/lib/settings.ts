import { StatusBarAlignment, workspace } from "vscode";

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
    // ? This line must repeat in each method so that the current settings are always retrieved.
    const configuration = workspace.getConfiguration("system-info");
    const rate = parseFloat(configuration.get("refreshRate") as string);

    // Check if parsed number is in acceptable range and return it
    return rate < 500 ? 1000 : rate;
  }

  /**
   * Get location where the information will be displayed
   *
   * @static
   * @return {*}  {StatusLocation}
   * @memberof Settings
   */
  static getLocation(): StatusBarAlignment {
    // Download the current configuration
    const configuration = workspace.getConfiguration("system-info");
    const location = configuration.get("location");

    return location === "left"
      ? StatusBarAlignment.Left
      : StatusBarAlignment.Right;
  }

  /**
   * Get information about whether CPU usage should be hidden
   *
   * @static
   * @return {*}  {boolean}
   * @memberof Settings
   */
  static getHideProcessorUsage(): boolean {
    // Download the current configuration
    const configuration = workspace.getConfiguration("system-info");
    const usage = configuration.get("hideProcessorUsage") as boolean;

    return usage;
  }

  /**
   * Get information about whether RAM usage should be hidden
   *
   * @static
   * @return {*}  {boolean}
   * @memberof Settings
   */
  static getHideMemoryUsage(): boolean {
    // Download the current configuration
    const configuration = workspace.getConfiguration("system-info");
    const usage = configuration.get("hideMemoryUsage") as boolean;

    return usage;
  }
}
