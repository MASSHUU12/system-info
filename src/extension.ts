import { ExtensionContext, commands } from "vscode";
import { StatusCombined } from "./interfaces/interfaces";
import { Settings } from "./lib/settings";
import { StatusItem } from "./lib/statusBar";
import { updateInfo } from "./lib/updateInfo";

// This method is called when extension is activated
export function activate(context: ExtensionContext): void {
  const status: StatusCombined = {
    cpu: new StatusItem(),
    ram: new StatusItem({
      tooltip: "Switch between display modes",
      command: "system-info.toggleMemoryUsageType",
    }),
    battery: new StatusItem(),
  };

  // Run main loop when extension is activated
  updateInfo(status);

  let disposable = commands.registerCommand(
    "system-info.toggleMemoryUsageType",
    () => {
      Settings.setMemoryUsageAsPercentage(
        !Settings.getMemoryUsageAsPercentage()
      );
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when extension is deactivated
export function deactivate(): void {}
