"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessages = void 0;
var ErrorMessages = /** @class */ (function () {
    function ErrorMessages() {
    }
    ErrorMessages.TagsRequiredValidationErrorMessage = "Tags parameter is required";
    ErrorMessages.SortByInvalidErrorMessage = "sortBy parameter is invalid";
    ErrorMessages.FetchPostsNotFoundError = function (tagsArray) { return "Posts with tags: " + tagsArray + " could not be found."; };
    return ErrorMessages;
}());
exports.ErrorMessages = ErrorMessages;
