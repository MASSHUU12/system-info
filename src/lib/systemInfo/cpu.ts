import { exec, execSync } from "child_process";
import { currentLoad } from "systeminformation";
import { cpuLoadMac, cpuLoadPS1, cpuLoadSH } from "../../scripts/scripts";
import { OS } from "./os";

export class CPU {
  static cpuLoad = "0";

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
    switch (OS.os()) {
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
    const output = execSync(script, {
      shell: shell !== "" ? shell : undefined,
      // Terminate the program when it blocks for too long
      timeout: 20000,
      encoding: "utf8",
    });

    let formatted = output.replace(/[^0-9]+/g, "");

    if (formatted !== "") {
      this.cpuLoad = formatted;
    }
  }
}
