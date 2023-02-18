import { window, StatusBarAlignment, ThemeColor } from "vscode";
import { StatusColors } from "../constants/enums";

export class StatusItem {
  private item;

  constructor(text = "", alignment = StatusBarAlignment.Left, priority = 0) {
    this.item = window.createStatusBarItem(alignment, priority);
    this.item.text = text;
    this.item.show();
  }

  /**
   * Change text of status item
   *
   * @param {string} text
   * @memberof StatusItem
   */
  public text(text: string): void {
    this.item.text = text;
  }

  /**
   * Change item background color
   *
   * @param {StatusColors} color
   * @memberof StatusItem
   */
  public bgColor(color: StatusColors): void {
    switch (color) {
      case StatusColors.error:
        this.item.backgroundColor = new ThemeColor(
          "statusBarItem.errorBackground"
        );
        break;

      case StatusColors.warning:
        this.item.backgroundColor = new ThemeColor(
          "statusBarItem.warningBackground"
        );
        break;

      default:
        this.item.backgroundColor = new ThemeColor("statusBar.background");
        break;
    }
  }
}
