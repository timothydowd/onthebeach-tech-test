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
    it('when passed 3 jobs, where a depends on b and c ("a => b, c =>") has no dependency, returns b before a and c anywhere', () => {
        expect(orderJobs('a => b, c')).to.include('a','b','c')
        const indexA = orderJobs('a => b, c').indexOf('a')
        const indexB = orderJobs('a => b, c').indexOf('b')

        assert.operator(indexA, '>', indexB)
    });
    it('(a => b, c => b), returns b before a and b before c', () => {
        expect(orderJobs('a => b, c => b')).to.have.lengthOf(3)
        const indexA = orderJobs('a => b, c => b').indexOf('a')
        const indexB = orderJobs('a => b, c => b').indexOf('b')
        const indexC = orderJobs('a => b, c => b').indexOf('c')
        assert.operator(indexA, '>', indexB)
        assert.operator(indexC, '>', indexB)
    });
    it('("a => b, c => b, a => d"), returns string with b before a, b before c, d before a', () => {
        expect(orderJobs('a => b, c => b, a => d')).to.have.lengthOf(4)
        const indexA = orderJobs('a => b, c => b, a => d').indexOf('a')
        const indexB = orderJobs('a => b, c => b, a => d').indexOf('b')
        const indexC = orderJobs('a => b, c => b, a => d').indexOf('c')
        const indexD = orderJobs('a => b, c => b, a => d').indexOf('d')
        assert.operator(indexA, '>', indexB)
        assert.operator(indexC, '>', indexB)
        assert.operator(indexA, '>', indexD)
    });
   
    it('(a =>, b => c, c => f, d => a, e => b),returns string with c before b, f before c, a before d and b before e', () => {
        expect(orderJobs('a =>, b => c, c => f, d => a, e => b, f =>')).to.have.lengthOf(6)

        const indexA = orderJobs('a =>, b => c, c => f, d => a, e => b, f =>').indexOf('a')
        const indexB = orderJobs('a =>, b => c, c => f, d => a, e => b, f =>').indexOf('b')
        const indexC = orderJobs('a =>, b => c, c => f, d => a, e => b, f =>').indexOf('c')
        const indexD = orderJobs('a =>, b => c, c => f, d => a, e => b, f =>').indexOf('d')
        const indexE = orderJobs('a =>, b => c, c => f, d => a, e => b, f =>').indexOf('e')
        const indexF = orderJobs('a =>, b => c, c => f, d => a, e => b, f =>').indexOf('f')
        
        assert.operator(indexC, '<', indexB)
        assert.operator(indexF, '<', indexC)
        assert.operator(indexA, '<', indexD)
        assert.operator(indexB, '<', indexE)
    });
    it('(a => a),returns self dependency error', () => {
        expect(orderJobs('a => a')).to.eql('Error: Jobs cannot depend on themselves')

    });

});