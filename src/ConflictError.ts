import {BaseError} from "./BaseError";

/**
 * Indicates that the operation would result in a conflict
 *
 * Examples:
 * * File already exists
 * * User with given name already exists
 */
export class ConflictError extends BaseError {
	constructor(message: string) {
		super(message, 'ConflictError');
	}
}
