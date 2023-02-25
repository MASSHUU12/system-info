import * as os from "os";
import { Converter } from "../../helpers/unitConverter";

export class RAM {
  /**
   * Get RAM usage
   *
   * @static
   * @return {*}  {Promise<number>}
   * @memberof SystemInfo
   */
  static memoryActive(): string {
    return Converter.auto(os.totalmem() - os.freemem());
  }

  /**
   * Get current RAM usage as percentages
   *
   * @static
   * @return {*}  {number}
   * @memberof RAM
   */
  static getRAMUsageAsPercent(): number {
    const usage = os.totalmem() - os.freemem();

    return (usage * 100) / os.totalmem();
  }
}
