var should = require('chai').should();
var heredoc = require('heredoc');
var jsdom = require("jsdom");
$ = require("jquery")(jsdom.jsdom().createWindow());
_ = require("underscore");

var convertor = require('../src/Converter.js');

describe('Converter', function() {
    var converter = new convertor.Converter();
    describe('#convert2array', function(){
        it('should parse the simple <table> rightly', function(){
            var table = heredoc(function () {/*
<html>
  <body>
    <table class="table">
      <tr>
        <th>name</th>
        <th>age</th>
      </tr>
      <tr>
        <td>John</td>
        <td>23</td>
      </tr>
      <tr>
        <td>George</td>
        <td>25</td>
        <td>Man</td>
      </tr>
    </table>
  </body>
</html>
            */});
            var array = converter.convert2array($(table));
            array.should.deep.equal([['name', 'age'], ['John', '23'], ['George', '25', 'Man']]);
        });
    });
});

