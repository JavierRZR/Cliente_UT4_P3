"use strict";

import {
    BaseException,
    AbstractClassException,
    InvalidAccessConstructorException,
    InvalidValueException,
    EmptyValueException,
    WrongObjectTypeException
} from "./exceptions.js";
import { Store } from "./store.js";
import { Category } from "./category.js";
import { Product, Plant, Manga, Furniture } from "./entities.js";

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
        super(`Error: The ${name}.title ${category} doesn't exists.`, fileName, lineNumber);
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
                this.#stores.set("DEFAULT", { store: new Store("Default"), products: new Map() });
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

            addCategory(cat) {
                if (!(cat instanceof Category)) throw new WrongObjectTypeException("Category", cat);
                if (this.#categories.has(cat.title)) throw new AlreadyExistingCategoryException(cat.title);
                this.#categories.set(cat.title, cat);
                return this.#categories.size;
            }

            addStore(store) {
                if (!(store instanceof Store)) throw new WrongObjectTypeException("Store", store);
                if (this.#stores.has(store.cif)) throw new AlreadyExistingCategoryException(store.cif);
                this.#stores.set(store.cif,
                    {
                        store: store,
                        products: new Map(),
                    });
                return this.#stores.size;
            }

            addProduct(prod, ...categories) {
                if (!(prod instanceof Product)) throw new WrongObjectTypeException("Product", prod);
                let _categories = [];
                categories.forEach(elem => {
                    if (!(elem instanceof Category)) throw new WrongObjectTypeException("Category", elem);
                    if (!(this.#categories.has(elem.title.toUpperCase()))) throw new NotFoundException("Category", elem);
                    _categories.push(elem.title.toUpperCase())
                });
                this.#stores.get("DEFAULT").products.set(prod.serial,
                    {
                        product: prod,
                        categories: _categories
                    });
                return this.#stores.get("DEFAULT").products.size;
            }

            addProductInShop(prod, store, stock) {
                if (!(prod instanceof Product)) throw new WrongObjectTypeException("Product", prod);
                if (!(store instanceof Store)) throw new WrongObjectTypeException("Store", store);
                let _stock = Number.parseInt(stock);
                if (!_stock || _stock < 0) throw new InvalidValueException("Stock", stock);
                if (!(this.#stores.has(store.cif))) throw new NotFoundException("Store", store.cif);
                if (!(this.#stores.get("DEFAULT").products.has(prod.serial))) throw new NotFoundException("Product", prod.serial);

                let obj = this.#stores.get("DEFAULT").products.get(prod.serial).stock = stock;
                this.#stores.get(store.cif).products.set(prod.serial, obj);

            }
            //!-----------------------------------------------------------
            // removeCategory(value) {
            //     if (!(value instanceof Category)) throw new WrongObjectTypeException("Category");
            //     if (value.title == this.#categories.get("DEFAULT").title) throw new CannotBeDeletedException("Category", value.title);
            //     if (!(this.#categories.has(value.title))) throw new NotFoundException("Category", value.title);

            //     for (const it of this.#stores) {

            //     }

            //     this.#categories.delete(value.title);
            // }


        }
        Object.defineProperty(StoreHouse.prototype, "stores", { enumerable: true });
        Object.defineProperty(StoreHouse.prototype, "categories", { enumerable: true });

        let sh = new StoreHouse(storeHouseName);//Devolvemos el objeto StoreHouse para que sea una instancia única.
        Object.freeze(sh);
        return sh;
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