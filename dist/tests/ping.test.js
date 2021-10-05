"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var express_1 = __importDefault(require("express"));
var request = require('supertest');
var PingsApi = require('../ping').PingsApi;
(0, mocha_1.describe)('get', function () {
    (0, mocha_1.describe)('.route', function () {
        it('Should return 200', function (done) {
            var pingApi = new PingsApi();
            var app = (0, express_1.default)();
            app.get('/api/ping', function (req, res) {
                pingApi.get(req, res);
            });
            request(app)
                .get('/api/ping')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
});
