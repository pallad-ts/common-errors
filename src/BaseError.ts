export abstract class BaseError extends Error {
	code?: string;
	previousError?: Error;

	constructor(message: string, name: string) {
		super(message);
		this.name = name;
	}
}
