const expect = require('chai').expect;
const _ = require('lodash');
const BaccaratGameEngine = require('../../src/gameEngine/baccaratGameEngine.js');
const BaccaratResultsEngine = require('../../src/baccaratResultsEngine');
const GameResult = require('../../src/gameResult');

describe('BaccaratGameEngine', function() {
    let gameEngine;
    let resultsEngine;

    beforeEach(function() {
        gameEngine = new BaccaratGameEngine();
        resultsEngine = new BaccaratResultsEngine();
    });


    describe('dealGame#', function() {
        describe("When 100,000 games simulated", function() {
            it ("Should have probabilities of Banker: 45% Player: 44% Tie 9% With 2% margin of error", function() {
                var bankerWins = 0;
                var playerWins = 0;
                var ties = 0;
                for (let i = 0; i < 100000; i++) {
                    let hand = gameEngine.dealGame();
                    let result = resultsEngine.calculateGameResult(hand);

                    switch (result.outcome) {
                        case GameResult.Tie:
                            ties++;
                            break;
                        case GameResult.Banker:
                            bankerWins++;
                            break;
                        case GameResult.Player:
                            playerWins++;
                            break;
                    }
                }

                expect(bankerWins).within(45859 - 1000, 45859 + 1000, "Banker Wins is outside of expected range.");
                expect(playerWins).within(44624 - 1000, 44624 + 1000, "Player Wins is outside of expected range.");
                expect(ties).within(9515 - 1000, 9515 + 1000, "Tie Wins is outside of expected range.");
            });

            it ("Should have probabilities of Pair: 7.5%, No Pair: 92.5% With 2% margin of error", function() {
                var pairs = 0;
                var nonPairs = 0;
                for (let i = 0; i < 100000; i++) {
                    let hand = gameEngine.dealGame();
                    let result = resultsEngine.calculateGameResult(hand);

                    switch (result.pair) {
                        case GameResult.NoPair:
                            nonPairs++;
                            break;
                        default:
                            pairs++;
                            break;
                    }
                }

                expect(pairs).within(7469 - 1000, 7469 + 1000, "Pair is outside of expected range.");
                expect(nonPairs).within(92530 - 1000, 92530 + 1000, "Non Pairs is outside of expected range.");
            });
        });
    });
});