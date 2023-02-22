import { battery } from "systeminformation";
import { CPU } from "./cpu";
import { OS } from "./os";
import { RAM } from "./ram";

export const systemInfo = {
  /**
   * Get charging level in percent
   *
   * ! Huge usage of CPU
   *
   * @return {*}  {(Promise<string | undefined>)}
   */
  batteryPercent: async (): Promise<string | undefined> => {
    const hasBattery = (await battery()).hasBattery;

    return hasBattery ? `${(await battery()).percent}%` : undefined;
  },
  cpu: CPU,
  ram: RAM,
  os: OS,
};
