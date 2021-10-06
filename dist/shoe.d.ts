export = Shoe;
declare class Shoe {
    constructor(decks: any);
    get cardsLeft(): number;
    get cardsBeforeCutCard(): number;
    get cutCardReached(): boolean;
    decks: any;
    cards: any[];
    createDecks(): void;
    shuffle(): void;
    draw(): any;
    toString(): string;
    createCard(value: any): Card;
}
import Card = require("./card.js");
