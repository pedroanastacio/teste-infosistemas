import { MainException } from './MainException';

export class ValidationException extends MainException {

    constructor(message: any) {
        super(message);
        this.statusCode = 400;
        this.name = 'Validation Error'
    }

    toJSON() {
        return {
            name: this.name,
            code: this.statusCode,
            message: this.message
        }
    }
}