"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
var Settings = /** @class */ (function () {
    function Settings() {
    }
    Settings.BASE_URL = 'https://api.hatchways.io/';
    Settings.GET_POSTS_BYTAG_URL = function (tag) { return "assessment/blog/posts?tag=" + tag; };
    return Settings;
}());
exports.Settings = Settings;
