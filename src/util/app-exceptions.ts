export class ProductNotFound extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class PinCodeNotFound extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class ValidationException extends Error {
    constructor(message: string) {
        super(message);
    }
}