export class LimitExceededError<T> extends Error {
    constructor(message: string, readonly payload: T) {
        super(message);
        this.message = message;
        this.name = 'LimitExceeded';
        Object.freeze(this);
    }
}
