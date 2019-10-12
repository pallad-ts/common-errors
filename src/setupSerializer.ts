import {Serializer} from "alpha-serializer";
import {NotFoundError} from "./NotFoundError";
import {ApplicationError} from "./ApplicationError";

const prohibitedProperties = ['message', 'stack'];

function normalizeError(err: Error) {
    return Object.getOwnPropertyNames(err)
        .filter(propertyName => prohibitedProperties.indexOf(propertyName) === -1)
        .reduce((error: any, propertyName) => {
            error[propertyName] = err[propertyName];
            return error;
        }, {
            message: err.message,
            name: err.name
        });
}

export function setupSerializer(serializer: Serializer) {
    const errors: Array<[string, any]> = [
        ['Error/NotFound', NotFoundError],
        ['Error/Application', ApplicationError]
    ];

    for (const [name, errorClass] of errors) {
        serializer.normalizer.registerNormalization({
            name: name,
            clazz: errorClass,
            normalizer: normalizeError
        });
    }
}