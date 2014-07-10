table-to-spreadsheet [![Build Status][travis-image]][travis-url]
====================

Chrome extension to provide the CSV or XLSX that is converted from the table element by context menu

Overview
--------

![overview](https://dl.dropboxusercontent.com/u/14832699/crx-table-to-spreadsheet/overview.png)

For Developers
--------------

Setup sequence to develop is follows;

1. npm install
2. ./node\_modules/.bin/bower install
3. ./node\_modules/.bin/gulp

Known Bugs
----------

This extension cannot treat nested table elements. I wonder should I do...

License
-------

```
Copyright 2014 moznion

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

[travis-url]: https://travis-ci.org/moznion/crx-table-to-spreadsheet
[travis-image]: https://travis-ci.org/moznion/crx-table-to-spreadsheet.svg?branch=master
