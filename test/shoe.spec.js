const expect = require('chai').expect;
const Shoe = require('../src/shoe.js');

describe('Shoe', function() {
    let shoe;

    beforeEach(function() {
        shoe = new Shoe(1);
    });

    describe('constructor#', function() {
        describe('When called with 1 deck', function() {
            it('Should set cards length to 52', function() {
                expect(shoe.cards.length).to.equal(52);
            });
        });
    });
});
