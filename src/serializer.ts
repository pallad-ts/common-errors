import {DataNormalizer, Serializer} from "alpha-serializer";
import {NotFoundError} from "./NotFoundError";
import {ApplicationError} from "./ApplicationError";
import {InternalError} from "./InternalError";

const prohibitedProperties = ['message', 'stack'];

function normalizeError(err: Error & { [key: string]: any }) {
    return Object.getOwnPropertyNames(err)
        .filter(propertyName => prohibitedProperties.indexOf(propertyName) === -1)
        .reduce((error: any, propertyName) => {
            if (Object.prototype.propertyIsEnumerable.call(err, propertyName)) {
                error[propertyName] = err[propertyName];
            }
            return error;
        }, {
            message: err.message,
            name: err.name
        });
}

export function setupSerializer(serializer: Serializer) {
    setup(serializer.normalizer, [
        ['Error/NotFound', NotFoundError],
        ['Error/Application', ApplicationError],
        ['Error/Internal', InternalError]
    ]);
}

function setup(normalizer: DataNormalizer, defs: Definition[]) {
    for (const [name, clazz] of defs) {
        normalizer.registerNormalization({
            name,
            clazz,
            normalizer: normalizeError
        });
    }
}

type Definition = [string, any];

export function setupSerializerForStandardErrors(serializer: Serializer<any>) {
    setup(serializer.normalizer, [
        ['Error', global.Error],
        ['TypeError', global.TypeError],
        ['ReferenceError', global.ReferenceError],
    ]);
}