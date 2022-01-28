"use strict";

import { Product, Plant, Manga, Furniture } from "./entities.js";
import { Coord } from "./coord.js";
import { Store } from "./store.js";
import { Category } from "./category.js";
import { StoreHouse } from "./storehouse.js";
//, NotFoundException, CannotBeDeletedException, AlreadyExistingCategoryException 



function testExamples() {
    console.log("--------------- EJEMPLOS DE CLASES ---------------")

    console.log("Ejemplo Product - exception");
    try {
        let product = new Product('00001', 'name', 3900);
        // Serial: Serial:00001 Name:name Price:3900 Tax:21% Description:  Images: 
        console.log(product.toString());
    } catch (abstractError) {
        console.log(abstractError);
    }

    console.log("Ejemplo Plant");
    let plant = new Plant("0001", "Aqua", 35, "humidity", "perennial", "none", "seagreen");
    plant.ambient = "dryland";
    plant.leaf = "fallen";
    plant.flower = "spring";
    plant.color = "green";
    //Serial:0001  Name:AQUA  Price:35 Tax:4% Description: Images:  Ambient:dryland  Leaf:fallen  Flowerspring Color:green
    console.log(plant.toString());

    console.log("Ejemplo Manga");
    let manga = new Manga("0001", "Chainsawman", 8, "Tatsuki Fujimoto", "Norma Editorial", 13);
    manga.author = "Eichiro Oda";
    manga.publisher = "CD Project red";
    manga.volumes = "24";
    //Serial:0001  Name:CHAINSAWMAN  Price:8 Tax:21% Description: Images:  Author:Eichiro Oda  Publisher:CD Project red  Volumes24
    console.log(manga.toString());

    console.log("Ejemplo Furniture");
    let furniture = new Furniture("01231", "EKEDALEN", 350, "wood", 50, 100, 35);
    furniture.type = "iron";
    furniture.width = 55;
    furniture.hight = 110;
    furniture.deep = 40
    //Serial:01231  Name:EKEDALEN  Price:350 Tax:21% Description: Images:  Type:iron  Width:55cm  Hight100cm Deep:40cm
    console.log(furniture.toString());

    console.log("Ejemplo Coord");
    let coord = new Coord("+120.4", "-12.98");
    coord.latitude = "+77.2";
    coord.longitude = "+20.2";
    //Coordenadas: +77.2, +20.2
    console.log(coord.toString());

    console.log("Ejemplo Store");
    let store = new Store("I.E.S. Maestre de calatrava", "x01020304", new Coord("38.9907863", "-3.9207697"));
    store.name = "Daw'store";
    store.cif = "g40302010";
    store.phone = "987654321";
    store.address = "Paseo de la universidad";
    store.coords = "+123.65,-23.7";
    //Cif:g40302010 Name:Daw'store  Address:Paseo de la universidad Phone:987654321  Coordenadas: +123.65, -23.7
    console.log(store.toString());

    console.log("Ejemplo Category");
    let cat = new Category("Zumos", "Frescos y naturales zumos");
    cat.description = "Todo tipo de sabores";
    //Title:ZUMOS  Description:Todo tipo de sabores
    console.log(cat.toString());
}

function testPlant() {
    console.log("Testeo Plant----------------------");
    let p = new Plant("0001", "Aqua", 35, "humidity", "perennial", "none", "seagreen");
    //Serial:0001  Name:AQUA  Price:35 Tax:4% Description: Images:  Ambient:HUMIDITY  Leaf:PERENNIAL  FlowerNONE Color:SEAGREEN
    console.log(p.toString());
    console.log(p instanceof Plant);
    console.log(p instanceof Product);
    p.ambient = "hot";
    try {
        p.ambient = "fresco";
    } catch (error) {
        //InvalidValueException: Error: The parameter Ambient has an invalid value. (Ambient: fresco)
        console.log(error.toString());
    }
    p.leaf = "fallen";
    try {
        p.leaf = "permanente";
    } catch (error) {
        //InvalidValueException: Error: The parameter Leaf has an invalid value. (Leaf: permanente)
        console.log(error.toString());
    }
    p.flower = "summer";
    try {
        p.flower = "veranito";
    } catch (error) {
        //InvalidValueException: Error: The parameter Flower has an invalid value. (Flower: veranito)
        console.log(error.toString());
    }
    p.color = "cobrizo";
    //Serial:0001  Name:AQUA  Price:35 Tax:4% Description: Images:  Ambient:hot  Leaf:fallen  Flowersummer Color:cobrizo
    console.log(p.toString());
}

