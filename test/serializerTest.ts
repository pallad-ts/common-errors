import {JSONAdapter, Serializer, DataNormalizer} from "alpha-serializer";
import {setupSerializer, setupSerializerForStandardErrors} from "@src/serializer";
import {InternalError} from "@src/InternalError";
import {NotFoundError} from "@src/NotFoundError";
import {ApplicationError} from "@src/ApplicationError";
import {RemoteServerError} from "@src/RemoteServerError";

describe('serializer', () => {

    let serializer: Serializer;

    beforeEach(() => {
        serializer = new Serializer(new JSONAdapter(), new DataNormalizer());
    });

    describe('common errors', () => {
        beforeEach(() => {
            setupSerializer(serializer);
        });

        it('InternalError', () => {
            const error = new InternalError('Some internal error', new Error('foo bar'));

            expect(serializer.normalizer.normalize(error))
                .toMatchSnapshot();
        });

        it('NotFoundError', () => {
            const error = new NotFoundError('message', {id: 10, type: 'test'});

            expect(serializer.normalizer.normalize(error))
                .toMatchSnapshot();
        });

        it('ApplicationError', () => {
            const error = new ApplicationError('message');

            expect(serializer.normalizer.normalize(error))
                .toMatchSnapshot();
        });

        it('ApplicationError', () => {
            const error = new RemoteServerError('message');

            expect(serializer.normalizer.normalize(error))
                .toMatchSnapshot();
        });
    });

    describe('standard errors', () => {
        beforeEach(() => {
            setupSerializerForStandardErrors(serializer);
        });

        it('TypeError', () => {
            const error = new TypeError('Hello');

            expect(serializer.normalizer.normalize(error))
                .toMatchSnapshot();
        });

        it('Error', () => {
            const error = new Error('Hello');

            expect(serializer.normalizer.normalize(error))
                .toMatchSnapshot();
        });

        it('ReferenceError', () => {
            const error = new ReferenceError('Hello');

            expect(serializer.normalizer.normalize(error))
                .toMatchSnapshot();
        });
    });
});
