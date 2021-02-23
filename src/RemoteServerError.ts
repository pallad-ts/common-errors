export class RemoteServerError extends Error {
    code?: string;
    constructor(message: string) {
        super();
        this.message = message;
        this.name = 'RemoteServerError';
    }
}
