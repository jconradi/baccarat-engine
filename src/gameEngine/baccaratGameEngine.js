'use strict';

const Hand = require("../hand.js");
const BaccaratResultsEngine = require("../baccaratResultsEngine.js");
const Shoe = require('../shoe.js');

/**
 * Plays a baccarat game accoring to Punto Banco rules
 */
class BaccaratGameEngine {
    constructor() {
        this.resultsEngine = new BaccaratResultsEngine();
        this.shoe = new Shoe(8);
    }
    
    dealGame() {
        var pCard1 = this.shoe.draw();
        var bCard1 = this.shoe.draw();
        var pCard2 = this.shoe.draw();
        var bCard2 = this.shoe.draw();

        var hand = new Hand();

        hand.playerCards.push(pCard1, pCard2);
        hand.bankerCards.push(bCard1, bCard2);

        var bankerCardsValue = this.resultsEngine.calculateHandValue(hand.bankerCards);
        var playerCardsValue = this.resultsEngine.calculateHandValue(hand.playerCards);

        var bankerDraw = false;

        // Natural (Dealer or Player drew an 8 or 9) - neither side draws, game over.
        if (bankerCardsValue > 7 || playerCardsValue > 7) {
            return hand;
        }
        // Player has 6 or 7 - stands
        else if (playerCardsValue > 5) {
            // Player stood so dealer draws with [0-5] and stands with 6 or 7
            if (bankerCardsValue <= 5) {
                bankerDraw = true;
            }
        }
        // Player has 0 - 5, draws 3rd card
        else  {
            var player3rdCard = this.shoe.draw();
            hand.playerCards.push(player3rdCard);
            var player3rdCardValue = this.resultsEngine.valueForCard(player3rdCard);
            playerCardsValue = this.resultsEngine.calculateHandValue(hand.playerCards);

            if (bankerCardsValue <= 2) {
                bankerDraw = true;
            }
            else if (bankerCardsValue == 3 && player3rdCardValue != 8)  {
                bankerDraw = true;
            }
            else if (bankerCardsValue == 4 && player3rdCardValue >= 2 && player3rdCardValue <= 7) {
                bankerDraw = true;
            }
            else if (bankerCardsValue == 5 && player3rdCardValue >= 4 && player3rdCardValue <= 7) {
                bankerDraw = true;
            }
            else if (bankerCardsValue == 6 && playerCardsValue >= 6 && playerCardsValue <= 7) {
                bankerDraw = true;
            }
        }

        if (bankerDraw) {
            var banker3rdCard = this.shoe.draw();
            hand.bankerCards.push(banker3rdCard);
            bankerCardsValue = this.resultsEngine.calculateHandValue(hand.bankerCards);
        }

        return hand;
    }
}

module.exports = BaccaratGameEngine;