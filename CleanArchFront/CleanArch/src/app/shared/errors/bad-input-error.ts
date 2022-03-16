import { AppError } from "./app-error";

export class BadInputError extends AppError{
    constructor(public originalError:any) {
        super(originalError);
    }
}