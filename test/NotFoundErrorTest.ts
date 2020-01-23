import {NotFoundError} from "@src/NotFoundError";

describe('NotFoundError', () => {
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