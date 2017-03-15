const expect = require('chai').expect;
const _ = require('lodash');
const RoadmapGenerator = require('../../src/roadmaps/roadmapGenerator.js');

describe('RoadmapGenerator', function () {
    let roadmapGenerator;

    beforeEach(function () {
        roadmapGenerator = new RoadmapGenerator();
    });

    describe('beadPlate#', function () {
        describe('When called with game results of [B, B, P, T, P, B]', function () {
            let games;
            let config;
            beforeEach(function () {
                games = [{ outcome: 'banker' }, { outcome: 'banker' }, { outcome: 'player' },
                { outcome: 'tie' }, { outcome: 'player' }, { outcome: 'banker' }];
                config = { columns: 1, rows: 3 };
            });

            describe('When configured with 3 rows and 1 column', function () {
                it('Should return a scrolled bead plate of [T, P, B] showing the last 3 entries'
                    , function () {
                        var result = roadmapGenerator.beadPlate(games, config);

                        expect(result).to.eql([
                            { result: { outcome: 'tie' }, column: 0, row: 0 },
                            { result: { outcome: 'player' }, column: 0, row: 1 },
                            { result: { outcome: 'banker' }, column: 0, row: 2 }]);
                    });
            });

            describe('When configured with 6 rows and 2 columns', function () {
                it('Should return a bead plate of [B, B, P, T, P, B]'
                    , function () {
                        var result = roadmapGenerator.beadPlate(games, { columns: 2, rows: 6 });

                        expect(result).to.eql([
                            { result: { outcome: 'banker' }, column: 0, row: 0 },
                            { result: { outcome: 'banker' }, column: 0, row: 1 },
                            { result: { outcome: 'player' }, column: 0, row: 2 },
                            { result: { outcome: 'tie' }, column: 0, row: 3 },
                            { result: { outcome: 'player' }, column: 0, row: 4 },
                            { result: { outcome: 'banker' }, column: 0, row: 5 }]);
                    });
            });
        });
    });

    describe('bigRoad#', function() {
        describe('When called with game results of [B, B, P, T, P, B]', function() {
            it('Should return a valid big road', function() {
                var games = [{ outcome: 'banker'}, { outcome: 'banker'}, { outcome: 'player'}, 
                { outcome: 'tie'}, { outcome: 'player'}, { outcome: 'banker'}];

                var result = roadmapGenerator.bigRoad(games);

                expect(result).to.eql([
                    { result: { outcome: 'banker' }, column: 0, row: 0, logicalColumn: 0, ties: [] },
                    { result: { outcome: 'banker' }, column: 0, row: 1, logicalColumn: 0, ties: [] },
                    { result: { outcome: 'player' }, column: 1, row: 0, logicalColumn: 1
                        , ties: [{ outcome: 'tie'}] },
                    { result: { outcome: 'player' }, column: 1, row: 1, logicalColumn: 1, ties: [] },
                    { result: { outcome: 'banker' }, column: 2, row: 0, logicalColumn: 2, ties: [] }]);
            });
        });

        describe('When called with game results of []', function() {
            it('Should return an empty big road', function() {
                var games = [];

                var result = roadmapGenerator.bigRoad(games);

                expect(result).to.eql([]);
            });
        });

        describe('When called with game results of all ties', function() {
            it('Should return a big road with a single tie entry', function() {
                var games = _.fill(Array(2), { outcome: 'tie' });

                var result = roadmapGenerator.bigRoad(games);

                expect(result).to.eql([
                    { result: { }, column: 0, row: 0, logicalColumn: 0,
                     ties: [{outcome: 'tie'}, {outcome: 'tie'}] }
                ]);
            });
        });

        describe('When called with game results starting with ties and ending with a player win', function() {
            it('Should return a big road with a single player win with ties', function() {
                let games = [{outcome: 'tie'}, {outcome: 'tie'}, {outcome: 'banker'}];

                var result = roadmapGenerator.bigRoad(games);

                expect(result).to.eql([{ result: { outcome: 'banker'}, column: 0, row: 0,
                 logicalColumn: 0, ties: [{ outcome: 'tie'}, {outcome: 'tie'}]}]);
            });
        });

        describe('When called with game results of [B * 9, P * 10]', function() {
            it('Should return a valid big road with a double dragon tail', function() {
                var games = _.concat(_.fill(Array(9), { outcome: 'banker' }), 
                _.fill(Array(10), { outcome: 'player' }));

                var result = roadmapGenerator.bigRoad(games);

                expect(result).to.eql([
                    { result: { outcome: 'banker' }, column: 0, row: 0, logicalColumn: 0, ties: [] },
                    { result: { outcome: 'banker' }, column: 0, row: 1, logicalColumn: 0, ties: [] },
                    { result: { outcome: 'banker' }, column: 0, row: 2, logicalColumn: 0, ties: [] },
                    { result: { outcome: 'banker' }, column: 0, row: 3, logicalColumn: 0, ties: [] },
                    { result: { outcome: 'banker' }, column: 0, row: 4, logicalColumn: 0, ties: [] },
                    { result: { outcome: 'banker' }, column: 0, row: 5, logicalColumn: 0, ties: [] },
                    { result: { outcome: 'banker' }, column: 1, row: 5, logicalColumn: 0, ties: [] },
                    { result: { outcome: 'banker' }, column: 2, row: 5, logicalColumn: 0, ties: [] },
                    { result: { outcome: 'banker' }, column: 3, row: 5, logicalColumn: 0, ties: [] },
                    { result: { outcome: 'player' }, column: 1, row: 0, logicalColumn: 1, ties: [] },
                    { result: { outcome: 'player' }, column: 1, row: 1, logicalColumn: 1, ties: [] },
                    { result: { outcome: 'player' }, column: 1, row: 2, logicalColumn: 1, ties: [] },
                    { result: { outcome: 'player' }, column: 1, row: 3, logicalColumn: 1, ties: [] },
                    { result: { outcome: 'player' }, column: 1, row: 4, logicalColumn: 1, ties: [] },
                    { result: { outcome: 'player' }, column: 2, row: 4, logicalColumn: 1, ties: [] },
                    { result: { outcome: 'player' }, column: 3, row: 4, logicalColumn: 1, ties: [] },
                    { result: { outcome: 'player' }, column: 4, row: 4, logicalColumn: 1, ties: [] },
                    { result: { outcome: 'player' }, column: 4, row: 5, logicalColumn: 1, ties: [] },
                    { result: { outcome: 'player' }, column: 5, row: 5, logicalColumn: 1, ties: [] }]);
            });
        });

        describe('When called with not enough columns to fit every result', function() {
            it('Should scroll to show a sliding window of results', function() {
                var games = [{ outcome: 'banker' }, { outcome: 'banker' }, { outcome: 'player' },
                { outcome: 'tie' }, { outcome: 'player' }, { outcome: 'banker' }];

                var result = roadmapGenerator.bigRoad(games, { columns: 2 });

                expect(result).to.eql([
                    {
                        result: { outcome: 'player' }, column: 0, row: 0, logicalColumn: 1
                        , ties: [{ outcome: 'tie' }]
                    },
                    { result: { outcome: 'player' }, column: 0, row: 1, logicalColumn: 1, ties: [] },
                    { result: { outcome: 'banker' }, column: 1, row: 0, logicalColumn: 2, ties: [] }]);
            });
        });
    });
});