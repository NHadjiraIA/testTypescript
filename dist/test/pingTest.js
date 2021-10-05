"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var chai_1 = require("chai");
var get = require('../ping.ts').get;
(0, mocha_1.describe)('get', function () {
    it('should return true', function () {
        var message = get();
        console.log(message);
        var expectedOutput = "true";
        // Write your assert statement here
        chai_1.assert.deepEqual(message, expectedOutput);
    });
});
