import { StatusCombined } from "../interfaces/statusCombined";
import { SystemInfo } from "./systemInfo";

export function displayData(status: StatusCombined): void {
  status.cpu.text(SystemInfo.cpuCurrentSystemLoad());

  SystemInfo.memoryActive().then((data) => {
    status.ram.text(data);
  });
}
