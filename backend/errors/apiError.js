module.exports = class APIError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.status = statusCode;
        this.responseMessage = message;
    }
}
