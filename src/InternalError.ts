export class InternalError extends Error {
    constructor(message: string, previousError?: Error) {
        super();
        Object.defineProperty(this, 'previousError', {
            enumerable: false,
            configurable: false,
            value: previousError
        });
        this.message = message;
        this.name = 'InternalError';
        Object.freeze(this);
    }
}