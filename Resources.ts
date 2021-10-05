export abstract class ErrorMessages{
    public static TagsRequiredValidationErrorMessage = "Tags parameter is required";
    public static SortByInvalidErrorMessage = "sortBy parameter is invalid";
    public static  FetchPostsNotFoundError = (tagsArray:Array<string>) => `Posts with tags: ${tagsArray} could not be found.`;
}