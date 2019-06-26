const chai = require('chai')
const { expect } = chai
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
    it.only('when passed 2 jobs with no dependencies, "a =>, b=>", returns the a and b in no particular order', () => {
        expect(orderJobs('a =>, b =>')).to.include('a','b')
        expect(orderJobs('a =>, b =>')).to.have.lengthOf(2)
        
        
    });
});