///<reference path="../bin/definitions/nodejs.d.ts" />
///<reference path="../bin/definitions/mongoose.d.ts" />
var chai = require('chai');

/**
 * Globals
 */

var expect = chai.expect;
var a:number = 2;
var b:number = 4;
var c:string = 'hi there';
var sum = b + c;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', () => {

    describe('2 + 4', () => {
        it('should be 6', (done) => {
            expect(a + b).to.equals(6);
            done();
        });

        it('should not be 7', (done) => {
            expect(2 + 4).to.not.equals(7);
            done();
        });
    });
});