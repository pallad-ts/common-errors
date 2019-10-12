export class NotFoundError<T = { [key: string]: any }> extends Error {
    constructor(message: string, readonly references?: T) {
        super(message);
        this.message = message;
        this.name = 'NotFoundError';
        Object.freeze(this);
    }

    static entity(name: string, reference: { [key: string]: any }) {
        const referenceString = Object.keys(reference)
            .reduce((result, key) => {
                return result.concat([`${key}: ${reference[key]}`]);
            }, [] as string[])
            .join(', ');
        new NotFoundError(`${name} not found${referenceString ? ` ${referenceString}` : ''}`)
    }
}