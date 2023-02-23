import { Battery } from "./battery";
import { CPU } from "./cpu";
import { OS } from "./os";
import { RAM } from "./ram";

export const systemInfo = {
  cpu: CPU,
  ram: RAM,
  os: OS,
  battery: Battery,
};
