import {BaseError} from "@src/BaseError";

export function runStandardTests<T extends BaseError>(error: BaseError, {
	errorName,
	message
}: { errorName: string, message: string }) {
	it('contains proper name', () => {
		expect(error).toHaveProperty('name', errorName);
	});

	it('passed down message', () => {
		expect(error).toHaveProperty('message', message);
	});
}
