var cal = require('./stringCalculator.js');
var expect = require('chai').expect;

describe("stringCalculator", function(){
    it("should be defined", function(){
        expect(cal).to.be.defined;
    });

    it("should add comma-delimited string", function(){
        expect(cal.add("")).to.equal(0);
        expect(cal.add("1")).to.equal(1);
        expect(cal.add("1,2")).to.equal(3);
        expect(cal.add("1,2,3")).to.equal(6);
    });

    it("should support \\n as delimter", function(){
        expect(cal.add("1\n2,3")).to.equal(6);
        expect(cal.add("1\n,")).to.equal(1);
    });

    it("should support self-defined delimiter", function(){
        expect(cal.add("//;\n1;2;3")).to.equal(6);
    });

    it("should not allow negative number", function(){
        expect(function(){
            cal.add("-1,2,-3");
        }).to.throw("negatives not allowed: -1, -3");
    });

    it("should ignore number bigger than 1000", function(){
        expect(cal.add("2,1001")).to.equal(2);
    });

    it("should handle delimiter of any length", function(){
        expect(cal.add("//[***]\n1***2***3")).to.equal(6);
    });

    it("should support multiple delimiter", function(){
        expect(cal.add("//[*][%]\n1*2%3")).to.equal(6);
    });
});
