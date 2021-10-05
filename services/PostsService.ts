import { HttpClient } from "../helpers/HttpClient";
import {Settings} from '../services/CONSTANTS'
import { PostDto } from "../models/dtos/PostDto";
import { ErrorDto } from "../models/dtos/ErrorDto";

export class PostService{
    private _httpClient: HttpClient;

    constructor(){
        this._httpClient = new HttpClient(Settings.BASE_URL);
    }

    public async GetByTag(tag: string): Promise<Array<PostDto>>{
        let postsList  = new Array<PostDto>();
        let posts = this._httpClient.Get(Settings.GET_POSTS_BYTAG_URL(tag)).then((res:any)=>{
           res.posts.forEach((post:any) => {
               postsList.push(new PostDto(post.author, post.authorId, post.id, post.likes, post.popularity, post.reads, post.tags));
           });
           return postsList;
        });
        return posts;
    }
}