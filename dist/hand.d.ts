export = Hand;
/**
 * Represents the player and banker cards for a game of baccarat.
 */
declare class Hand {
    /**
     *
     * @param {Card[]} playerCards The players cards from the game
     * @param {Card[]} bankerCards The bankers cards from the game
     */
    constructor(playerCards?: any[], bankerCards?: any[]);
    playerCards: any[];
    bankerCards: any[];
}