function testManga() {
    console.log("Testeo Manga----------------------");
    let m = new Manga("0001", "Chainsawman", 8, "Tatsuki Fujimoto", "Norma Editorial", 13);
    //Serial:0001  Name:CHAINSAWMAN  Price:8 Tax:21% Description: Images:  Author:TATSUKI FUJIMOTO  Publisher:NORMA EDITORIAL  Volumes13
    console.log(m.toString());
    console.log(m instanceof Manga);
    console.log(m instanceof Product);
    m.author = "Eichiro Oda";
    m.publisher = "CD Project red";
    m.volumes = "24";
    //Serial:0001  Name:CHAINSAWMAN  Price:8 Tax:21% Description: Images:  Author:Eichiro Oda  Publisher:CD Project red  Volumes24
    console.log(m.toString());
}

function testFurniture() {
    console.log("Testeo Furniture----------------------");
    let f = new Furniture("01231", "EKEDALEN", 350, "wood", 50, 100, 35);
    //Serial:01231  Name:EKEDALEN  Price:350 Tax:21% Description: Images:  Type:wood  Width:50cm  Hight100cm Deep:35cm
    console.log(f.toString());
    console.log(f instanceof Furniture);
    console.log(f instanceof Product);
    f.type = "iron";
    try {
        f.type = "metalico";
    } catch (error) {
        //InvalidValueException: Error: The parameter Type has an invalid value. (Type: metalico)
        console.log(error.toString());
    }
    f.width = 55;
    try {
        f.width = 0;
    } catch (error) {
        //InvalidValueException: Error: The parameter width has an invalid value. (width: 0)
        console.log(error.toString());
    }
    f.hight = 110;
    try {
        f.height = -0;
    } catch (error) {
        //InvalidValueException: Error: The parameter height has an invalid value. (height: 0)
        console.log(error.toString());
    }
    f.deep = 40
    try {
        f.deep = Number.MIN_SAFE_INTEGER;
    } catch (error) {
        //InvalidValueException: Error: The parameter deep has an invalid value. (deep: -9007199254740991)
        console.log(error.toString());
    }
    //Serial:01231  Name:EKEDALEN  Price:350 Tax:21% Description: Images:  Type:iron  Width:55cm  Hight100cm Deep:40cm
    console.log(f.toString());
}

function testCoord() {
    console.log("Testeo Coord----------------------");
    let c = new Coord("+120.4", "-12.98");
    //Coordenadas: +120.4", "-12.98
    console.log(c.toString());
    console.log(c instanceof Coord);
    c.latitude = "+77.2";
    try {
        c.latitude = "99999";
    } catch (error) {
        //InvalidValueException: Error: The parameter Latitude has an invalid value. (Latitude: 99999)
        console.log(error.toString());
    }
    c.longitude = "+20.2";
    try {
        c.longitude = "-999999";
    } catch (error) {
        //InvalidValueException: Error: The parameter Longitude has an invalid value. (Longitude: -999999)
        console.log(error.toString());
    } console.log("--------")
    c.changeLocation("+90.76, +12");
    console.log("--------")
    try {
        c.changeLocation(new Coord("+12.2", "-10"));
    } catch (error) {
        //InvalidValueException: Error: The parameter Coords has an invalid value. (Coords: Coordenadas: +12.2, -10)
        console.log(error.toString());
    }
    try {
        c.changeLocation("+1233, -1234");
    } catch (error) {
        //InvalidValueException: Error: The parameter Coords has an invalid value. (Coords: +1233, -1234)
        console.log(error.toString());
    }
    //Coordenadas: +90.76, +12
    console.log(c.toString());
}

function testStore() {
    console.log("Testeo Store----------------------");
    let s = new Store("I.E.S. Maestre de calatrava", "x01020304", new Coord("38.9907863", "-3.9207697"));
    //Cif:X01020304 Name:I.E.S. MAESTRE DE CALATRAVA  Address: Phone:  Coordenadas: 38.9907863, -3.9207697
    console.log(s.toString());
    console.log(s instanceof Store);

    s.name = "Daw's";
    s.cif = "g40302010";
    try {
        s.cif = "1232132asdasd";
    } catch (error) {
        //InvalidValueException: Error: The parameter Cif has an invalid value. (Cif: 1232132asdasd)
        console.log(error.toString());
    }
    s.phone = "987654321";
    try {
        s.phone = "12321sad";
    } catch (error) {
        //InvalidValueException: Error: The parameter Phone has an invalid value. (Phone: 12321sad)
        console.log(error.toString());
    }
    s.address = "Paseo de la universidad";
    s.coords = "+123.65,-23.7";
    //Cif:g40302010 Name:Daw's  Address:Paseo de la universidad Phone:987654321  Coordenadas: +123.65, -23.7
    console.log(s.toString());
}

function testCategory() {
    console.log("Ejemplo Category");
    let c = new Category("Zumos", "Frescos y naturales zumos");
    //Title:ZUMOS  Description:Frescos y naturales zumos
    console.log(c.toString());
    console.log(c instanceof Category);
    c.description = "Todo tipo de naranjas";
    //Title:ZUMOS  Description:Todo tipo de naranjas
    console.log(c.toString());
}


testExamples();
// testPlant();
// testManga();
// testFurniture();
// testCoord();
// testStore();
testCategory();

