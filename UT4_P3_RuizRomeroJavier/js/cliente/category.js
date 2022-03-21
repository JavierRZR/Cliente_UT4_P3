"use strict";

import { InvalidAccessConstructorException, InvalidValueException, EmptyValueException } from "./exceptions.js";

class Category {
    #title;
    #description;

    constructor(title = "", description = "") {
        if (!(new.target)) throw new InvalidAccessConstructorException();
        if (!title) throw new EmptyValueException("Title");

        this.#title = title.toUpperCase();
        this.#description = description;
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
        return `Title:${this.#title}  Description:${this.#description}`;
    }

    toJSONObject() {
        return {
            title: this.#title,
            description: this.#description
        }
    }

}

Object.defineProperty(Category.prototype, "title", { enumerable: true });
Object.defineProperty(Category.prototype, "description", { enumerable: true });

export { Category }