export = GameResult;
/**
 * @property {String} outcome The outcome of the game
 * @property {String} natural The status of a natural bet on this game
 * @property {String} pair The status of the pair bet on this game
 */
declare class GameResult {
}
declare namespace GameResult {
    const Tie: string;
    const Banker: string;
    const Player: string;
    const PlayerNatural8: string;
    const PlayerNatural9: string;
    const BankerNatural8: string;
    const BankerNatural9: string;
    const NoNatural: string;
    const PlayerPair: string;
    const BankerPair: string;
    const BothPair: string;
    const NoPair: string;
}
