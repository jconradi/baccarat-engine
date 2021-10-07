export = GameResult;
/**
 * @property {string} outcome The outcome of the game
 * @property {string} natural The status of a natural bet on this game
 * @property {string} pair The status of the pair bet on this game
 */
declare class GameResult {
  outcome: string;
  natural: string;
  pair: string;
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
