import { ExtensionContext } from "vscode";
import { StatusCombined } from "./interfaces/statusCombined";
import { displayData } from "./lib/displayData";
import { StatusItem } from "./lib/statusBar";

// This method is called when extension is activated
export function activate(context: ExtensionContext): void {
  const status: StatusCombined = {
    cpu: new StatusItem(),
    ram: new StatusItem(),
    battery: new StatusItem(),
  };

  // Run main loop when extension is activated
  const loop = setInterval(() => {
    displayData(status);
  }, 500);
}

// This method is called when extension is deactivated
export function deactivate(): void {}
