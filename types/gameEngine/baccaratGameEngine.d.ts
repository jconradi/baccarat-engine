export = BaccaratGameEngine;
/**
 * Plays a baccarat game according to Punto Banco rules
 */
declare class BaccaratGameEngine {
  /**
   * Can another game be played without creating another deck.
   */
  get isBurnNeeded(): boolean;
  resultsEngine: BaccaratResultsEngine;
  shoe: Shoe;
  /**
   * Performs a burn operation
   */
  burnCards(): {
    burnCard: Card;
    burnCards: Card[];
  };
  dealGame(): Hand;
}
import BaccaratResultsEngine = require("../../src/baccaratResultsEngine.js");
import Shoe = require("../../src/shoe.js");
import Hand = require("../../src/hand.js");
import Card = require("../../src/card.js");
