import { StatusCombined } from "../interfaces/interfaces";
import { Settings } from "./settings";
import { StatusItem } from "./statusBar";
import { system } from "./system/system";

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
    ManageItems.manageRAM(status.ram);
    await ManageItems.manageBattery(status.battery);
    await ManageItems.manageCPU(status.cpu);
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
  private static async manageCPU(cpu: StatusItem): Promise<void> {
    let load: number;

    if (Settings.getHideProcessorUsage()) {
      cpu.hide();
      return;
    }

    if (Settings.getToggleProcessorUsageType() === "GLOBAL") {
      load = parseInt(system.cpu.cpuSystemLoad());
    } else {
      load = parseInt(await system.cpu.cpuCurrentProcessLoad());
    }

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
      memory = `${system.ram.getRAMUsageAsPercent().toFixed(2)}%`;
    } else {
      memory = system.ram.memoryActive();
    }

    ram.show();
    ram.text(`RAM: ${memory}`);
    ram.autoChangeColor(system.ram.getRAMUsageAsPercent());
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
    const batteryPercent = await system.battery.getPercent();

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
