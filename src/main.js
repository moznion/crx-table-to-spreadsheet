(function () {
    var $table;

    document.addEventListener("mousedown", function(event){
        $table = $(event.target).closest("table");
    }, true);

    chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
        if (request instanceof Array && request.length === 2) {
            if (request[0] === "tableToSpreadsheet") {
                if (typeof $table[0] === "undefined") {
                    alert("Target is not the table element");
                    return;
                }

                var converter = new Converter();
                data = converter.convert2array($table);

                var sheet;
                switch (request[1]) {
                    case "csv":
                        sheet = new CSVSheet();
                        break;
                    case "xlsx":
                        sheet = new XLSXSheet();
                        break;
                    default:
                        alert("Invalid output format was specified");
                        return;
                }

                var sheetObj = sheet.vend(data);
                saveAs(new Blob([sheetObj.contents], {type:sheetObj.contentType}), sheetObj.filename);
            }
        }
    });
})();

