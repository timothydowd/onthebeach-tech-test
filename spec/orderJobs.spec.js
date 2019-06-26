const chai = require('chai')
const { expect, assert } = chai
const { orderJobs } = require('../orderJobs')

describe('orderJobs', () => {
    it('when passed an empty string returns an empty string', () => {
        expect(orderJobs('')).to.eql('') 
    });
    it('when passed one job with no dependency it returns that job as a string', () => {
        expect(orderJobs('a =>')).to.eql('a')
    });
    it('when passed 2 jobs, where a depends on b ("a => b"), returns the string "ba"', () => {
        expect(orderJobs('a => b')).to.eql('ba')
    });
    it('when passed 2 jobs with no dependencies, "a =>, b=>", returns the a and b in no particular order', () => {
        expect(orderJobs('a =>, b =>')).to.include('a','b')
        expect(orderJobs('a =>, b =>')).to.have.lengthOf(2)
    });
    it.only('when passed 3 jobs, where a depends on b and c ("a => b, c =>") has no dependency, returns b before a and c anywhere', () => {
        expect(orderJobs('a => b, c')).to.include('a','b','c')
        const indexA = orderJobs('a => b, c').indexOf('a')
        const indexB = orderJobs('a => b, c').indexOf('b')

        assert.operator(indexA, '>', indexB)
    });
});