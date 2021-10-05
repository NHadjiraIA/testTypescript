export class PostDto{
    constructor(author: string, authorId: number, id: number, likes: number, popularity: number, reads: number, tags:Array<string>){
        
        this.Author = author;
        this.AuthorId = authorId;
        this.Id = id;
        this.Likes = likes;
        this.Popularity = popularity;
        this.Reads = reads;
        this.Tags = tags;

    }
    public Author: String;
    public AuthorId: number;
    public Id: number;
    public Likes: number;
    public Popularity: number;
    public Reads: number;
    public Tags:Array<string>
}