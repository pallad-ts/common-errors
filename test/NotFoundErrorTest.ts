import {NotFoundError} from "@src/NotFoundError";
import {runStandardTests} from "./runStandardTests";

describe('NotFoundError', () => {
	const MESSAGE = 'Standard Not Found Error Message';
	runStandardTests(new NotFoundError(MESSAGE), {
		errorName: 'NotFoundError',
		message: MESSAGE
	});

	describe('creating for entity', () => {
		it('without references', () => {
			const error = NotFoundError.entity('User');

			expect(error.message)
				.toMatchSnapshot();
		});

		it('with references', () => {
			const error = NotFoundError.entity('User', {id: 10});

			expect(error.message)
				.toMatchSnapshot();
		});
	});
})
