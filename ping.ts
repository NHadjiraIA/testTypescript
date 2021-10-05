import express from "express";

export class PingsApi{
    async get(req: express.Request, res: express.Response){
           let  result = {
                "success" : true
            }
            return res.status(200).json(result);
    }
}

