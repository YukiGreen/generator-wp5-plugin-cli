'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.urlRootPath = function () {
    return location.href.replace(location.hash, '').replace(/\/$/, '');
};