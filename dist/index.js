"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var posts_1 = require("./posts");
var ping_1 = require("./ping");
var app = (0, express_1.default)();
var postsApi = new posts_1.PostsApi();
var pingApi = new ping_1.PingsApi();
var postRouter = express_1.default.Router();
var pingRouter = express_1.default.Router();
var origin = {
    origin: '*',
};
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
//################POSTS END POINT ###################
postRouter.get('/', 
//(req, res) => postsApi.getByTag(req, res)
function (req, res) {
    postsApi.getByTag(req, res);
});
postRouter.get('/:id', 
//(req, res) => postsApi.getByTag(req, res)
function (req, res) { res.send('hello one'); });
//#################PING END POINT###############
pingRouter.get('/', function (req, res) { pingApi.get(req, res); });
app.use('/api/posts', postRouter);
app.use('/api/ping', pingRouter);
var port = process.env.PORT || 3002;
app.listen(port, function () { return console.log("App listening on PORT " + port); });
