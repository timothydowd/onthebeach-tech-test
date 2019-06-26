const chai = require('chai')
const { expect } = chai
const { orderJobs } = require('../orderJobs')

describe('orderJobs', () => {
    it('when passed an empty string returns an empty string', () => {
        expect(orderJobs('')).to.equal('') 
    });
    it('when passed one job with no dependency it returns that job as a string', () => {
        expect(orderJobs('a =>')).to.equal('a')
    });
});