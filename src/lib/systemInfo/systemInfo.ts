import { Converter } from "../../helpers/unitConverter";
import { battery, mem } from "systeminformation";
import { CPU } from "./cpu";

export class SystemInfo extends CPU {
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
    return Converter.auto((await mem()).active);
  }
}
