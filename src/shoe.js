'use strict';

const Card = require ('./card.js');
const BaccaratResultsEngine = require("./baccaratResultsEngine.js");

const EventEmitter = require('events');
const Shuffle = require('shuffle-array');

const CutCardLengthFromBottom  = 16;

class Shoe extends EventEmitter {
    get cardsLeft() {
        return this.cards.length;
    }
    
    get cardsBeforeCutCard() {
        return Math.max(0, this.cardsLeft - CutCardLengthFromBottom);
    }

    get cutCardReached() {
        return this.cardsBeforeCutCard <= 0;
    }

    constructor(decks) {
        super();

        this.decks = decks;
        this.cards = [];
    }

    createDecks() {
        for (let i = 0; i < this.decks; i++) {
            for (let j = 0; j < 52; j++) {
                this.cards.push(this.createCard(j));
            }
        }
    }

    shuffle() {
        Shuffle(this.cards);
    }

    draw() {
        if (this.cards.length == 0) {
            this.createDecks();
            this.shuffle();
        }

        return this.cards.pop();
    }

    toString() {
        return `[${this.cards.map(c => c.toString()).join(', ')}]`;
    }

    createCard(value) {
        var suit = Math.floor(value / 13);
        var value = value % 13;

        var suitString = Card.DefaultSuits[suit];
        var valueString = Card.DefaultValues[value];

        return new Card(suitString, valueString);
    }
}

module.exports = Shoe;