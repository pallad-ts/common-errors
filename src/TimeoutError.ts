export class TimeoutError extends Error {
    code?: string;

    constructor(message: string, readonly timeout?: number) {
        super();
        this.message = message;
        this.name = 'TimeoutError';
    }
}
