"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDto = void 0;
var PostDto = /** @class */ (function () {
    function PostDto(author, authorId, id, likes, popularity, reads, tags) {
        this.Author = author;
        this.AuthorId = authorId;
        this.Id = id;
        this.Likes = likes;
        this.Popularity = popularity;
        this.Reads = reads;
        this.Tags = tags;
    }
    return PostDto;
}());
exports.PostDto = PostDto;
