"use strict";

import {
    AbstractClassException,
    InvalidAccessConstructorException,
    InvalidValueException,
    EmptyValueException
} from "./exceptions.js";



let Product, Plant, Manga, Furniture;
(() => {
    let abstractCreateLock = true;

    class InternProduct {

        //Atributos static
        static TAXES = 21;

        //Atributos privados
        #serial;
        #name;
        #description;
        #price;
        #tax;
        #images;

        constructor(serial, name, price, tax = InternProduct.TAXES) {
            if (!new.target) throw new InvalidAccessConstructorException();
            if (abstractCreateLock) throw new AbstractClassException("Product");
            abstractCreateLock = true;

            //Validación de argumentos
            if (!serial) throw new EmptyValueException("Serial");
            if (!name) throw new EmptyValueException("Name");
            if (!tax || tax < 0) throw new EmptyValueException("Tax", tax);
            price = Number.parseFloat(price);
            if (!price || price <= 0) throw new InvalidValueException("Price", price);

            //Asignación de atributos
            this.#serial = serial.toUpperCase();
            this.#name = name.toUpperCase();
            this.#price = price;
            this.#tax = tax;
            this.#description = "";
            this.#images = [];
        }

        //GETTER
        get serial() {
            return this.#serial;
        }
        get name() {
            return this.#name;
        }
        get description() {
            return this.#description;
        }
        get price() {
            return this.#price;
        }
        get tax() {
            return this.#tax;
        }
        get images() {
            return [...this.#images];
        }

        //SETTER
        set name(value) {
            if (!value) throw EmptyValueException("Name");
            this.#name = value;
        }
        set description(value) {
            if (!value) throw EmptyValueException("Name");
            this.#description = value;
        }
        set tax(value) {
            if (!value) throw EmptyValueException("Name");
            this.#tax = value;
        }
        set price(value) {
            price = Number.parseFloat(value);
            if (!price || price <= 0) throw new InvalidValueException("Price", value);
            this.#price = price;
        }
        set addImage(value) {
            if (!value) throw new EmptyValueException("Image");
            this.#images.push(value);
        }
        set removeImage(value) {
            if (!value) throw new EmptyValueException("Image");
            let position = this.#images.findIndex((elem) => elem == value);
            if (position == -1) throw InvalidValueException("No existe la imagen", value);
            this.#images.splice(position, 1);
        }

        //METODOS PÚBLICOS
        toString() {
            return `Serial:${this.#serial}  Name:${this.#name}  Price:${this.#price} Tax:${this.#tax}% Description:${this.#description} Images:${this.#images} `;
        }

        priceWithoutTaxes() {
            return this.#price - (this.#price * this.#tax);
        }

        toJSONObject() {
            return {
                serial: this.#serial,
                name: this.#name,
                price: this.#price,
                description: this.#description,
                image: this.#images[0]
            }
        }
    }
    Object.defineProperty(InternProduct.prototype, "serial", { enumerable: true });
    Object.defineProperty(InternProduct.prototype, "name", { enumerable: true });
    Object.defineProperty(InternProduct.prototype, "price", { enumerable: true });
    Object.defineProperty(InternProduct.prototype, "description", { enumerable: true });
    Object.defineProperty(InternProduct.prototype, "tax", { enumerable: true });
    Object.defineProperty(InternProduct.prototype, "images", { enumerable: true });


    class InternPlant extends InternProduct {

        //Atributos static
        static ERAMBIENT = /^(humidity|dryland|hot|cold)$/i         //Confort ambient
        static ERLEAF = /^(perennial|fallen)$/i;                      //Type of leaf
        static ERFLOWER = /^(spring|summer|autumm|winter|none)$/i;  //Flower Season
        static TAXES = 4;

        //Atributos privados
        #ambient;
        #leaf;
        #flower;
        #color;

        constructor(serial, name, price, ambient, leaf, flower = "none", color = "GREEN") {
            if (!new.target) throw new InvalidAccessConstructorException();
            abstractCreateLock = false;
            super(serial, name, price, InternPlant.TAXES);

            //Validación de argumentos
            if (!(InternPlant.ERAMBIENT.test(ambient))) throw new InvalidValueException("Ambient", ambient);
            if (!(InternPlant.ERLEAF.test(leaf))) throw new InvalidValueException("Leaf", leaf);
            if (!(InternPlant.ERFLOWER.test(flower))) throw new InvalidValueException("Flower", flower);
            if (!color) throw new InvalidValueException("Color", color);

            //Asignación de atributos
            this.#ambient = ambient.toUpperCase();
            this.#leaf = leaf.toUpperCase();
            this.#flower = flower.toUpperCase();
            this.#color = color.toUpperCase();
        }

        //GETTER
        get ambient() {
            return this.#ambient;
        }
        get leaf() {
            return this.#leaf;
        }
        get flower() {
            return this.#flower;
        }
        get color() {
            return this.#color;
        }

        //SETTER
        set ambient(value) {
            if (!(InternPlant.ERAMBIENT.test(value))) throw new InvalidValueException("Ambient", value);
            this.#ambient = value;
        }
        set leaf(value) {
            if (!(InternPlant.ERLEAF.test(value))) throw new InvalidValueException("Leaf", value);
            this.#leaf = value;
        }
        set flower(value) {
            if (!(InternPlant.ERFLOWER.test(value))) throw new InvalidValueException("Flower", value);
            this.#flower = value;
        }
        set color(value) {
            if (!(value)) throw new EmptyValueException("Color");
            this.#color = value;
        }

        //Métodos públicos
        toString() {
            return `${super.toString()} Ambient:${this.#ambient}  Leaf:${this.#leaf}  Flower${this.#flower} Color:${this.#color}`;
        }

        toJSONObject() {
            let prod = super.toJSONObject();
            prod.ambient = this.#ambient;
            prod.leaf = this.#leaf;
            prod.flower = this.#flower;
            prod.color = this.#color;

            return prod;
        }
    }
    Object.defineProperty(InternPlant.prototype, "ambient", { enumerable: true });
    Object.defineProperty(InternPlant.prototype, "leaf", { enumerable: true });
    Object.defineProperty(InternPlant.prototype, "flower", { enumerable: true });
    Object.defineProperty(InternPlant.prototype, "color", { enumerable: true });


    class InternManga extends InternProduct {
        //Atributos static
        static TAXES = InternProduct.TAXES;

        //Atributos privados
        #author;
        #publisher;
        /*Volumes sería un array de los tomos existentes, por si en el futuro hay que hacer subclases, pero lo usaremos unicamente para el número de tomos publicados.
        Ej: si hay 7 tomos se tomará que 7 es la cantidad posible a vender.*/
        #volumes;

        constructor(serial, name, price, author = "unknown", publisher = "unknown", volumes = 1) {
            if (!new.target) throw new InvalidAccessConstructorException();
            abstractCreateLock = false;
            super(serial, name, price, InternManga.TAXES);

            //Validación de argumentos
            if (!author) throw new EmptyValueException("Author");
            if (!publisher) throw new EmptyValueException("Publisher");
            let c_vol = Number.parseInt(volumes);
            if (!c_vol || c_vol <= 0) throw new InvalidValueException("Volumes", volumes);

            //Asignación de atributos
            this.#author = author.toUpperCase();
            this.#publisher = publisher.toUpperCase();
            this.#volumes = volumes;
        }

        //GETTER
        get author() {
            return this.#author;
        }
        get publisher() {
            return this.#publisher;
        }
        get volumes() {
            return this.#volumes;
        }

        //SETTER
        set author(value) {
            if (!(value)) throw new EmptyValueException("Author");
            this.#author = value;
        }
        set publisher(value) {
            if (!(value)) throw new EmptyValueException("Publisher");
            this.#publisher = value;
        }
        set volumes(value) {
            let s_vol = Number.parseInt(value);
            if (!s_vol || s_vol <= 0) throw new InvalidValueException("Volumes", volumes);
            this.#volumes = value;
        }

        //Métodos públicos
        toString() {
            return `${super.toString()} Author:${this.#author}  Publisher:${this.#publisher}  Volumes${this.#volumes}`;
        }

        toJSONObject() {
            let prod = super.toJSONObject();
            prod.author = this.#author;
            prod.publisher = this.#publisher;
            prod.volumes = this.#volumes;

            return prod;
        }
    }
    Object.defineProperty(InternManga.prototype, "author", { enumerable: true });
    Object.defineProperty(InternManga.prototype, "publisher", { enumerable: true });
    Object.defineProperty(InternManga.prototype, "volume", { enumerable: true });


    class InternFurniture extends InternProduct {
        //Atributos static
        static TAXES = 12;
        static ERTYPE = /^(Wood|Iron|Cristal|Plastic|Cloth)$/i;
        #type;
        #width;
        #height;
        #deep;

        constructor(serial, name, price, type, width, height, deep) {
            if (!new.target) throw new InvalidAccessConstructorException();
            abstractCreateLock = false;
            super(serial, name, price, InternManga.TAXES);

            if (!(InternFurniture.ERTYPE.test(type))) throw new InvalidValueException("Type", type);
            let c_width = Number.parseInt(width);
            if (!c_width || c_width <= 0) throw new InvalidValueException("Width", width);
            let c_height = Number.parseInt(height);
            if (!c_height || c_height <= 0) throw new InvalidValueException("Height", height);
            let c_deep = Number.parseInt(deep);
            if (!c_deep || c_deep <= 0) throw new InvalidValueException("Deep", deep);

            this.#type = type;
            this.#width = width;
            this.#height = height;
            this.#deep = deep;
        }

        get type() {
            return this.#type;
        }
        get width() {
            return this.#width;
        }
        get height() {
            return this.#height;
        }
        get deep() {
            return this.#deep;
        }
        set type(value) {
            if (!(InternFurniture.ERTYPE.test(value))) throw new InvalidValueException("Type", value);
            this.#type = value;
        }
        set width(value) {
            let s_value = Number.parseInt(value);
            if (!s_value || s_value <= 0) throw new InvalidValueException("Width", value);
            this.#width = value;
        }
        set height(value) {
            let s_value = Number.parseInt(value);
            if (!s_value || s_value <= 0) throw new InvalidValueException("Height", value);
            this.#height = value;
        }
        set deep(value) {
            let s_value = Number.parseInt(value);
            if (!s_value || s_value <= 0) throw new InvalidValueException("Deep", value);
            this.#deep = value;
        }

        toString() {
            return `${super.toString()} Type:${this.#type}  Width:${this.#width}cm  Hight${this.#height}cm Deep:${this.#deep}cm`;
        }

        toJSONObject() {
            let prod = super.toJSONObject();
            prod.material = this.#type;
            prod.width = this.#width;
            prod.height = this.#height;
            prod.deep = this.#deep;

            return prod;
        }
    }
    Object.defineProperty(InternManga.prototype, "type", { enumerable: true });
    Object.defineProperty(InternManga.prototype, "width", { enumerable: true });
    Object.defineProperty(InternManga.prototype, "height", { enumerable: true });
    Object.defineProperty(InternManga.prototype, "deep", { enumerable: true });

    Product = InternProduct;
    Plant = InternPlant;
    Manga = InternManga;
    Furniture = InternFurniture;

})();

export { Product, Plant, Manga, Furniture };