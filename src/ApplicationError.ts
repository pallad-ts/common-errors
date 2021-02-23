export class ApplicationError extends Error {
    code?: string;
    constructor(message: string) {
        super(message);
        this.message = message;
        this.name = 'ApplicationError';
    }
}
