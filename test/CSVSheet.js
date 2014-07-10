CSV = require("comma-separated-values");
var should = require('chai').should();

var csvSheet = require('../src/CSVSheet.js');

describe('Converter', function() {
    describe('#vend', function(){
        it('should be successful to build CSV components', function(){
            var csvObject = new csvSheet.CSVSheet().vend([
                ['name', 'age'],
                ['John', '23'],
                ['George', '25']
            ]);

            csvObject.contents.should.equal('"name","age"\r\n"John",23\r\n"George",25');
            csvObject.contentType.should.equal("text/csv");
            csvObject.filename.should.equal("table.csv");
        });
    });
});

