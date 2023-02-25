import { ExtensionContext } from "vscode";
import { StatusCombined } from "./interfaces/interfaces";
import { registerCommands } from "./lib/registerCommands";
import { StatusItem } from "./lib/statusBar";
import { updateInfo } from "./lib/updateInfo";

// This method is called when extension is activated
export function activate(context: ExtensionContext): void {
  const status: StatusCombined = {
    cpu: new StatusItem({
      tooltip: "Switch between process/system CPU usage",
      command: "system-info.toggleProcessorUsageType",
    }),
    ram: new StatusItem({
      tooltip: "Switch between display modes",
      command: "system-info.toggleMemoryUsageType",
    }),
    battery: new StatusItem(),
  };

  // Run main loop when extension is activated
  updateInfo(status);

  context.subscriptions.push(...registerCommands());
}

// This method is called when extension is deactivated
export function deactivate(): void {}
