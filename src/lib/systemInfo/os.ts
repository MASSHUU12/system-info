import * as os from "os";

export class OS {
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
}
