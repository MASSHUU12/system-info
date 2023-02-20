import { StatusCombined } from "../interfaces/statusCombined";
import { SystemInfo } from "./systemInfo";

export function displayData(status: StatusCombined): void {
  SystemInfo.cpuUsage((percentage) => {
    status.cpu.text(`CPU: ${percentage}%`);
  });

  SystemInfo.memoryActive().then((data) => {
    status.ram.text(data);
  });
}
