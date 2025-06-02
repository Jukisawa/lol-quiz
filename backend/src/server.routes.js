"use strict";
exports.__esModule = true;
exports.routes = void 0;
exports.routes = [
    // index
    { method: 'GET', path: '/', controller: 'index', action: 'index' },
    { method: 'GET', path: '/testDB', controller: 'index', action: 'testDatabase' },
    // init
    { method: 'GET', path: '/resetDB', controller: 'init', action: 'resetDatabase' },
];
