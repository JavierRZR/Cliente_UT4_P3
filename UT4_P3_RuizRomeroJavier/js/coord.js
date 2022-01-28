"use strict";

// import { InvalidAccessConstructorException, InvalidValueException } from "./exceptions";

class Coord {

    static ERLATITUDE = /^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180\.0{1,10})$/;
    static ERLONGITUDE = /^[\-\+]?((0|([1-8]\d?))(\.\d{1,10})?|90(\.0{1,10})?)$/;

    #latitude;
    #longitude;

    constructor(latitude, longitude) {
        if (!(new.target)) throw new InvalidAccessConstructorException();
        if (!(Coord.ERLATITUDE.test(latitude))) throw new InvalidValueException("Latitude", latitude);
        if (!(Coord.ERLONGITUDE.test(longitude))) throw new InvalidValueException("Longitude", longitude);

        this.#latitude = latitude;
        this.#longitude = longitude;

    }

    get latitude() {
        return this.#latitude;
    }

    get longitude() {
        return this.#longitude
    }

    set latitude(value) {
        if (!(Coord.ERLATITUDE.test(value))) throw new InvalidValueException("Latitude", value);
        this.#latitude = value;
    }

    set longitude(value) {
        if (!(Coord.ERLONGITUDE.test(value))) throw new InvalidValueException("Longitude", value);
        this.#longitude = value;
    }

    // Métodos públicos
    /**
     * Cadena con las propiedades del objeto listadas.
     * @returns String
     */
    toString() {
        return this.#latitude + ", " + this.#longitude;
    }

    /**
     * Dadas unas coordenadas por String se comprueban y reasignan para cambiar la posición en el mapa.
     * @param {*} coords String
     */
    changeLocation(coords) {
        let coordAr = coords.split(",");
        if (!(Coord.ERLATITUDE.test(coordAr[0].trim()))) throw new InvalidValueException("Latitude", coordAr[0]);
        if (!(Coord.ERLONGITUDE.test(coordAr[1].trim()))) throw new InvalidValueException("Longitude", coordAr[1]);

        this.#latitude = coordAr[0].trim();
        this.#longitude = coordAr[1].trim();
    }



}

Object.defineProperty(Coord.prototype, "latitude", { enumerable: true });
Object.defineProperty(Coord.prototype, "longitude", { enumerable: true });