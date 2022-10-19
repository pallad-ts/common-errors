import {DataNormalizer, Serializer} from "alpha-serializer";
import {NotFoundError} from "./NotFoundError";
import {ApplicationError} from "./ApplicationError";
import {InternalError} from "./InternalError";
import {RemoteServerError} from "./RemoteServerError";
import {TimeoutError} from './TimeoutError';

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

const STANDARD_EXCLUDED_PROPERTIES = ['message', 'name'];

function assignExtraProperties(error: any, currentValue: any, excludedProperties = STANDARD_EXCLUDED_PROPERTIES) {
	for (const [key, value] of Object.entries(currentValue)) {
		if (excludedProperties.includes(key)) {
			continue;
		}
		error[key] = value;
	}
	return error;
}

export function setupSerializer(serializer: Serializer) {
	setup(serializer.normalizer, [
		['Error/NotFound', NotFoundError, value => {
			return assignExtraProperties(
				new NotFoundError(value.message, value.references),
				value,
				[
					...STANDARD_EXCLUDED_PROPERTIES,
					'references'
				]
			);
		}],
		['Error/Application', ApplicationError, value => {
			return assignExtraProperties(
				new ApplicationError(value.message),
				value
			);
		}],
		['Error/Internal', InternalError, value => {
			return assignExtraProperties(
				new InternalError(value.message),
				value
			);
		}],
		['Error/RemoteServer', RemoteServerError, value => {
			return assignExtraProperties(
				new RemoteServerError(value.message),
				value
			);
		}],
		['Error/Timeout', TimeoutError, value => {
			return assignExtraProperties(
				new TimeoutError(value.message, value.timeout),
				value
			);
		}],
		['Error/LimitExceeded', TimeoutError, value => {
			return assignExtraProperties(
				new TimeoutError(value.message, value.timeout),
				value
			);
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
