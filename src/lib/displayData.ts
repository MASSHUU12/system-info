import { StatusCombined } from "../interfaces/statusCombined";
import { SystemInfo } from "./systemInfo";

export function displayData(status: StatusCombined): void {
  SystemInfo.cpuCurrentLoad().then((data) => {
    status.cpu.text(data);
  });
}
