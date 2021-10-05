"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var express_1 = __importDefault(require("express"));
var posts_1 = require("../posts");
var chai_1 = require("chai");
var request = require('supertest');
(0, mocha_1.describe)('get', function () {
    (0, mocha_1.describe)('not params', function () {
        it('Should return 400 because we did not provide tags', function (done) {
            var postsApi = new posts_1.PostsApi();
            var app = (0, express_1.default)();
            app.get('/api/posts', function (req, res) {
                postsApi.getByTag(req, res);
            });
            request(app)
                .get('/api/posts')
                .expect('Content-Type', /json/)
                .expect(400, done);
        });
    });
});
(0, mocha_1.describe)('get', function () {
    (0, mocha_1.describe)('with tags', function () {
        it('Should return 200 with 28 posts', function (done) {
            var postsApi = new posts_1.PostsApi();
            var app = (0, express_1.default)();
            app.get('/api/posts', function (req, res) {
                req.query.tags = 'tech';
                postsApi.getByTag(req, res);
            });
            request(app)
                .get('/api/posts')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(function (response) {
                (0, chai_1.expect)(Object.keys(response.body).length).to.be.equal(28);
                done();
            });
        });
    });
});
