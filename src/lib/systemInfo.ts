import { Converter } from "../helpers/unitConverter";
import { currentLoad, battery, mem } from "systeminformation";
import * as os from "os";
import { exec } from "child_process";
import { cpuLoadMac, cpuLoadPS1, cpuLoadSH } from "../scripts/scripts";

export class SystemInfo {
  static cpuLoad = "";

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
   * @memberof SystemInfo
   */
  static cpuSystemLoad() {
    switch (this.os()) {
      case "win32":
        this.cpuSpecificOS(cpuLoadPS1, "powershell.exe");
        break;

      case "linux":
        this.cpuSpecificOS(cpuLoadSH);
        break;

      case "darwin":
        this.cpuSpecificOS(cpuLoadMac);
        break;

      default:
        break;
    }
    return this.cpuLoad;
  }

  /**
   * Get CPU load on specific OS
   *
   * @static
   * @return {*}  {void}
   * @memberof SystemInfo
   */
  static cpuSpecificOS(script: string, shell = ""): void {
    // Run script, and get Readable
    // If system is Windows run the script in Powershell instead of the default shell
    const { stdout } = exec(script, {
      shell: shell !== "" ? shell : undefined,
    });

    if (stdout === null) {
      return;
    }

    // Add listener to variable, which will run on every data passed to Readable
    stdout.on("data", (stream: string) => {
      // Remove all unnecessary characters, leave only numbers
      let formatted = stream.replace(/[^0-9]+/g, "");

      // Assign the result to a variable, only if it is not empty
      if (formatted !== "") {
        this.cpuLoad = formatted;
      }
    });
  }

  /**
   * Get operating system name
   *
   * @static
   * @return {*}  {string}
   * @memberof SystemInfo
   */
  static os(): string {
    return os.platform().toString();
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
