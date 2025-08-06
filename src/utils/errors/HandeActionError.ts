import {BaseError} from "./BaseError";

export class HandeActionError extends BaseError {
    constructor(message: string) {
        super(message);
    }
}