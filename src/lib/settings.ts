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

    return configuration.get("hideProcessorUsage") as boolean;
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

    return configuration.get("hideMemoryUsage") as boolean;
  }

  /**
   * Get information about whether background should be colored
   *
   * @static
   * @return {*}  {boolean}
   * @memberof Settings
   */
  static getColoredBackground(): boolean {
    // Download the current configuration
    const configuration = workspace.getConfiguration("system-info");

    return configuration.get("coloredBackground") as boolean;
  }

  /**
   * Get information about when background should have warning color
   *
   * @static
   * @return {*}  {number}
   * @memberof Settings
   */
  static getWarningBGPercent(): number {
    // Download the current configuration
    const configuration = workspace.getConfiguration("system-info");
    const percent = parseInt(
      configuration.get("warningBackgroundPercent") as string
    );

    return Number.isNaN(percent) ? 75 : percent;
  }

  /**
   * Get information about when background should have error color
   *
   * @static
   * @return {*}  {number}
   * @memberof Settings
   */
  static getErrorBGPercent(): number {
    // Download the current configuration
    const configuration = workspace.getConfiguration("system-info");
    const percent = parseInt(
      configuration.get("errorBackgroundPercent") as string
    );

    return Number.isNaN(percent) ? 90 : percent;
  }
}
