var CSVSheet = (function () {
    function CSVSheet() {
    }

    CSVSheet.prototype.vend = function (data) {
        var csvText = new CSV(data).encode();
        saveAs(new Blob([csvText], {type:"text/csv"}), "table.csv");
    };

    return CSVSheet;
}());
