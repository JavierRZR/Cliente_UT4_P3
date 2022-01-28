'use strict';

class BaseException extends Error {
    constructor(message = "", fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = "BaseException";
        Error.captureStackTrace ? Error.captureStackTrace(this, BaseException) : "";
    }
}


//Excepción acceso inválido a constructor
class InvalidAccessConstructorException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Constructor can't be called as a function.", fileName, lineNumber);
        this.name = "InvalidAccessConstructorException";
    }
}


class EmptyValueException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The parameter " + param + "can't be empty", fileName, lineNumber);
        this.param = param;
        this.name = "EmptyValueException";
    }
}

class InvalidValueException extends BaseException {
    constructor(param, value, fileName, lineNumber) {
        super(`Error: The parameter ${param} has an invalid value. (${param}: ${value})`, fileName, lineNumber);
        this.param = param;
        this.name = "InvalidValueException";
    }
}

class AbstractClassException extends BaseException {
    constructor(className, fileName, lineNumber) {
        super(`Error: The class ${className} can't be instantiated.`, fileName, lineNumber);
        this.name = "AbstractClassException";
    }
}

class WrongObjectTypeException extends BaseException {
    constructor(className, fileName, lineNumber) {
        super(`Error: The object doesn't match the required one. Required: ${className}`, fileName, lineNumber);
        this.name = "WrongObjectTypeException";
    }
}
