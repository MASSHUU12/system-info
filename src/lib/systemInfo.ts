import { Converter } from "../helpers/unitConverter";
import { currentLoad, battery, mem } from "systeminformation";
import * as os from "os";

export class SystemInfo {
  /**
   * Get the current CPU load of this process in percent
   *
   * @static
   * @return {*}  {Promise<string>}
   * @memberof SystemInfo
   */
  static async cpuCurrentProcessLoad(): Promise<string> {
    return currentLoad().then((data) => {
      return `CPU: ${data.currentLoad.toFixed(2)}%`;
    });
  }

  /**
   * Get the current CPU system load in percent
   *
   * @static
   * @return {*}  {Promise<string>}
   * @memberof SystemInfo
   */
  static cpuCurrentSystemLoad(): string {
    return "CPU: ///";
  }

  /**
   * Get charging level in percent
   *
   * ! Huge usage of CPU
   *
   * @static
   * @return {*}  {(Promise<string | undefined>)}
   * @memberof SystemInfo
   */
  static async batteryPercent(): Promise<string | undefined> {
    const hasBattery = (await battery()).hasBattery;

    return hasBattery ? `${(await battery()).percent}%` : undefined;
  }

  /**
   * Get RAM usage
   *
   * @static
   * @return {*}  {Promise<string>}
   * @memberof SystemInfo
   */
  static async memoryActive(): Promise<string> {
    return `RAM: ${Converter.auto((await mem()).active)}`;
  }
}
