import {BaseError} from "./BaseError";

/**
 * Indicates that an entity does not exist.
 */
export class NotFoundError<T = NotFoundError.References> extends BaseError.withName('NotFoundError') {
	constructor(message: string, readonly references?: T) {
		super(message);
		Object.freeze(this);
	}

	/**
	 * Helper that creates new error with formatted message that use entity name and stringified references
	 */
	static entity<T>(name: string, references?: T): NotFoundError<T> {
		const referenceString = references ? getReferencesString(references) : '';
		return new NotFoundError<T>(`${name} not found${referenceString ? ` - ${referenceString}` : ''}`, references)
	}
}

export namespace NotFoundError {
	export interface References {
		[key: string]: unknown;
	}
}

function getReferencesString(references: NotFoundError.References) {
	return Object.keys(references)
		.reduce((result, key) => {
			return result.concat([`${key}: ${references[key]}`]);
		}, [] as string[])
		.join(', ')
}
