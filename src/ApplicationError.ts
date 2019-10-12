export class ApplicationError extends Error {
    constructor(message: string) {
        super(message);
        this.message = message;
        this.name = 'ApplicationError';
    }
}