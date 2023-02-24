import { StatusCombined } from "../interfaces/interfaces";
import { Settings } from "./settings";
import { StatusItem } from "./statusBar";
import { systemInfo } from "./systemInfo/systemInfo";

export class ManageItems {
  /**
   * Manage status bar elements
   *
   * @static
   * @param {StatusCombined} status
   * @memberof name
   */
  static async run(status: StatusCombined): Promise<void> {
    ManageItems.manageAlignment(status);
    ManageItems.manageCPU(status.cpu);
    ManageItems.manageRAM(status.ram);
    await ManageItems.manageBattery(status.battery);
  }

  /**
   * Manage alignment of the status bar items
   *
   * @private
   * @static
   * @param {StatusCombined} items
   * @memberof ManageItems
   */
  private static manageAlignment(items: StatusCombined): void {
    // Check if location of the status bar items should change
    if (items.cpu.getLocation() !== Settings.getLocation()) {
      const location = Settings.getLocation();

      items.cpu.setLocation(location);
      items.ram.setLocation(location);
      items.battery.setLocation(location);
    }
  }

  /**
   * Manage CPU item
   *
   * @private
   * @static
   * @param {StatusItem} cpu
   * @memberof ManageItems
   */
  private static manageCPU(cpu: StatusItem): void {
    if (Settings.getHideProcessorUsage()) {
      cpu.hide();
      return;
    }
    const load = parseInt(systemInfo.cpu.cpuSystemLoad());

    cpu.show();
    cpu.text(`CPU: ${load}%`);
    cpu.autoChangeColor(load);
  }

  /**
   * Manage RAM item
   *
   * @private
   * @static
   * @param {StatusItem} ram
   * @memberof ManageItems
   */
  private static manageRAM(ram: StatusItem): void {
    if (Settings.getHideMemoryUsage()) {
      ram.hide();
      return;
    }
    let memory: string;

    if (Settings.getMemoryUsageAsPercentage()) {
      memory = `${systemInfo.ram.getRAMUsageAsPercent().toFixed(2)}%`;
    } else {
      memory = systemInfo.ram.memoryActive();
    }

    ram.show();
    ram.text(`RAM: ${memory}`);
    ram.autoChangeColor(systemInfo.ram.getRAMUsageAsPercent());
  }

  /**
   * Manage battery item
   *
   * @private
   * @static
   * @param {StatusItem} battery
   * @return {*}  {Promise<void>}
   * @memberof ManageItems
   */
  private static async manageBattery(battery: StatusItem): Promise<void> {
    if (Settings.getHideBatteryStatus()) {
      battery.hide();
      return;
    }
    const batteryPercent = await systemInfo.battery.getPercent();

    if (batteryPercent === undefined) {
      battery.hide();
      Settings.setHideBatteryStatus(true);
      return;
    }

    battery.show();
    battery.text(`Battery: ${batteryPercent}%`);
    battery.autoChangeColor(100 - batteryPercent);
  }
}
