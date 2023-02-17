import * as si from "systeminformation";

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
      return `CPU: ${data.currentLoad.toPrecision(2)}%`;
    });
  }
}
