import { window, StatusBarAlignment, ThemeColor } from "vscode";
import { StatusColors } from "../constants/enums";
import { Settings } from "./settings";

export class StatusItem {
  private item;
  private priority;

  constructor(text = "", alignment = StatusBarAlignment.Left, priority = 0) {
    this.priority = priority;
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

  /**
   * Automatically change background color based on usage
   *
   * @param {number} percentage
   * @memberof StatusItem
   */
  public autoChangeColor(percentage: number): void {
    if (!Settings.getColoredBackground()) {
      this.bgColor(StatusColors.default);
      return;
    }

    if (percentage >= Settings.getErrorBGPercent()) {
      this.bgColor(StatusColors.error);
    } else if (percentage >= Settings.getWarningBGPercent()) {
      this.bgColor(StatusColors.warning);
    } else {
      this.bgColor(StatusColors.default);
    }
  }

  /**
   * Hide status bar item
   *
   * @memberof StatusItem
   */
  public hide(): void {
    this.item.hide();
  }

  /**
   * Show status bar item
   *
   * @memberof StatusItem
   */
  public show(): void {
    this.item.show();
  }

  /**
   * Change location of the status bar item
   *
   * @param {StatusBarAlignment} location
   * @memberof StatusItem
   */
  public setLocation(location: StatusBarAlignment) {
    const text = this.item.text;

    // Remove old item
    this.item.dispose();
    // Create the same item, but with new alignment
    this.item = window.createStatusBarItem(location, this.priority);
    this.item.text = text;
    this.item.show();
  }

  /**
   * Get alignment of the status bar item
   *
   * @return {*}  {StatusBarAlignment}
   * @memberof StatusItem
   */
  public getLocation(): StatusBarAlignment {
    return this.item.alignment;
  }
}
