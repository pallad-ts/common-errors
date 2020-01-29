export class RemoteServerError extends Error {
    constructor(message: string) {
        super();
        this.message = message;
        this.name = 'RemoteServerError';
    }
}