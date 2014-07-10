XLSX = require("xlsx");
var should = require('chai').should();

var xlsxSheet = require('../src/XLSXSheet.js');

describe('Converter', function() {
    describe('#vend', function(){
        it('should be successful to build XLSX components', function(){
            var xlsxObject = new xlsxSheet.XLSXSheet().vend([
                ['name', 'age'],
                ['John', '23'],
                ['George', '25']
            ]);

            // TODO test for content, but how should i do...
            xlsxObject.contentType.should.equal("application/octet-stream");
            xlsxObject.filename.should.equal("table.xlsx");
        });
    });
});

