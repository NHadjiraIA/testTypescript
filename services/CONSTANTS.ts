export abstract class Settings{
    public static BASE_URL = 'https://api.hatchways.io/'
    public static GET_POSTS_BYTAG_URL = (tag:string) => `assessment/blog/posts?tag=${tag}`
}
