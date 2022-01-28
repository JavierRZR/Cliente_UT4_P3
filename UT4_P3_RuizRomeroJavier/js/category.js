"use strict";

class Category {
    #title;
    #description;

    constructor(title = "") {
        if (!(new.target)) throw new InvalidAccessConstructorException();
        if (!title) throw new EmptyValueException("Title");

        this.#title = title.toUpperCase();
        this.#description = "";
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        if (!value) throw InvalidValueException("Description", value);
        this.#description = value;
    }

    toString() {
        return this.#title + ": " + this.#description;
    }

}

Object.defineProperty(Category.prototype, "title", { enumerable: true });
Object.defineProperty(Category.prototype, "description", { enumerable: true });
