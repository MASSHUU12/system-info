import { StatusCombined } from "../interfaces/statusCombined";
import { Settings } from "./settings";
import { systemInfo } from "./systemInfo/systemInfo";

/**
 * Display data on StatusBar
 *
 * @export
 * @param {StatusCombined} status
 */
export function displayData(status: StatusCombined): void {
  // Check if location of the status bar items should change
  if (status.cpu.getLocation() !== Settings.getLocation()) {
    const location = Settings.getLocation();

    status.cpu.setLocation(location);
    status.ram.setLocation(location);
    status.battery.setLocation(location);
  }

  // Check if CPU usage should be hidden
  if (Settings.getHideProcessorUsage()) {
    // Hide item
    status.cpu.hide();
  } else {
    const load = parseInt(systemInfo.cpu.cpuSystemLoad());

    // Show item
    status.cpu.show();

    // CPU data
    status.cpu.text(`CPU: ${load}%`);

    // Set status bar background color
    status.cpu.autoChangeColor(load);
  }

  // Check if RAM usage should be hidden
  if (Settings.getHideMemoryUsage()) {
    // Hide item
    status.ram.hide();
  } else {
    // Show item
    status.ram.show();

    // RAM data
    const memory = systemInfo.ram.memoryActive();

    status.ram.text(`RAM: ${memory}`);
    status.ram.autoChangeColor(systemInfo.ram.getRAMUsageAsPercent());
  }
}
