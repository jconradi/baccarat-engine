'use strict';

const _ = require('lodash');
const GameResult = require('../gameResult.js');

/**
 * Generator for common baccarat roadmaps.
 */
class RoadmapGenerator {

    /**
     * Calculates a bead plate based on games played.
     * @param {GameResult[]} gameResults The game results to calculate the roadmap from.
     * @param {Object} - The configuration object for drawing options.
     */
    beadPlate(gameResults = [], { columns = 6, rows = 6 }) {
        const DisplayEntries = columns * rows;
        const ColumnSize = rows;

        // Get the selected amount of display entries from the most recent games.
        gameResults = _.takeRight(gameResults, DisplayEntries);

        return _.range(0, gameResults.length)
                .map((index) => _.assign({}, { result: gameResults[index] || {} }, {
                    column: this.columnForGameNumber(index, ColumnSize),
                    row: this.rowForGameNumber(index, ColumnSize)
                }));
    }

    /**
     * Calculates a big road based on games played.
     * @param {GameResult[]} gameResults The game results to calculate the roadmap from.
     * @param {Object} - The configuration object for drawing options. 
     */
    bigRoad(gameResults = [], { columns = 12, rows = 6, scroll = true } = {}) {
        const DisplayEntries = columns * rows;
        let tieStack = [];
        let placementMap = {};
        let logicalColumnNumber = 0;
        let lastItem;
        let returnList = [];
        let maximumColumnReached = 0;

        // Build the logical column definitions that doesn't represent
        // the actual "drawn" roadmap.
        gameResults.forEach((gameResult) => {
            if (gameResult.outcome === GameResult.Tie) {
                tieStack.push(gameResult);
            }
            else {
                if (lastItem) {
                    // Add the ties that happened inbetween the last placed big road item
                    // and this new big road item to the last entered big road item.
                    let lastItemInResults = _.last(returnList);
                    if (lastItem.outcome === GameResult.Tie) {
                        if (lastItemInResults) {
                            lastItemInResults.ties = _.cloneDeep(tieStack);
                            tieStack = [];
                        }
                    }
                    // If this item is different from the outcome of the last game
                    // then we must place it in another column
                    else if (lastItem.outcome !== gameResult.outcome) {
                        logicalColumnNumber++;
                    }
                }

                let probeColumn = logicalColumnNumber;
                let probeRow = 0;
                let done = false;

                while (!done) {
                    let keySearch = `${probeColumn}.${probeRow}`;
                    let keySearchBelow = `${probeColumn}.${probeRow + 1}`;

                    // Position available at current probe location
                    if (!_.get(placementMap, keySearch)) {
                        var newEntry = _.merge({}, {
                            row: probeRow,
                            column: probeColumn,
                            logicalColumn: logicalColumnNumber,
                            ties: _.cloneDeep(tieStack)
                        }, { result: gameResult });
                        _.set(placementMap, keySearch, newEntry);
                        returnList.push(placementMap[probeColumn][probeRow]);

                        done = true;
                    }
                    // The spot below would go beyond the table bounds.
                    else if (probeRow + 1 >= rows) {
                        probeColumn++;
                    }
                    // The spot below is empty.
                    else if (!_.get(placementMap, keySearchBelow)) {
                        probeRow++;
                    }
                    // The result below is the same outcome.
                    else if (_.get(placementMap, keySearchBelow).result.outcome === gameResult.outcome) {
                        probeRow++;
                    }
                    else {
                        probeColumn++;
                    }
                }
                maximumColumnReached = Math.max(maximumColumnReached, probeColumn);
            }

            lastItem = gameResult;
        });

        // There were no outcomes added to the placement map.
        // We only have ties.
        if (_.isEmpty(returnList) && tieStack.length > 0) {
            returnList.push({
                 ties: _.cloneDeep(tieStack),
                 column: 0, 
                 row: 0, 
                 logicalColumn: 0, 
                 result: {}});
        }
        else if (!_.isEmpty(returnList)) {
            _.last(returnList).ties = _.cloneDeep(tieStack);
        }

        if (scroll) {
            returnList = this.scrollBigRoad(returnList, maximumColumnReached, columns);
        }
        return returnList;
    }

    /**
     * @private
     */
    scrollBigRoad(results = [], highestDrawingColumn, drawingColumns) {
        const highestDrawableIndex = drawingColumns - 1;
        const offset = Math.max(0, highestDrawingColumn - highestDrawableIndex);

        let validItems = results.filter((value) => (value.column - offset) >= 0);

        validItems.forEach((value) => value.column -= offset);

        return validItems;
    }

    /**
     * @private
     */
    columnForGameNumber(gameNumber, columnSize) {
        return Math.floor(gameNumber / columnSize);
    }

    /**
     * @private
     */
    rowForGameNumber(gameNumber, columnSize) {
        return gameNumber % columnSize;
    }
}

module.exports = RoadmapGenerator;