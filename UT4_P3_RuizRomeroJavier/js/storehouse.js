"use strict";

import {
    BaseException,
    AbstractClassException,
    InvalidAccessConstructorException,
    InvalidValueException,
    EmptyValueException,
    WrongObjectTypeException
} from "./exceptions.js";

class AlreadyExistingCategoryException extends BaseException {
    constructor(category, fileName, lineNumber) {
        super(`Error: The category already exists Category: ${category}`, fileName, lineNumber);
        this.name = "AlreadyExistingCategoryException";
    }
}

class CannotBeDeletedException extends BaseException {
    constructor(name, category, fileName, lineNumber) {
        super(`Error: The ${name} ${category} cannot be deleted.`, fileName, lineNumber);
        this.name = "CannotBeDeletedException";
    }
}

class NotFoundException extends BaseException {
    constructor(name, category, fileName, lineNumber) {
        super(`Error: The ${name} ${category} doesn't exists.`, fileName, lineNumber);
        this.name = "NotFoundException";
    }
}


let StoreHouse = (function () {
    let instantiated;

    function init(storeHouseName) {

        class StoreHouse {
            //Atributos privados
            #stores = new Map();
            #categories = new Map();
            #name;
            /**
             * Constructor for storehouse class
             * @param {*} storeHouseName String
             */
            constructor(storeHouseName = "") {
                if (!new.target) throw new WrongObjectTypeException("Category");
                this.#name = storeHouseName;
                this.#stores.set("DEFAULT", { store: new Store("Default"), products: [] });
                this.#categories.set("DEFAULT", new Category("Default"));
            }


            get name() {
                return this.#name;
            }

            set name(value) {
                if (!value) throw new InvalidValueException("Name", value);
                this.#name = value;
            }

            get categories() {
                return this.#categories.values();
            }

            get stores() {
                return this.#stores.values();
            }

            addCategory(value) {
                if (!(value instanceof Category)) throw new WrongObjectTypeException("Category", value);
                if (this.#categories.has(value)) throw new AlreadyExistingCategoryException(value.title);
                return this.#categories.push(value);
            }

            //!-----------------------------------------------------------
            removeCategory(value) {
                if (!(value instanceof Category)) throw new WrongObjectTypeException("Category");
                if (value.title == this.#categories[0].title) throw new CannotBeDeletedException("Category", value.title);
                if (this.#categories.has(value.title)) throw new NotFoundException("Category", value.name);
            }


        }
        Object.defineProperty(StoreHouse.prototype, "stores", { enumerable: true });
        Object.defineProperty(StoreHouse.prototype, "categories", { enumerable: true });

        let sc = new StoreHouse(storeHouseName);//Devolvemos el objeto StoreHouse para que sea una instancia única.
        Object.freeze(sc);
        return sc;
    } //Fin inicialización del Singleton
    return {
        // Devuelve un objeto con el método getInstance
        getInstance: function (storeHouseName) {
            if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
                instantiated = init(storeHouseName);
            }
            return instantiated; //Si ya está asignado devuelve la asignación.
        }
    };
})();

export {
    StoreHouse,
    AlreadyExistingCategoryException,
    CannotBeDeletedException,
    NotFoundException
};