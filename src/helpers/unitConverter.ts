export class Converter {
  /**
   * Byte converter to larger size
   *
   * @static
   * @param {number} num
   * @memberof Converter
   */
  static auto = (num: number): string => {
    const k = num > 0 ? Math.floor(Math.log2(num) / 10) : 0;
    const rank = (k > 0 ? "KMGT"[k - 1] : "") + "b";
    const count = (num / Math.pow(1024, k)).toFixed(2);

    return `${count} ${rank}`;
  };
}
