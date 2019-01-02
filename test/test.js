const RangeCollection = require('../controller/range.js');
var assert = require('assert');

describe('Basic RangeClass Test', function () {
    let rc = new RangeCollection();
    it('should add first range', function () {        
        rc.add([1,5]);
        assert.equal(rc.range.length, 1);
    });

    it('should add second range', function () {
        rc.add([10,20]);
        let str = rc.print();
        assert.equal(str,"[1, 5) [10, 20) ");
    });

    it('should add second range', function () {
        rc.add([20, 20]);
        let str = rc.print();
        assert.equal(str,"[1, 5) [10, 20) ");
    });

    it('should add second range', function () {
        rc.add([20, 21]);
        let str = rc.print();
        assert.equal(str,"[1, 5) [10, 21) ");
    });

    it('should add second range', function () {
        rc.add([2, 4]);
        let str = rc.print();
        assert.equal(str,"[1, 5) [10, 21) ");
    });

    it('should add second range', function () {
        rc.add([3, 8]);
        let str = rc.print();
        assert.equal(str,"[1, 8) [10, 21) ");
    });

    it('should remove range', function () {
        rc.remove([10, 10]);
        let str = rc.print();
        assert.equal(str,"[1, 8) [10, 21) ");
    });

    it('should remove range', function () {
        rc.remove([10, 11]);
        let str = rc.print();
        assert.equal(str,"[1, 8) [11, 21) ");
    });

    it('should remove range', function () {
        rc.remove([15, 17]);
        let str = rc.print();
        assert.equal(str,"[1, 8) [11, 15) [17, 21) ");
    });

    it('should remove range', function () {
        rc.remove([3, 19]);
        let str = rc.print();
        assert.equal(str,"[1, 3) [19, 21) ");
    });

});