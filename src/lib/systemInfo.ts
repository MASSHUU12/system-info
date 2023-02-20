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
   * Get the current CPU usage
   *
   * @static
   * @param {(percentage: string) => any} callback
   * @memberof SystemInfo
   */
  static cpuUsage(callback: (percentage: string) => any): void {
    let stats1 = SystemInfo.cpuInfo();
    let startIdle = stats1.idle;
    let startTotal = stats1.total;

    setTimeout(function () {
      let stats2 = SystemInfo.cpuInfo();
      let endIdle = stats2.idle;
      let endTotal = stats2.total;

      let idle = endIdle - startIdle;
      let total = endTotal - startTotal;
      let percentage = ((1 - idle / total) * 100).toFixed(2);

      callback(percentage);
    }, 1000);
  }

  static cpuInfo() {
    const cpus = os.cpus();

    let user = 0;
    let nice = 0;
    let sys = 0;
    let idle = 0;
    let irq = 0;
    let total = 0;

    for (let cpu in cpus) {
      user += cpus[cpu].times.user;
      nice += cpus[cpu].times.nice;
      sys += cpus[cpu].times.sys;
      irq += cpus[cpu].times.irq;
      idle += cpus[cpu].times.idle;
    }
    total = user + nice + sys + idle + irq;

    return {
      idle: idle,
      total: total,
    };
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
