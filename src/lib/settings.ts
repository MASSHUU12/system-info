import { StatusBarAlignment, workspace, WorkspaceConfiguration } from "vscode";
import { CPUUsageType } from "../types/types";

export class Settings {
  /**
   * Get user extension configuration
   *
   * @private
   * @static
   * @return {*}  {WorkspaceConfiguration}
   * @memberof Settings
   */
  private static getConfiguration(): WorkspaceConfiguration {
    return workspace.getConfiguration("system-info");
  }

  /**
   * Get extension refresh rate
   *
   * @static
   * @return {*}
   * @memberof Settings
   */
  static getRefreshRate(): number {
    const rate = parseFloat(
      Settings.getConfiguration().get("refreshRate") as string
    );

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
    const location = Settings.getConfiguration().get("location");

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
    return Settings.getConfiguration().get("hideProcessorUsage") as boolean;
  }

  /**
   * Get information about whether RAM usage should be hidden
   *
   * @static
   * @return {*}  {boolean}
   * @memberof Settings
   */
  static getHideMemoryUsage(): boolean {
    return Settings.getConfiguration().get("hideMemoryUsage") as boolean;
  }

  /**
   * Get information about whether background should be colored
   *
   * @static
   * @return {*}  {boolean}
   * @memberof Settings
   */
  static getColoredBackground(): boolean {
    return Settings.getConfiguration().get("coloredBackground") as boolean;
  }

  /**
   * Get information about when background should have warning color
   *
   * @static
   * @return {*}  {number}
   * @memberof Settings
   */
  static getWarningBGPercent(): number {
    const percent = parseInt(
      Settings.getConfiguration().get("warningBackgroundPercent") as string
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
    const percent = parseInt(
      Settings.getConfiguration().get("errorBackgroundPercent") as string
    );

    return Number.isNaN(percent) ? 90 : percent;
  }

  /**
   * Display memory usage as a percentage
   *
   * @static
   * @return {*}  {boolean}
   * @memberof Settings
   */
  static getMemoryUsageAsPercentage(): boolean {
    return Settings.getConfiguration().get(
      "memoryUsageAsPercentage"
    ) as boolean;
  }

  /**
   *
   *
   * @static
   * @param {boolean} newSetting
   * @memberof Settings
   */
  static setMemoryUsageAsPercentage(newSetting: boolean): void {
    Settings.getConfiguration().update(
      "memoryUsageAsPercentage",
      newSetting,
      true
    );
  }

  /**
   * Get information about whether battery status should be hidden
   *
   * @static
   * @return {*}  {boolean}
   * @memberof Settings
   */
  static getHideBatteryStatus(): boolean {
    return Settings.getConfiguration().get("hideBatteryStatus") as boolean;
  }

  /**
   *
   *
   * @static
   * @param {boolean} newSetting
   * @memberof Settings
   */
  static setHideBatteryStatus(newSetting: boolean): void {
    Settings.getConfiguration().update("hideBatteryStatus", newSetting, true);
  }

  /**
   * Determines whether CPU usage should be displayed for the entire system or for the current process
   *
   * @static
   * @return {*}  {CPUUsageType}
   * @memberof Settings
   */
  static getToggleProcessorUsageType(): CPUUsageType {
    return Settings.getConfiguration().get(
      "processorUsageType"
    ) as CPUUsageType;
  }

  /**
   *
   *
   * @static
   * @param {CPUUsageType} newSetting
   * @memberof Settings
   */
  static setToggleProcessorUsageType(newSetting: CPUUsageType): void {
    Settings.getConfiguration().update("processorUsageType", newSetting, true);
  }
}
