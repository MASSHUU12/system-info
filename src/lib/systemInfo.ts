import * as si from "systeminformation";
import { Converter } from "../helpers/unitConverter";
import os = require("os");

export class SystemInfo {
  /**
   * Get the current CPU load of this process in percent
   *
   * @static
   * @return {*}  {Promise<string>}
   * @memberof SystemInfo
   */
  static async cpuCurrentProcessLoad(): Promise<string> {
    return si.currentLoad().then((data) => {
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
  static async cpuCurrentSystemLoad(): Promise<string> {
    return si.currentLoad().then((data) => {
      return `CPU: ${data.cpus[0]["load"].toFixed(2)}%`;
    });
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
    const hasBattery = (await si.battery()).hasBattery;

    return hasBattery ? `${(await si.battery()).percent}%` : undefined;
  }

  /**
   * Get RAM usage
   *
   * @static
   * @return {*}  {Promise<string>}
   * @memberof SystemInfo
   */
  static async memoryActive(): Promise<string> {
    return `RAM: ${Converter.auto((await si.mem()).active)}`;
  }
}
