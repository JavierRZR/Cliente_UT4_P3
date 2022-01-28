"use strict";

class Store {
    static ERCIF = /^[A-Z][0-9]{8}$/i;
    static ERPHONE = /^[0-9]{9}$/;

    #cif;
    #name;
    #address;
    #phone;
    #coords;

    constructor(name, cif = "Z99999999", coords = new Coord("+0", "+0")) {
        if (!(new.target)) throw new InvalidAccessConstructorException();
        if (!(Store.ERCIF.test(cif))) throw new InvalidValueException("Cif", cif);
        if (!name) throw new EmptyValueException("Name");
        if (!(coords instanceof Coord)) throw new InvalidValueException("Coord", coords);

        this.#cif = cif.toUpperCase();
        this.#name = name.toUpperCase();
        this.#address = "";
        this.#phone = "";
        this.#coords = coords;
    }

    get cif() {
        return this.#cif;
    }

    get name() {
        return this.#name;
    }

    get address() {
        return this.#address;
    }

    get phone() {
        return this.#phone;
    }

    get coords() {
        return this.#coords.toString();
    }

    set cif(value) {
        if (!(Store.ERCIF.test(value))) throw new InvalidValueException("Cif", value);
        this.#cif = value;
    }

    set name(value) {
        if (!value) throw new EmptyValueException("Name");
        this.#name = value;
    }

    set address(value) {
        if (!value) throw new EmptyValueException("Address");
        this.#address = value;
    }

    set phone(value) {
        if (!(Store.ERPHONE.test(value))) throw new InvalidValueException("Phone",value);
        this.#phone = value;
    }

    set coords(value) {
        if (!value) throw new EmptyValueException("Coord", value);
        this.#coords.changeLocation(value);
    }

    // Métodos públicos
    toString() {
        return this.#cif + ": " + this.#name + " " + this.#address + " " + this.#phone + " " + this.#coords.toString();
    }
}

Object.defineProperty(Store.prototype, "cif", { enumerable: true });
Object.defineProperty(Store.prototype, "name", { enumerable: true });
Object.defineProperty(Store.prototype, "address", { enumerable: true });
Object.defineProperty(Store.prototype, "phone", { enumerable: true });
Object.defineProperty(Store.prototype, "coords", { enumerable: true });