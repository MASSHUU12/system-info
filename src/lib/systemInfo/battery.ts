import { battery } from "systeminformation";

export class Battery {
  /**
   * Get charging level in percent
   *
   * Returns `undefined` when there is no battery
   *
   * **Huge usage of CPU**
   *
   * @static
   * @return {*}  {(Promise<number | undefined>)}
   * @memberof Battery
   */
  static async getPercent(): Promise<number | undefined> {
    const batteryInfo = await battery();

    return batteryInfo.hasBattery ? batteryInfo.percent : undefined;
  }
}
