export class BaseError extends Error {
	code?: string;

	static withName(name: string) {
		return class extends BaseError {
			name = name;
		}
	}
}
