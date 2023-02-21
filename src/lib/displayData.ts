import { StatusCombined } from "../interfaces/statusCombined";
import { SystemInfo } from "./systemInfo/systemInfo";

/**
 * Display data on StatusBar
 *
 * @export
 * @param {StatusCombined} status
 */
export function displayData(status: StatusCombined): void {
  // CPU data
  status.cpu.text(`CPU: ${SystemInfo.cpuSystemLoad()}%`);

  // RAM data
  SystemInfo.memoryActive().then((data) => {
    status.ram.text(`RAM: ${data}`);
  });
}
