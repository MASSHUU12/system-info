import { commands, Disposable, ExtensionContext } from "vscode";
import { Settings } from "./settings";

export function registerCommands(): Disposable[] {
  const comms = new Array<Disposable>();

  comms.push(
    commands.registerCommand("system-info.toggleMemoryUsageType", () => {
      Settings.setMemoryUsageAsPercentage(
        !Settings.getMemoryUsageAsPercentage()
      );
    })
  );

  comms.push(
    commands.registerCommand("system-info.toggleProcessorUsageType", () => {
      const setting = Settings.getToggleProcessorUsageType();

      Settings.setToggleProcessorUsageType(
        setting === "GLOBAL" ? "PROCESS" : "GLOBAL"
      );
    })
  );

  return comms;
}
