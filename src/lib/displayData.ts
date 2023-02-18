import { StatusCombined } from "../interfaces/statusCombined";
import { SystemInfo } from "./systemInfo";

export function displayData(status: StatusCombined): void {
  SystemInfo.cpuCurrentSystemLoad().then((data) => {
    status.cpu.text(data);
  });

  // SystemInfo.batteryPercent().then((data) => {
  //   data !== undefined && status.battery.text(data);
  // });

  SystemInfo.memoryActive().then((data) => {
    status.ram.text(data);
  });
}
