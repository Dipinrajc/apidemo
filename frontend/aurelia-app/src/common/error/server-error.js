export class ServerError extends Error {
    
    constructor(error) {
        var message = error.errorMessage ||  error.error;
        super(message);
        this.name = "ServerError";
        var code = error.errorCode || error.status;
        this.errorCode = code;
    }
}