export = BaccaratGameEngine;
/**
 * Plays a baccarat game accoring to Punto Banco rules
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
        burnCard: any;
        burnCards: any[];
    };
    dealGame(): Hand;
}
import BaccaratResultsEngine = require("../baccaratResultsEngine.js");
import Shoe = require("../shoe.js");
import Hand = require("../hand.js");
