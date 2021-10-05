export class ErrorDto{
    constructor(error:string){
        this.Error = error;
    }
    // Tech debt: We should use a more common error definition for our json api. 
    // A good pattern to consider would be the oData pattern as described here:
    // http://docs.oasis-open.org/odata/odata-json-format/v4.01/odata-json-format-v4.01.html#sec_ErrorResponse
    // For the current version of the api, we will keep the implementation to the requirements but this should be discussed in the future.
    public Error:string;
}