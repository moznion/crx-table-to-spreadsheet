(function () {
    chrome.contextMenus.create({
        type: "normal",
        title: "Convert table to spreadsheet",
        contexts: ["page"],
        onclick: function (info, tab) {
            chrome.tabs.sendRequest(tab.id, "convertTable");
        }
    });
})();

