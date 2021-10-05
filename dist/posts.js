"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsApi = void 0;
var ErrorDto_1 = require("./models/dtos/ErrorDto");
var Resources_1 = require("./Resources");
var PostsService_1 = require("./services/PostsService");
var PostsApi = /** @class */ (function () {
    function PostsApi() {
        this._postsService = new PostsService_1.PostService();
    }
    PostsApi.prototype.getByTag = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var tagsArray, isSortByValid, isDirectionValid, sortBy, direction;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tagsArray = String(req.query.tags).split(',');
                        if (!req.query.tags) {
                            return [2 /*return*/, res.status(400).json(new ErrorDto_1.ErrorDto(Resources_1.ErrorMessages.TagsRequiredValidationErrorMessage))];
                        }
                        isSortByValid = this.ValidateSortBy(req);
                        isDirectionValid = this.ValidateDirection(req);
                        if (!isDirectionValid || !isSortByValid) {
                            return [2 /*return*/, res.status(400).json(new ErrorDto_1.ErrorDto(Resources_1.ErrorMessages.SortByInvalidErrorMessage))];
                        }
                        sortBy = req.query.sortBy == undefined ? "Id" : String(req.query.sortBy);
                        direction = req.query.direction == undefined ? "asc" : String(req.query.direction);
                        return [4 /*yield*/, Promise.all(tagsArray.map(function (t) { return _this._postsService.GetByTag(t); })).then(function (arrays) {
                                var posts = new Array();
                                posts = _this.mergeArrays(arrays);
                                //filter all the posts that only correspond to all the tags we received
                                var filteredPosts = posts.filter(function (post) { return tagsArray.some(function (tag) { return post.Tags.includes(tag); }); });
                                var sortedPosts = _this.SortBy(filteredPosts, sortBy, direction);
                                if (sortedPosts) {
                                    return res.status(200).json(sortedPosts);
                                }
                                else {
                                    return res.status(404).send(Resources_1.ErrorMessages.FetchPostsNotFoundError(tagsArray));
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostsApi.prototype.mergeArrays = function (arrays) {
        var jointArray = new Array();
        arrays.forEach(function (array) {
            jointArray = jointArray.concat(array);
        });
        var mapArray = new Map();
        for (var _i = 0, jointArray_1 = jointArray; _i < jointArray_1.length; _i++) {
            var post = jointArray_1[_i];
            mapArray.set(post.Id, post);
        }
        return Array.from(mapArray.values());
    };
    PostsApi.prototype.getSortByField = function (fieldName) {
        switch (fieldName.toUpperCase()) {
            case "ID": {
                return "Id";
            }
            case "READS": {
                return "Reads";
            }
            case "LIKES": {
                return "Likes";
            }
            case "POPULARITY": {
                return "Popularity";
            }
            default: {
                return "Id";
            }
        }
    };
    PostsApi.prototype.SortBy = function (posts, sortBy, direction) {
        //Extra code part 'Id'|'Reads'|'Likes'|'Popularity' is needed because of javascript non typed aspect. 
        //for more info check: https://github.com/Microsoft/TypeScript/issues/14951
        var sortByField = this.getSortByField(sortBy);
        return posts.sort(function (a, b) {
            var aValue = a[sortByField];
            var bValue = b[sortByField];
            return (direction.toUpperCase() == "ASC" ? 1 : -1) * (aValue - bValue);
        });
    };
    PostsApi.prototype.ValidateSortBy = function (req) {
        var validValues = ["ID", "READS", "LIKES", "POPULARITY"];
        if ((req.query.sortBy) && (!validValues.includes(String(req.query.sortBy).toUpperCase()))) {
            //Value provided is not an expected one
            return false;
        }
        return true;
    };
    PostsApi.prototype.ValidateDirection = function (req) {
        var validValues = ["ASC", "DESC"];
        if ((req.query.direction) && (!validValues.includes(String(req.query.direction).toUpperCase()))) {
            //Value provided is not an expected one
            return false;
        }
        return true;
    };
    return PostsApi;
}());
exports.PostsApi = PostsApi;
