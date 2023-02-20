import { ExtensionContext } from "vscode";
import { StatusCombined } from "./interfaces/statusCombined";
import { StatusItem } from "./lib/statusBar";
import { updateInfo } from "./lib/updateInfo";

// This method is called when extension is activated
export function activate(context: ExtensionContext): void {
  const status: StatusCombined = {
    cpu: new StatusItem(),
    ram: new StatusItem(),
    battery: new StatusItem(),
  };

  // Run main loop when extension is activated
  updateInfo(status);
}

// This method is called when extension is deactivated
export function deactivate(): void {}
