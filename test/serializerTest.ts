import {JSONAdapter, Serializer, DataNormalizer} from "alpha-serializer";
import {setupSerializer, setupSerializerForStandardErrors} from "@src/serializer";
import {InternalError} from "@src/InternalError";
import {NotFoundError} from "@src/NotFoundError";
import {ApplicationError} from "@src/ApplicationError";
import {RemoteServerError} from "@src/RemoteServerError";
import {TimeoutError} from '@src/TimeoutError';


describe('serializer', () => {

    let serializer: Serializer;

    function assertResult(error: any, matchObject: any) {
        const normalized = serializer.normalizer.normalize(error);
        expect(normalized)
            .toMatchSnapshot();

        const denormalized = serializer.normalizer.denormalize(normalized);
        expect(denormalized)
            .toMatchObject(matchObject);

        expect(denormalized)
            .toBeInstanceOf(Object.getPrototypeOf(error).constructor);

        return denormalized;
    }

    beforeEach(() => {
        serializer = new Serializer(new JSONAdapter(), new DataNormalizer());
    });

    describe('common errors', () => {
        beforeEach(() => {
            setupSerializer(serializer);
        });

        it('InternalError', () => {
            const previousError = new Error('foo bar');
            const error = new InternalError('Some internal error', previousError);

            assertResult(error, {
                message: error.message
            });
        });

        it('NotFoundError', () => {
            const error = new NotFoundError('message', {id: 10, type: 'test'});

            assertResult(error, {
                message: error.message,
                references: error.references
            })
        });

        it('TimeoutError', () => {
            const MESSAGE = 'message';

            assertResult(new TimeoutError(MESSAGE, 100), {
                message: MESSAGE,
                timeout: 100
            });

            assertResult(new TimeoutError(MESSAGE), {
                message: MESSAGE
            });
        });

        describe('ApplicationError', () => {
            it('standard', () => {
                const error = new ApplicationError('message');

                assertResult(error, {
                    message: error.message
                })
            })
            it('with code', () => {
                const error = new ApplicationError('message');
                error.code = 'code';

                const denormalized = assertResult(error, {
                    message: error.message
                })

                expect(denormalized.code)
                    .toEqual(error.code);
            });
        });

        it('ApplicationError', () => {
            const error = new RemoteServerError('message');

            assertResult(error, {
                message: error.message
            })
        });
    });

    describe('standard errors', () => {
        beforeEach(() => {
            setupSerializerForStandardErrors(serializer);
        });

        it('TypeError', () => {
            const error = new TypeError('Hello');

            assertResult(error, {
                message: error.message
            })
        });

        it('Error', () => {
            const error = new Error('Hello');

            assertResult(error, {
                message: error.message
            })
        });

        it('ReferenceError', () => {
            const error = new ReferenceError('Hello');

            assertResult(error, {
                message: error.message
            })
        });
    });
});
