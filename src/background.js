(function () {
    var topLevelIdentifier = "tableToSpreadsheet";

    chrome.contextMenus.create({
        type: "normal",
        title: "Convert table to csv",
        contexts: ["page"],
        onclick: function (info, tab) {
            chrome.tabs.sendRequest(tab.id, [topLevelIdentifier, "csv"]);
        }
    });

    chrome.contextMenus.create({
        type: "normal",
        title: "Convert table to xlsx",
        contexts: ["page"],
        onclick: function (info, tab) {
            chrome.tabs.sendRequest(tab.id, [topLevelIdentifier, "xlsx"]);
        }
    });
})();

