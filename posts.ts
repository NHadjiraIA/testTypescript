import express, { request } from "express";
import { ErrorDto } from "./models/dtos/ErrorDto";
import { PostDto } from "./models/dtos/PostDto";
import { ErrorMessages } from "./Resources";
import  {PostService} from './services/PostsService'

export class PostsApi{
    private _postsService:any;
    constructor(){
        this._postsService = new PostService();
    }
    
    async getByTag(req: express.Request, res: express.Response){
        //validations
        var tagsArray = String(req.query.tags).split(',')
        if(!req.query.tags){
            return res.status(400).json(new ErrorDto(ErrorMessages.TagsRequiredValidationErrorMessage));
        }
        //validate sortBy
        let isSortByValid = this.ValidateSortBy(req);
        //Validate direction
        let isDirectionValid = this.ValidateDirection(req);
        if(!isDirectionValid || !isSortByValid){
            return res.status(400).json(new ErrorDto(ErrorMessages.SortByInvalidErrorMessage));
        }
        
        let sortBy = req.query.sortBy == undefined ? "Id" : String(req.query.sortBy);
        let direction = req.query.direction == undefined ? "asc" : String(req.query.direction);
        
        await Promise.all(tagsArray.map(t => this._postsService.GetByTag(t))).then((arrays)=> {
            let posts = new Array<PostDto>();
            posts = this.mergeArrays(arrays);
            //filter all the posts that only correspond to all the tags we received
            let filteredPosts = posts.filter((post:PostDto) => tagsArray.some((tag:string) => post.Tags.includes(tag)));
            let sortedPosts = this.SortBy(filteredPosts, sortBy, direction);

            if(sortedPosts){
                return res.status(200).json(sortedPosts);
            }
            else{
                return res.status(404).send(ErrorMessages.FetchPostsNotFoundError(tagsArray))
            }
        });
    }

    private mergeArrays(arrays:Array<Array<PostDto>>) {
        let jointArray = new Array<PostDto>();
    
        arrays.forEach(array => {
            jointArray = jointArray.concat(array);
        })
        
        let mapArray = new Map();
        for(const post of jointArray) {
          mapArray.set(post.Id, post);
        }
        return Array.from(mapArray.values());
    }

    private getSortByField(fieldName:string){
        switch(fieldName.toUpperCase()){
            case "ID":{
                return "Id";
            }
            case "READS":{
                return "Reads";
            }
            case "LIKES":{
                return "Likes";
            }
            case "POPULARITY":{
                return "Popularity"
            }
            default:{
                return "Id";
            }
        }
    }

    private SortBy(posts: Array<PostDto>, sortBy:string, direction:string): Array<PostDto>{
        //Extra code part 'Id'|'Reads'|'Likes'|'Popularity' is needed because of javascript non typed aspect. 
        //for more info check: https://github.com/Microsoft/TypeScript/issues/14951
        let sortByField: 'Id'|'Reads'|'Likes'|'Popularity' = this.getSortByField(sortBy);
        return posts.sort((a, b) => {
            let aValue: number = a[sortByField];
            let bValue: number = b[sortByField]
            return (direction.toUpperCase() == "ASC" ? 1 : -1) * (aValue - bValue);
        });
    }

    private ValidateSortBy(req: express.Request){
        let validValues = ["ID", "READS", "LIKES", "POPULARITY"];
        if((req.query.sortBy) && (!validValues.includes(String(req.query.sortBy).toUpperCase()))){
            //Value provided is not an expected one
            return false;
        }
        return true;
    }

    private ValidateDirection(req: express.Request){
        let validValues = ["ASC", "DESC"];
        if((req.query.direction) && (!validValues.includes(String(req.query.direction).toUpperCase()))){
            //Value provided is not an expected one
            return false;
        }
        return true;
    }
}

