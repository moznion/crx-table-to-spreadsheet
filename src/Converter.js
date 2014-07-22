var Converter = (function () {
    function Converter () {
    }

    Converter.prototype.convert2array = function ($table) {
        var array = [];

        _($table.find("tr")).forEach(function (tr) {
            var innerArray = [];
            _($(tr).find("td,th")).forEach(function (cell) {
                innerArray.push($(cell).text());
            });
            array.push(innerArray);
        });

        return array;
    };

    return Converter;
})();

if(typeof process !== "undefined" && process.env && process.env.NODE_ENV === 'test') {
   exports.Converter = Converter;
}
