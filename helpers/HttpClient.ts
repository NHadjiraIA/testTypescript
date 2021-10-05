import axios from 'axios'

export class HttpClient{
    protected _baseUrl:string;

    constructor(baseUrl:string){
        this._baseUrl = baseUrl;
    }
    public Get(url:string){
        return new Promise((resolve, reject) => {
            try {
              axios       
              .get(this._baseUrl+url)
              .then(res => {
                  resolve(res.data);
              })
              .catch(function (err) {
                console.log("get: error", err);
                reject("Error in get method executed by axios!");
            });
            }
            catch (error) {
                console.error("in http Client  > get, Err===", error);
                reject("SYSTEM_ERROR");
            }
          });
        
    }
}