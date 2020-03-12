'use strict';

const Card = require ('./card.js');
const EventEmitter = require('events');


class Shoe extends EventEmitter {
    constructor(decks) {
        super();

        this.decks = decks;
        this.cards = [];

        this.createDecks();
    }

    createDecks() {
        for (let i = 0; i < this.decks; i++) {
            for (let j = 0; j < 52; j++) {
                this.cards.push(this.createCard(j));
            }
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
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