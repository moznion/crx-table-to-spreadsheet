var XLSXSheet = (function () {
    function XLSXSheet() {
    }

    function sheet_from_array_of_arrays(data, opts) {
        var ws = {};
        var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0}};
        for(var R = 0; R != data.length; ++R) {
            for(var C = 0; C != data[R].length; ++C) {
                if(range.s.r > R) range.s.r = R;
                if(range.s.c > C) range.s.c = C;
                if(range.e.r < R) range.e.r = R;
                if(range.e.c < C) range.e.c = C;

                var cell = {v: data[R][C]};
                if (cell.v == null) {
                    continue;
                }

                var cell_ref = XLSX.utils.encode_cell({c:C,r:R});

                if (typeof cell.v === 'number') {
                    cell.t = 'n';
                } else {
                    cell.t = 's';
                }

                ws[cell_ref] = cell;
            }
        }

        if (range.s.c < 10000000) {
            ws['!ref'] = XLSX.utils.encode_range(range);
        }

        return ws;
    }

    function Workbook() {
        if(!(this instanceof Workbook)) return new Workbook();
        this.SheetNames = [];
        this.Sheets = {};
    }

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }

    // data: Array[Array[any]]
    XLSXSheet.prototype.vend = function (data) {
        var wb = new Workbook();
        var ws = sheet_from_array_of_arrays(data);
        var ws_name = "";

        wb.SheetNames.push(ws_name);
        wb.Sheets[ws_name] = ws;

        var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'binary'});
        saveAs(new Blob([s2ab(wbout)], {type:"application/octet-stream"}), "table.xlsx");
    };

    return XLSXSheet;
})();

