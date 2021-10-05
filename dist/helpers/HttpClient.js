"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
var axios_1 = __importDefault(require("axios"));
var HttpClient = /** @class */ (function () {
    function HttpClient(baseUrl) {
        this._baseUrl = baseUrl;
    }
    HttpClient.prototype.Get = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                axios_1.default
                    .get(_this._baseUrl + url)
                    .then(function (res) {
                    resolve(res.data);
                })
                    .catch(function (err) {
                    console.log("get: error", err);
                    reject("Error in get method executed by axios!");
                });
            }
            catch (error) {
                console.error("in http Client  > get, Err===", error);
                reject("SYSTEM_ERROR");
            }
        });
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
