import {BaseError} from "../../../utils/BaseError";

export class HandeActionError extends BaseError {
    constructor(message: string) {
        super(message);
    }
}