import { StatusCombined } from "../interfaces/statusCombined";
import { Settings } from "./settings";
import { SystemInfo } from "./systemInfo/systemInfo";

/**
 * Display data on StatusBar
 *
 * @export
 * @param {StatusCombined} status
 */
export function displayData(status: StatusCombined): void {
  // Check if CPU usage should be hidden
  if (Settings.getHideProcessorUsage()) {
    // Hide item
    status.cpu.hide();
  } else {
    // Show item
    status.cpu.show();

    // CPU data
    status.cpu.text(`CPU: ${SystemInfo.cpuSystemLoad()}%`);
  }

  // Check if RAM usage should be hidden
  if (Settings.getHideMemoryUsage()) {
    // Hide item
    status.ram.hide();
  } else {
    // Show item
    status.ram.show();

    // RAM data
    SystemInfo.memoryActive().then((data) => {
      status.ram.text(`RAM: ${data}`);
    });
  }
}
