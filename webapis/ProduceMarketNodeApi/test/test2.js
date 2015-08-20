///<reference path="../bin/definitions/nodejs.d.ts" />
///<reference path="../bin/definitions/mongoose.d.ts" />
var chai = require('chai');
var mocha = require('mocha');
var expect = require('expect.js');
/**
 * Globals
 */
var expect = chai.expect;
var a = 2;
var b = 4;
var c = 'hi there';
var sum = b + c;
/**
 * Unit tests
 */
describe('User Model Unit Tests:', function () {
    describe('2 + 4', function () {
        it('should be 6', function (done) {
            expect(a + b).to.equals(6);
            done();
        });
        it('should not be 7', function (done) {
            expect(2 + 4).to.not.equals(7);
            done();
        });
    });
});
//# sourceMappingURL=test2.js.map