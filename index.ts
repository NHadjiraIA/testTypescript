import express from "express";
import bodyParser from 'body-parser';
import { PostsApi } from "./posts";
import { PingsApi } from "./ping";
import { ErrorDto } from "./models/dtos/ErrorDto";
import {ErrorMessages} from "./Resources"

const app = express();

const postsApi = new PostsApi();
const pingApi = new PingsApi();

const postRouter = express.Router();
const pingRouter = express.Router();
const origin = {
  origin: '*',
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
 
//################POSTS END POINT ###################

postRouter.get('/',
  //(req, res) => postsApi.getByTag(req, res)
  (req, res) => {
      postsApi.getByTag(req, res);
  }
   
)
postRouter.get('/:id',
  //(req, res) => postsApi.getByTag(req, res)
  (req, res) => {res.send('hello one')}
) 
//#################PING END POINT###############
pingRouter.get('/',
(req, res) => {pingApi.get(req, res)}
)
 

app.use('/api/posts', postRouter)
app.use('/api/ping', pingRouter)


const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
 

 

