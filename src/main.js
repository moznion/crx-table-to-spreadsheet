(function () {
    var $table;

    document.addEventListener("mousedown", function(event){
        $table = $(event.target).closest("table");
    }, true);

    chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
        if(request === "convertTable") {
            if (typeof $table[0] === "undefined") {
                alert("Target is not the table element");
                return;
            }

            var converter = new Converter();
            data = converter.convert2array($table);

            var xlsxSheet = new XLSXSheet();
            xlsxSheet.vend(data);
        }
    });
})();

