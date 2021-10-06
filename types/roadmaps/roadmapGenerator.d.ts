export { RoadmapGenerator, BeadPlateConfig, BeadPlate };

interface BeadPlateConfig {
  columns: number;
  rows: number;
}

interface BeadPlate {}

interface BigRoadConfig {
  columns: number;
  rows: number;
  scroll: boolean;
}

interface BigRoad {}

/**
 * Generator for common baccarat roadmaps.
 */
declare class RoadmapGenerator {
  /**
   * Calculates a bead plate based on games played.
   * @param {GameResult[]} gameResults The game results to
   *  calculate the roadmap from.
   * @param {BeadPlateConfig} config The configuration object for drawing options.
   * @return {BeadPlate} A data representation of how a bead plate can
   *  be drawn from this calculation.
   */
  beadPlate(gameResults: GameResult[], config: BeadPlateConfig): BeadPlate;

  /**
   * Calculates a big road based on games played.
   * @param {GameResult[]} gameResults The game results to calculate the
   *  roadmap from.
   * @param {Object} config The configuration object for drawing options.
   * @return {Object} A data representation of how a big road can
   *  be drawn from this calculation.
   */
  bigRoad(gameResults?: GameResult[], { columns, rows, scroll }?: any): any;
  bigRoadColumnDefinitions(bigRoad: any): {};
  /**
   * Derived road using the given cycle
   * @private
   * @param {BigRoad} bigRoad The big road data
   * @param {int} cycleLength The big road data
   * @return {BigEyeRoad} A new list of big road items whose view is scrolled
   * to have the amount of drawing columns visible.
   */
  private derivedRoad;
  /**
   * Scrolls the big eye road - derived road with a cycle of 1
   * @public
   * @param {BigRoad} bigRoad The big road data
   * @return {BigEyeRoad} A new list of big road items whose view is scrolled
   * to have the amount of drawing columns visible.
   */
  public bigEyeRoad(bigRoad: any): any;
  /**
   * Scrolls the big road drawing to only show the specified amount of
   * drawing columns.
   * @private
   * @param {Object[]} results The big road data
   * @param {Number} highestDrawingColumn The highest column reached in
   * the big road supplied.
   * @param {Number} drawingColumns The amount of columns to show in the
   * big road
   * @return {Object[]} A new list of big road items whose view is scrolled
   * to have the amount of drawing columns visible.
   */
  private scrollBigRoad;
  /**
   * Generates the column number for the game number of a game based
   * on the column size of the table to be drawn.
   * @private
   * @param {Number} gameNumber The game number of the item in the sequence.
   * @param {Number} columnSize The column size of the drawn table
   * @return {Number} The column number that this gameNumber is drawn to.
   */
  private columnForGameNumber;
  /**
   * Generates the row number for the game number of a game based
   * on the column size of the table to be drawn.
   * @private
   * @param {Number} gameNumber The game number of the item in the sequence.
   * @param {Number} columnSize The column size of the drawn table
   * @return {Number} The row number that this gameNumber is drawn to.
   */
  private rowForGameNumber;
}
import GameResult = require("../gameResult.js");
