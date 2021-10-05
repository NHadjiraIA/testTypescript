import { describe } from 'mocha';
import express from "express";
var request = require('supertest');
const { PingsApi } = require('../ping');

describe('get', function(){
    describe('.route', function(){
      it('Should return 200', function(done){
       let pingApi = new PingsApi();
       var app = express();
       app.get('/api/ping', (req: express.Request, res:express.Response) => {
        pingApi.get(req, res);
       });
       request(app)
       .get('/api/ping')
       .expect('Content-Type', /json/)
       .expect(200, done);
    })
})
});
