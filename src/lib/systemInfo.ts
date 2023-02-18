import * as si from "systeminformation";
import { Converter } from "../helpers/unitConverter";

export class SystemInfo {
  /**
   * Get current CPU speed (in GHz)
   *
   * @static
   * @return {*}  {Promise<string>}
   * @memberof SystemInfo
   */
  static async cpuCurrentSpeed(): Promise<string> {
    return await si.cpuCurrentSpeed().then((data): string => {
      return `${data.avg} GHz`;
    });
  }

  /**
   * Get CPU max speed (in GHz)
   *
   * @static
   * @return {*}  {Promise<string>}
   * @memberof SystemInfo
   */
  static async cpuMaxSpeed(): Promise<string> {
    return await si.cpu().then((data) => {
      return `${data.speedMax} GHz`;
    });
  }

  static async cpuCombinedData(): Promise<string> {
    const current = await this.cpuCurrentSpeed();
    const max = await this.cpuMaxSpeed();

    return `${current} / ${max}`;
  }

  /**
   * Get current CPU load (in %)
   *
   * @static
   * @return {*}  {Promise<string>}
   * @memberof SystemInfo
   */
  static async cpuCurrentLoad(): Promise<string> {
    return si.currentLoad().then((data) => {
      return `CPU: ${data.currentLoad.toFixed(2)}%`;
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
