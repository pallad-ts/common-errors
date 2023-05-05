import {BaseError} from "./BaseError";

/**
 * Indicates lack of certain permissions to perform an operation
 */
export class AuthorizationError extends BaseError.withName('AuthorizationError') {

}
