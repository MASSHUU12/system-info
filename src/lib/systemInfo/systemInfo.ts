import { Converter } from "../../helpers/unitConverter";
import { battery } from "systeminformation";
import { CPU } from "./cpu";
import * as os from "os";

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
    return Converter.auto(os.totalmem() - os.freemem());
  }
}
