export class NotFoundError<T = NotFoundError.References> extends Error {
	constructor(message: string, readonly references?: T) {
		super(message);
		this.message = message;
		this.name = 'NotFoundError';
		Object.freeze(this);
	}

	static entity<T>(name: string, references?: T): NotFoundError<T> {
		const referenceString = references ? getReferencesString(references) : '';
		return new NotFoundError<T>(`${name} not found${referenceString ? ` - ${referenceString}` : ''}`, references)
	}
}

export namespace NotFoundError {
	export interface References {
		[key: string]: any
	}
}

function getReferencesString(references: NotFoundError.References) {
	return Object.keys(references)
		.reduce((result, key) => {
			return result.concat([`${key}: ${references[key]}`]);
		}, [] as string[])
		.join(', ')
}
