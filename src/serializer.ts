import {DataNormalizer, Serializer} from "alpha-serializer";
import {NotFoundError} from "./NotFoundError";
import {ApplicationError} from "./ApplicationError";
import {InternalError} from "./InternalError";
import {RemoteServerError} from "./RemoteServerError";

const prohibitedProperties = ['message', 'stack'];

export function normalizeError(err: Error & { [key: string]: any }) {
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
        ['Error/NotFound', NotFoundError, value => {
            return new NotFoundError(value.message, value.references)
        }],
        ['Error/Application', ApplicationError, value => {
            return new ApplicationError(value.message);
        }],
        ['Error/Internal', InternalError, value => {
            return new InternalError(value.message);
        }],
        ['Error/RemoteServer', RemoteServerError, value => {
            return new RemoteServerError(value.message);
        }]
    ]);
}

function setup(normalizer: DataNormalizer, defs: Definition[]) {
    for (const [name, clazz, denormalizer] of defs) {
        normalizer.registerNormalization({
            name,
            clazz,
            normalizer: normalizeError,
            denormalizer
        });
    }
}

type Definition = [string, any, ((value: any) => any) | undefined];

export function setupSerializerForStandardErrors(serializer: Serializer<any>) {
    setup(serializer.normalizer, [
        ['Error', global.Error, value => {
            return new Error(value.message);
        }],
        ['TypeError', global.TypeError, value => {
            return new TypeError(value.message);
        }],
        ['ReferenceError', global.ReferenceError, value => {
            return new ReferenceError(value.message);
        }],
    ]);
}