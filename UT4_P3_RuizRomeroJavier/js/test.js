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
    console.log("")
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
    console.log("")
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
    console.log("")
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
    console.log("")
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
    }
    c.changeLocation("+90.76, +12");
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
    console.log("")
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
    console.log("")
    console.log("Ejemplo Category");
    let c = new Category("Zumos", "Frescos y naturales zumos");
    //Title:ZUMOS  Description:Frescos y naturales zumos
    console.log(c.toString());
    console.log(c instanceof Category);
    c.description = "Todo tipo de naranjas";
    //Title:ZUMOS  Description:Todo tipo de naranjas
    console.log(c.toString());
}


function testStoreHouse() {
    console.log("--------------- Test StoreHouse ---------------")
    let sh = StoreHouse.getInstance("UT4_P3");

    //Stores
    let s1 = new Store("TO", "t98765432", new Coord("+72.32", "+55.121"));
    let s2 = new Store("AL", "a54326789", new Coord("+123.123", "-0.12"));
    let s3 = new Store("CR", "c01234567", new Coord("+90", "-12"));
    sh.addStore(s1); sh.addStore(s2); sh.addStore(s3);

    //Categories
    let c1 = new Category("plants", "Just plants");
    let c2 = new Category("Lecture", "Anything you can read");
    let c3 = new Category("Decoration", "Decoration articles");
    sh.addCategory(c1); sh.addCategory(c2); sh.addCategory(c3);

    //Products
    let m1 = new Manga("0001", "Chainsawman", 8, "Tatsuki Fujimoto", "Norma Editorial", 13);
    let m2 = new Manga("0002", "One Piece", 6, "Eichiro Oda", "Norma Editorial", 103);
    let p1 = new Plant("0003", "Aqua", 35, "humidity", "perennial", "spring", "seagreen");
    let p2 = new Plant("0004", "Serpent", 21, "hot", "perennial", "none", "black, green");
    let f1 = new Furniture("0005", "EKEDALEN", 350, "wood", 50, 100, 35);
    let f2 = new Furniture("0006", "Secret Lab's chairs", 499, "cloth", 70, 130, 50);
    sh.addProduct(m1, c2, c3); sh.addProduct(m2, c2, c3); sh.addProduct(p1, c1);
    sh.addProduct(p2, c1); sh.addProduct(f1, c3); sh.addProduct(f2, c3);

    //Contenido
    console.log("Nombre de storehouse-------------");
    sh.name = "UT4_P3_RRJ";
    console.log(sh.name);
    //UT4_P3_RRJ

    console.log("")
    console.log("Tiendas en storehouse------------");
    for (const it of sh.stores) {
        console.log(it.toString());
    }
    // Cif:Z99999999 Name:DEFAULT  Address: Phone: Coordenadas: +0, +0
    // Cif:T98765432 Name:TO  Address: Phone: Coordenadas: +72.32, +55.121
    // Cif:A54326789 Name:AL  Address: Phone: Coordenadas: +123.123, -0.12
    // Cif:C01234567 Name:CR  Address: Phone: Coordenadas: +90, -12
    
    console.log("")
    console.log("Categorias en storehouse---------");
    for (const it of sh.categories) {
        console.log(it.toString());
    }
    // Title:DEFAULT  Description:
    // Title:PLANTS  Description:Just plants
    // Title:LECTURE  Description:Anything you can read
    // Title:DECORATION  Description:Decoration articles

    //Añadir productos en las tiendas
    console.log("")
    console.log("Añadir productos a tiendas--------");
    console.log("Tienda TO");
    sh.addProductInStore(m1, s1, 20); sh.addProductInStore(m2, s1, 35);
    sh.addProductInStore(p1, s1, 3); sh.addProductInStore(p2, s1, 5);
    sh.addProductInStore(f1, s1, 1); sh.addProductInStore(f2, s1, 17);
    for (const it of sh.getStoreProducts(s1)) {
        console.log(it.product + " Stock:" + it.stock);
    }
    // Serial: 0001  Name:CHAINSAWMAN  Price: 8 Tax: 21 % Description: Images: Author:TATSUKI FUJIMOTO  Publisher:NORMA EDITORIAL  Volumes13 Stock: 20
    // Serial: 0002  Name:ONE PIECE  Price: 6 Tax: 21 % Description: Images: Author:EICHIRO ODA  Publisher:NORMA EDITORIAL  Volumes103 Stock: 35
    // Serial: 0003  Name:AQUA  Price: 35 Tax: 4 % Description: Images: Ambient:HUMIDITY  Leaf:PERENNIAL  FlowerSPRING Color:SEAGREEN Stock: 3
    // Serial: 0004  Name:SERPENT  Price: 21 Tax: 4 % Description: Images: Ambient:HOT  Leaf:PERENNIAL  FlowerNONE Color: BLACK, GREEN Stock: 5
    // Serial: 0005  Name:EKEDALEN  Price: 350 Tax: 21 % Description: Images: Type:wood  Width: 50cm  Hight100cm Deep: 35cm Stock: 1
    // Serial: 0006  Name:SECRET LAB'S CHAIRS  Price:499 Tax:21% Description: Images:  Type:cloth  Width:70cm  Hight130cm Deep:50cm Stock:17

    console.log("Tienda AL")
    sh.addProductInStore(p1, s2, 6); sh.addProductInStore(p2, s2, 12);
    for (const it of sh.getStoreProducts(s2)) {
        console.log(it.product + " Stock:" + it.stock);
    }
    // Serial: 0003  Name:AQUA  Price: 35 Tax: 4 % Description: Images: Ambient:HUMIDITY  Leaf:PERENNIAL  FlowerSPRING Color:SEAGREEN Stock: 6
    // Serial: 0004  Name:SERPENT  Price: 21 Tax: 4 % Description: Images: Ambient:HOT  Leaf:PERENNIAL  FlowerNONE Color: BLACK, GREEN Stock: 12

    console.log("Tienda CR")
    sh.addProductInStore(f1, s3, 6); sh.addProductInStore(f2, s3, 11);
    for (const it of sh.getStoreProducts(s3)) {
        console.log(it.product + " Stock:" + it.stock);
    }
    // Serial: 0005  Name:EKEDALEN  Price: 350 Tax: 21 % Description: Images: Type:wood  Width: 50cm  Hight100cm Deep: 35cm Stock: 6
    // Serial: 0006  Name:SECRET LAB'S CHAIRS  Price:499 Tax:21% Description: Images:  Type:cloth  Width:70cm  Hight130cm Deep:50cm Stock:11

    //Actualizar stock
    console.log("")
    console.log("Actualizar stock en tienda--------");
    console.log("Antes:");
    for (const it of sh.getStoreProducts(s3)) {
        console.log(it.product + " Stock:" + it.stock);
    }
    // Serial: 0005  Name:EKEDALEN  Price: 350 Tax: 21 % Description: Images: Type:wood  Width: 50cm  Hight100cm Deep: 35cm Stock: 9
    // Serial: 0006  Name:SECRET LAB'S CHAIRS  Price:499 Tax:21% Description: Images:  Type:cloth  Width:70cm  Hight130cm Deep:50cm Stock:16

    sh.addQuantityProductInStore(f1, s3, 3);
    sh.addQuantityProductInStore(f2, s3, 5);
    console.log("Despues:");
    for (const it of sh.getStoreProducts(s3)) {
        console.log(it.product + " Stock:" + it.stock);
    }
    // Serial: 0005  Name:EKEDALEN  Price: 350 Tax: 21 % Description: Images: Type:wood  Width: 50cm  Hight100cm Deep: 35cm Stock: 9
    // Serial: 0006  Name:SECRET LAB'S CHAIRS  Price:499 Tax:21% Description: Images:  Type:cloth  Width:70cm  Hight130cm Deep:50cm Stock:16

    //Borrado de elementos
    console.log("")
    console.log("Eliminar una categoría (title: DECORATION)--------");
    console.log("Antes:");
    for (const it of sh.categories) {
        console.log(it.toString());
    }
    // Title:DEFAULT  Description:
    // Title:PLANTS  Description:Just plants
    // Title:LECTURE  Description:Anything you can read
    // Title:DECORATION  Description:Decoration articles

    sh.removeCategory(c3);
    console.log("Despues:");
    for (const it of sh.categories) {
        console.log(it.toString());
    }
    // Title:DEFAULT  Description:
    // Title:PLANTS  Description:Just plants
    // Title:LECTURE  Description:Anything you can read

    console.log("")
    console.log("Eliminar una tienda (name= AL)--------");
    console.log("Antes:");
    for (const it of sh.stores) {
        console.log(it.toString());
    }
    // Cif:Z99999999 Name:DEFAULT  Address: Phone: Coordenadas: +0, +0
    // Cif:T98765432 Name:TO  Address: Phone: Coordenadas: +72.32, +55.121
    // Cif:A54326789 Name:AL  Address: Phone: Coordenadas: +123.123, -0.12
    // Cif:C01234567 Name:CR  Address: Phone: Coordenadas: +90, -12

    sh.removeStore(s2);
    console.log("Despues:");
    for (const it of sh.stores) {
        console.log(it.toString());
    }
    // Cif:Z99999999 Name:DEFAULT  Address: Phone: Coordenadas: +0, +0
    // Cif:T98765432 Name:TO  Address: Phone: Coordenadas: +72.32, +55.121
    // Cif:C01234567 Name:CR  Address: Phone: Coordenadas: +90, -12

    console.log("")
    console.log("Eliminar un producto (serial = 0006)--------");
    console.log("Antes: (ejemplo: Tienda 2)");
    for (const it of sh.getStoreProducts(s3)) {
        console.log(it.product.toString());
    }

    sh.removeProduct(f2);
    console.log("Despues: (ejemplo: Tienda 2)");
    for (const it of sh.getStoreProducts(s3)) {
        console.log(it.product.toString());
    }



    console.log("-----------------EXCEPCIONES------------------------")
    console.log("getter - setter nombre");
    try {
        sh.name = "";
    } catch (error) {
        console.log(error.toString());
    }

    console.log("")
    console.log("addCategory");
    try {
        sh.addCategory();
    } catch (error) {
        console.log(error.toString());
    }
    try {
        sh.addCategory(c1);
    } catch (error) {
        console.log(error.toString());
    }

    console.log("")
    console.log("removeCategory")
    try {
        sh.removeCategory(new Category("noexisto"));
    } catch (error) {
        console.log(error.toString());
    }

    console.log("")
    console.log("addProduct")
    try {
        sh.addProduct();
    } catch (error) {
        console.log(error.toString());
    }

    console.log("")
    console.log("removeProduct")
    try {
        sh.removeProduct(new Plant("9955", "Aqua", 35, "humidity", "perennial", "spring", "seagreen"));
    } catch (error) {
        console.log(error.toString());
    }

    console.log("")
    console.log("addProductInStore")
    try {
        sh.addProductInStore(new Plant("9955", "Aqua", 35, "humidity", "perennial", "spring", "seagreen"), s1, 5);
    } catch (error) {
        console.log(error.toString());
    }
    try {
        sh.addProductInStore(m1, s2, 5);
    } catch (error) {
        console.log(error.toString());
    }

    console.log("")
    console.log("addQuantityProductInStore")
    try {
        sh.addQuantityProductInStore(new Plant("9955", "Aqua", 35, "humidity", "perennial", "spring", "seagreen"), s1, 5);
    } catch (error) {
        console.log(error.toString());
    }
    try {
        sh.addProductInStore(m1, s2, 5);
    } catch (error) {
        console.log(error.toString());
    }
    try {
        sh.addProductInStore(m1, s3, -9);
    } catch (error) {
        console.log(error.toString());
    }

    console.log("")
    console.log("getCategoryProduct");
    try {
        sh.getCategoryProducts();
    } catch (error) {
        console.log(error.toString());
    }

    console.log("")
    console.log("addStore");
    try {
        sh.addStore();
    } catch (error) {
        console.log(error.toString());
    }
    try {
        sh.addStore(s1);
    } catch (error) {
        console.log(error.toString());
    }

    console.log("")
    console.log("removeStore")
    try {
        sh.removeStore(s2);
    } catch (error) {
        console.log(error.toString());
    }

    console.log("")
    console.log("getStoreProducts")
    try {
        sh.getStoreProducts();
    } catch (error) {
        console.log(error.toString());
    }

}




testExamples();
testPlant();
testManga();
testFurniture();
testCoord();
testStore();
testCategory();
testStoreHouse();
