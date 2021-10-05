import { describe } from 'mocha';
import express, { response } from "express";
import { PostsApi } from '../posts';
import { assert, expect } from 'chai';
var request = require('supertest');

describe('get', function(){
    describe('not params', function(){
      it('Should return 400 because we did not provide tags', function(done){
       let postsApi = new PostsApi();
       var app = express();
       app.get('/api/posts', (req: express.Request, res:express.Response) => {
        postsApi.getByTag(req, res);
       });
       request(app)
       .get('/api/posts')
       .expect('Content-Type', /json/)
       .expect(400, done);
    })
})
});

describe('get', function(){
    describe('with tags', function(){
      it('Should return 200 with 28 posts', function(done){
       let postsApi = new PostsApi();
       var app = express();
       app.get('/api/posts', (req: express.Request, res:express.Response) => {
           req.query.tags = 'tech';
           postsApi.getByTag(req, res);
       });
       request(app)
       .get('/api/posts')
       .expect('Content-Type', /json/)
       .expect(200)
       .then((response: any) => {
           expect(Object.keys(response.body).length).to.be.equal(28);
           done();
        });
    })
})
});
