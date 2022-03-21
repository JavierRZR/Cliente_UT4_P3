import { Store } from "../store.js";
import { Coord } from "../coord.js";
import { Category } from "../category.js";
import { Product, Plant, Manga, Furniture } from "../entities.js";
import jsonObject from "./datos.json" assert { type: "json" };

class StoreHouseController {

    #modelStoreH;
    #viewStoreH;
    #loadData() {
        let store = this.#modelStoreH;
        let s1 = new Store("TO", "t98765432", new Coord("+72.32", "+55.121"));
        let s2 = new Store("AL", "a54326789", new Coord("+123.123", "-0.12"));
        let s3 = new Store("CR", "c01234567", new Coord("+90", "-12"));
        s1.address = "Paseo Universidad, 1, 13005 Ciudad Real, Cdad. Real";
        s1.phone = "926232530";
        s2.address = "Rda. de Calatrava, 1, 13003 Ciudad Real, Cdad. Real";
        s2.phone = "926221207";
        s3.address = "P.º de San Eugenio, 21, 45003 Toledo";
        s3.phone = "925284043";
        this.#modelStoreH.addStore(s1); this.#modelStoreH.addStore(s2); this.#modelStoreH.addStore(s3);

        //Categories
        let c1 = new Category("plant", "Just plants");
        let c2 = new Category("Lecture", "Anything you can read");
        let c3 = new Category("Decoration", "Decoration articles");
        this.#modelStoreH.addCategory(c1); this.#modelStoreH.addCategory(c2); this.#modelStoreH.addCategory(c3);

        //Products
        let m1 = new Manga("0001", "Chainsawman", 8, "Tatsuki Fujimoto", "Norma Editorial", 13);
        m1.addImage = "../../../img/products/mcsm01.jpg";
        m1.description = "Denji es un chico sin un duro que se deja la piel trabajando como Devil Hunter junto a su perro demoníaco Pochita para resarcir una deuda astronómica, pero entonces... ¡¡una sangrienta traición da un giro radical a su miserable vida!!";

        let m2 = new Manga("0002", "One Piece", 6, "Eichiro Oda", "Norma Editorial", 103);
        m2.addImage = "../../../img/products/mop01.jpg";
        m2.description = "Sigue las aventuras de Monkey D. Luffy, un chico que sueña con ser el rey de los piratas y que se hace a la mar en un bote para buscar la tripulación que le pueda ayudar en ello. La serie más entretenida de televisión, ahora también en manga.";

        let m3 = new Manga("0003", "Gokushufudou", 7.99, "OONO Kousuke", "Immortal Tatsu", 87);
        m3.addImage = "../../../img/products/mgk01.jpg";
        m3.description = "Es la historia de Tatsu el Inmortal, el hombre más mortífero de la mafia hasta que un día, después de un terrible incidente que lo dejó malherido, decidió apartarse del camino del yakuza y sentar la cabeza, para convertirse en el amo de casa ideal y devoto servidor de Miku, su laboriosa mujer. Sin embargo, por más que luche por dejar atrás su pasado entre clases de cocina, rutinas de gimnasio y actividades del barrio con las vecinas, el pasado está menos muerto de lo que él cree, y volverá para llevarlo por el mal camino de las maneras más rebuscadas, violentas y, por supuesto, hilarantes que pueda haber.";

        let m4 = new Manga("0004", "Tokyo Revengers", 12.05, "Ken", "WAKUI", 242);
        m4.addImage = "../../../img/products/mtk01.jpg";
        m4.description = "Takemichi, un fracasado que fue miembro de una banda en su juventud, salta 12 años atrás en el tiempo para volver al instituto y salvar a su exnovia, Hina, que en la actualidad ha sido asesinada por la organización criminal Tokyo Manjikai. Con cada viaje temporal, Takemichi influye en los que le rodean y poco a poco va cambiando el pasado… ¿pero eso será suficiente para salvar a Hina y evitar que la Tokyo Manjikai se convierta en una temida banda criminal?";

        let m5 = new Manga("0005", "Kaijin Reijoh", 8, "Tetsuya", "Tashiro", 6);
        m5.addImage = "../../../img/products/mkr01.jpg";
        m5.description = "En un mundo en el que los humanos se transforman en monstruos cuando caen en la desesperación y se dejan llevar por sus deseos más escabrosos, Asuma Sudô vive felizmente desentendido de estos problemas y su única motivación en la vida es manosear a las chicas del instituto. Sin embargo, todo cambia cuando un día le llega una petición para ingresar en el Instituto de chicas Meidô: ¡es un sueño hecho realidad! Pero lo que él ignora es que ese instituto, en realidad, ¡es una organización secreta para exterminar a los monstruos!";

        let p1 = new Plant("1001", "Páchira Aquática", 35, "humidity", "perennial", "spring", "seagreen");
        p1.addImage = "../../../img/products/paq01.jpg";
        p1.description = "Es de origen tropical, así que estará muy a gusto entre los 16 y 25 ºC. Lo mejor es que la tengas en el interior durante todo el año y solo en el exterior cuando no haya heladas.";

        let p2 = new Plant("1002", "Monstera Deliciosa", 21, "hot", "perennial", "none", "black, green");
        p2.addImage = "../../../img/products/pmd01.jpg";
        p2.description = "Seguramente, a la Monstera Deliciosa se la conoce por este nombre monstruoso por sus hojas enormes y brillantes, mientras que su parte 'deliciosa' se debe a que en la selva mexicana, de donde es originaria, produce fruto. La razón para tener estos agujeros es que en su hábitat está acostumbrada a crecer en la sombra. Tener estos huecos permite que la poca luz que hay también le llegue a la parte inferior de la planta, lo tiene todo bajo control. La Planta del Queso necesita su espacio ya que se vuelve voluminosa y le aparecen raíces aéreas (sí, ¡en serio!) que en Perú se usan para hacer cuerdas.";

        let p3 = new Plant("1003", "Serpent", 17, "hot", "perennial", "none", "dark green");
        p3.addImage = "../../../img/products/psr01.jpg";
        p3.description = "Si tu relación con las plantas es complicada, la sansevieria es tu mejor aliada. Es muy resistente así que tendrás que esforzarte bastante para acabar con ella. Se nutre de los despistes porque olvidarte de regarla es de lo mejor que le puede pasar. Es una planta muy agradecida para tener en el dormitorio ya que de día almacena oxígeno que libera mientras duermes, palabra de la NASA. A esta planta de hojas duras y puntiagudas se llama lengua de suegra o planta de la serpiente por su exótico estampado.";

        let f1 = new Furniture("2001", "EKEDALEN", 350, "wood", 50, 100, 35);
        f1.addImage = "../../../img/products/fek01.jpg";
        f1.description = "Está diseñada de forma que no presenta uniones cuando se usa sin extender. Regula el largo de la mesa según las actividades que se lleven a cabo como los deberes, dibujar o jugar con los niños. Las patas quedan siempre en las esquinas de la mesa, incluso cuando está extendida, de modo que el espacio de debajo se puede aprovechar mejor para poner sillas.";

        let f2 = new Furniture("2002", "Secret Lab's chairs", 499, "cloth", 70, 130, 50);
        f2.addImage = "../../../img/products/fsl01.jpg";
        f2.description = "Lo mejor de los modelos OMEGA y TITAN de Secretlab. Ahora en una sola silla. La silla Secretlab TITAN Evo 2022 combina varias tecnologías patentadas e innovaciones de diseño para ofrecer un nuevo nivel de soporte y rendimiento personalizados. Se trata de una comodidad galardonada. Mejorada aún más.";

        let f3 = new Furniture("2003", "ASARUM", 249.99, "cloth", 191, 73, 84);
        f3.addImage = "../../../img/products/fas01.jpg";
        f3.description = "Un sofá cama de medidas reducidas, fácil de colocar incluso en espacios pequeños. Se convierte fácilmente en cama. Debajo del asiento puedes guardar ropa de cama, por ejemplo. Personaliza y aumenta el confort de tu sofá complementándolo con cojines de diferentes colores y estampados.";

        store.addProduct(m1, c2); store.addProduct(m2, c2); store.addProduct(m3, c2); store.addProduct(m4, c2); store.addProduct(m5, c2);
        store.addProduct(p1, c1, c3); store.addProduct(p2, c1, c3); store.addProduct(p3, c1, c3);
        store.addProduct(f1, c3); store.addProduct(f2, c3); store.addProduct(f3, c3);
        store.addProductInStore(m1, s1, 6); store.addProductInStore(m2, s1, 2); store.addProductInStore(m5, s1, 7);
        store.addProductInStore(p2, s1, 12); store.addProductInStore(p1, s1, 2); store.addProductInStore(p3, s1, 87);
        store.addProductInStore(f2, s1, 9); store.addProductInStore(f3, s1, 1);
        store.addProductInStore(m2, s2, 9); store.addProductInStore(m3, s2, 12); store.addProductInStore(m4, s2, 2);
        // store.addProductInStore(p1, s2, 10); store.addProductInStore(p3, s2, 12);
        store.addProductInStore(f3, s2, 20);
        store.addProductInStore(m1, s3, 9); store.addProductInStore(m2, s3, 12); store.addProductInStore(m3, s3, 2); store.addProductInStore(m4, s3, 2);
        store.addProductInStore(p1, s3, 10); store.addProductInStore(p3, s3, 12);
        // store.addProductInStore(f3, s3, 20);

    }
    #users = [
        {
            user: "admin",
            pass: "admin"
        },
        {
            user: "pablo",
            pass: "pablo"
        }
    ];
    #deletedData = {
        STORES: [],
        CATEGORIES: [],
        PRODUCTS: []
    }
    #createdData = {
        STORES: [],
        CATEGORIES: [],
        PRODUCTS: {
            MANGA: [],
            PLANT: [],
            FURNITURE: [],
            ADDEDTOSTORE: []
        }
    }


    constructor(modelSH, viewSH) {
        this.#modelStoreH = modelSH;
        this.#viewStoreH = viewSH;
        this.onLoad();

    }

    onLoad = () => {
        // this.#loadData();
        this.loadJsonData();

        this.#viewStoreH.bindInit(this.handleInit);
        this.handleDisplayWholeInterface();

        this.#viewStoreH.bindLoginModalForm(this.hShowLogin, this.handleLogut);


        if (this.getCookie("User")) {
            this.#viewStoreH.showLoginInfo(this.getCookie, new Date());
            this.#viewStoreH.showAdminPanel();
            this.#viewStoreH.bindAdminMenu(
                this.handleNewCategoryForm,
                this.handleNewStoreForm,
                this.handleRemCategoryForm,
                this.handleRemStoreForm,
                this.handleNewProdForm,
                this.handleAddProdIntoStoreForm,
                this.handleRemProdForm,
                this.handleRemProdFromStoreForm,
                this.handleExportJSON);
        }
    }

    loadJsonData = () => {
        //Cargar tiendas
        for (const it of jsonObject.STORES.data) {
            let s = new Store(it.name, it.cif, new Coord(it.coordx, it.coordy));
            s.address = it.address;
            s.phone = it.phone;
            this.#modelStoreH.addStore(s);
        }
        //Cargar categorias
        for (const it of jsonObject.CATEGORIES.data) {
            this.#modelStoreH.addCategory(new Category(it.title, it.description));
        }

        //Cargar productos
        for (const it of jsonObject.PRODUCTS.MANGA) {
            let m = new Manga(it.serial, it.name, it.price, it.author, it.publisher, it.volumes);
            m.addImage = it.image;
            m.description = it.description;
            let arrcat = [];
            for (const cat of it.categories) {
                arrcat.push(this.#modelStoreH.getCategory(cat));
            }
            this.#modelStoreH.addProduct(m, ...arrcat);
            for (const store of it.stores) {
                this.#modelStoreH.addProductInStore(m, new Store("test", store.store), store.stock)
            }
        }

        for (const it of jsonObject.PRODUCTS.PLANT) {
            let p = new Plant(it.serial, it.name, it.price, it.ambient, it.leaf, it.flower, it.color);
            p.addImage = it.image;
            p.description = it.description;
            let arrcat = [];
            for (const i of it.categories) {
                arrcat.push(this.#modelStoreH.getCategory(i));
            }
            this.#modelStoreH.addProduct(p, ...arrcat);
            for (const store of it.stores) {
                this.#modelStoreH.addProductInStore(p, new Store("test", store.store), store.stock)
            }
        }
        for (const it of jsonObject.PRODUCTS.FURNITURE) {
            let f = new Furniture(it.serial, it.name, it.price, it.material, it.width, it.height, it.deep);
            f.addImage = it.image;
            f.description = it.description;
            let arrcat = [];
            for (const i of it.categories) {
                arrcat.push(this.#modelStoreH.getCategory(i));
            }
            this.#modelStoreH.addProduct(f, ...arrcat);
            for (const store of it.stores) {
                this.#modelStoreH.addProductInStore(f, new Store("test", store.store), store.stock)
            }
        }
    }

    handleExportJSON = () => {
        let actualData = {
            STORES: [],
            CATEGORIES: [],
            PRODUCTS: {
                MANGA: [],
                PLANT: [],
                FURNITURE: []
            }
        }
        for (const i of this.#modelStoreH.categories) {
            actualData.CATEGORIES.push(i.toJSONObject());
        }
        for (const i of this.#modelStoreH.stores) {
            actualData.STORES.push(i.toJSONObject());
        }
        for (const store of this.#modelStoreH) {
            for (const product of store[1].products) {
                let type = product[1].product.__proto__.constructor.name;
                type = type.split("Intern")[1].toUpperCase();

                let pos = actualData.PRODUCTS[type].findIndex(elem => {
                    return elem.serial == product[0];
                })

                if (pos == -1) {
                    let obj = product[1].product.toJSONObject();
                    obj.stores = [
                        {
                            store: store[1].store.cif,
                            stock: product[1].stock
                        }
                    ]
                    obj.categories = [...product[1].categories];
                    actualData.PRODUCTS[type].push(obj);
                } else {
                    actualData.PRODUCTS[type][pos].stores.push(
                        {
                            store: store[1].store.cif,
                            stock: product[1].stock
                        }
                    )
                }
            }
        }



        let obj = {
            date: new Date(),
            actualData: actualData,
            createdData: this.#createdData,
            deletedData: this.#deletedData
        }
        let date = new Date();
        let fileName = "" + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds() + ".json";
        var history = JSON.stringify(obj);
        var blob = new Blob([history], {
            type: "application/json;charset=utf-8"
        });
        saveAs(blob, fileName);

    }

    onInit = () => {
        this.#viewStoreH.content.empty();
        this.#viewStoreH.form.empty();
    }

    handleInit = () => {
        this.onInit();
    }

    handleDisplayWholeInterface = () => {
        this.#viewStoreH.showMenu(this.#modelStoreH.stores, this.#modelStoreH.categories, this.#modelStoreH.productTypes());
        this.#viewStoreH.showStores(this.#modelStoreH.stores);
        this.#viewStoreH.content.empty();
        this.#viewStoreH.bindDisplayStoreProducts(
            this.handleDisplayStoreProducts,
            this.handleDisplayCategoryProducts,
            this.handleDisplayTypeProducts);
    }

    handleDisplayStoreProducts = (store, name) => {
        this.#viewStoreH.showMenu(this.#modelStoreH.stores, this.#modelStoreH.getStoreCategories(new Store("0", store)), this.#modelStoreH.getStoreTypes(new Store("0", store)));
        this.#viewStoreH.showProducts(this.#modelStoreH.getStoreProducts(new Store("0", store)), name);
        this.#viewStoreH.bindDisplayStoreProducts(
            this.handleDisplayStoreProducts,
            this.handleDisplayCategoryProducts,
            this.handleDisplayTypeProducts);
        this.#viewStoreH.bindDisplayProductInfo(this.handleDisplayProductInfo);
    }
    handleDisplayCategoryProducts = (category) => {
        this.#viewStoreH.showProductsFilteredByCategory(this.#modelStoreH.getCategoryProducts(new Category(category)), category);
        this.#viewStoreH.bindDisplayProductInfo(this.handleDisplayProductInfo);
    }
    handleDisplayTypeProducts = (type) => {
        this.#viewStoreH.showProductsFilteredByType(this.#modelStoreH.getDefaultStoreProducts(type), type);
    }

    handleDisplayProductInfo = (product, type) => {
        this.#viewStoreH.showProductInfo(this.#modelStoreH.getProduct(product), type);
        this.#viewStoreH.bindNewWindowProduct(this.handleDisplayNewWindowProduct);
    }

    handleDisplayNewWindowProduct = (serial, type) => {
        try {
            let product = this.#modelStoreH.getProduct(serial.toString());
            this.#viewStoreH.showNewWindowProduct(product, type);
        } catch (error) {
            this.#viewStoreH.showNewWindowProduct(null, null, "NO existe el producto");
        }
    }



    //!Formularios
    handleNewCategoryForm = () => {
        this.#viewStoreH.showNewCategoryForm();
        this.#viewStoreH.bindNewCategoryForm(this.handleCreateCategory);
    }

    handleCreateCategory = (title, desc) => {
        let cat = new Category(title, desc);
        let done, error;
        let created = cat.toJSONObject();
        try {
            this.#modelStoreH.addCategory(cat);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        if (done) this.#createdData.CATEGORIES.push(created);
        this.#viewStoreH.showNewModal(done, "Categoría", cat.title, "category", "creado correctamente", "ya existe", error);
        this.handleDisplayWholeInterface();
    }

    handleNewStoreForm = () => {
        this.#viewStoreH.showNewStoreForm();
        this.#viewStoreH.bindNewStoreForm(this.handleCreateStore);
    }

    handleCreateStore = (name, cif, address, coord, phone) => {
        let coordenada = new Coord();
        let done, error;
        if (coord != "") coordenada.changeLocation(coord);
        let store = new Store(name, cif, coordenada);
        if (address != "") store.address = address;
        if (phone != "") store.phone = phone;
        let created = store.toJSONObject();
        try {
            this.#modelStoreH.addStore(store);
            done = true;
        } catch (exception) {
            done = false;
            error = exception
        }
        if (done) this.#createdData.STORES.push(created);
        this.#viewStoreH.showNewModal(done, "Tienda", store.name, "store", "creado correctamente", "ya existe", error);
        this.handleDisplayWholeInterface();
    }

    handleRemCategoryForm = () => {
        this.#viewStoreH.showRemoveCategoryForm(this.#modelStoreH.categories);
        this.#viewStoreH.bindRemCategoryForm(this.handleRemoveCategory);
    }
    handleRemoveCategory = (cat) => {
        let category = new Category(cat);
        let done, error;
        let deleted = category.toJSONObject();
        try {
            this.#modelStoreH.removeCategory(category);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        if (done) this.#deletedData.CATEGORIES.push(deleted);
        this.#viewStoreH.showRemoveModal(done, "Category", cat, "category", "eliminado correctamente", "no existe el producto.", error);
        this.handleDisplayWholeInterface();
    }

    handleRemStoreForm = () => {
        this.#viewStoreH.showRemoveStoreForm(this.#modelStoreH.stores);
        this.#viewStoreH.bindRemStoreForm(this.handleRemoveStore);
    }
    handleRemoveStore = (str) => {
        let store = new Store("test", str);
        let done, error;
        let deleted = store.toJSONObject();
        try {
            this.#modelStoreH.removeStore(store);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        if (done) this.#deletedData.STORES.push(deleted);
        this.#viewStoreH.showRemoveModal(done, "Store", str, "store", "eliminado correctamente", "no existe el producto.", error);
        this.handleDisplayWholeInterface();
    }

    handleNewProdForm = () => {
        this.#viewStoreH.showNewProdForm(this.#modelStoreH.categories);
        this.#viewStoreH.bindNewPlantForm(this.handleCreatePlant);
        this.#viewStoreH.bindNewMangaForm(this.handleCreateManga);
        this.#viewStoreH.bindNewFurnitureForm(this.handleCreateFurniture);
    }

    handleCreatePlant = (prod) => {
        let done, error;
        let created;
        try {
            let plant = new Plant(prod.code, prod.name, prod.price, prod.ambient, prod.leaf, prod.flower, prod.color);
            plant.description = prod.desc;
            plant.addImage = prod.image;
            let categories = [];
            for (const it of prod.categories) {
                categories.push(new Category(it));
            }
            created = {
                product: plant.toJSONObject(),
                categories: [...prod.categories],
                store: "storehouse"
            }
            this.#modelStoreH.addProduct(plant, ...categories);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        if (done) this.#createdData.PRODUCTS.PLANT.push(created);
        this.#viewStoreH.showNewModal(done, "Planta", prod.name, "plant", "creada correctamente", "ya existe", error);
        this.handleDisplayWholeInterface();
    }

    handleCreateManga = (prod) => {
        let done, error;
        let created;
        try {
            let manga = new Manga(prod.code, prod.name, prod.price, prod.author, prod.publisher);
            manga.description = prod.desc;
            manga.addImage = prod.image;
            let categories = [];
            for (const it of prod.categories) {
                categories.push(new Category(it));
            }
            created = {
                product: manga.toJSONObject(),
                categories: [...prod.categories],
                store: "storehouse"
            }
            this.#modelStoreH.addProduct(manga, ...categories);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        if (done) this.#createdData.PRODUCTS.MANGA.push(created);
        this.#viewStoreH.showNewModal(done, "Manga", prod.name, "manga", "creado correctamente", "ya existe", error);
        this.handleDisplayWholeInterface();
    }

    handleCreateFurniture = (prod) => {
        let done, error;
        let created;
        try {
            let furniture = new Furniture(prod.code, prod.name, prod.price, prod.type, prod.width, prod.height, prod.deep);
            furniture.description = prod.desc;
            furniture.addImage = prod.image;
            let categories = [];
            for (const it of prod.categories) {
                categories.push(new Category(it));
            }
            created = {
                product: furniture.toJSONObject(),
                categories: [...prod.categories],
                store: "storehouse"
            }
            this.#modelStoreH.addProduct(furniture, ...categories);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        if (done) this.#createdData.PRODUCTS.FURNITURE.push(created);
        this.#viewStoreH.showNewModal(done, "Mueble", prod.name, "furniture", "creado correctamente", "ya existe", error);
        this.handleDisplayWholeInterface();
    }

    handleAddProdIntoStoreForm = () => {
        this.#viewStoreH.showAddProdIntoStoreForm(this.#modelStoreH.products, this.#modelStoreH.stores);
        this.#viewStoreH.bindAddProdIntoStoreForm(this.handleAddProdIntoStore);
    }

    handleAddProdIntoStore = (obj) => {
        let done, error;
        let added
        try {
            added = {
                product: this.#modelStoreH.getProduct(obj.product).product.toJSONObject(),
                store: obj.store,
                stock: obj.units
            }
            this.#modelStoreH.addQuantityProductInStore(this.#modelStoreH.getProduct(obj.product).product, new Store("test", obj.store), obj.units);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        if (done) this.#createdData.PRODUCTS.ADDEDTOSTORE.push(added);
        this.#viewStoreH.showNewModal(done, "Producto en tienda", obj.product, "addProductStore", `añadido correctamente en ${obj.store}`, "ha habido un error.", error);
        this.handleDisplayWholeInterface();
    }

    handleRemProdForm = () => {
        this.#viewStoreH.showRemoveProdForm(this.#modelStoreH.products);
        this.#viewStoreH.bindRemProdForm(this.handleRemoveProd);
    }
    handleRemoveProd = (prod) => {
        let done, error;
        let name = "Error";
        let deleted;
        try {
            let product = this.#modelStoreH.getProduct(prod.product);
            name = product.product.name;
            deleted = {
                product: product.product.toJSONObject(),
                store: "storehouse"
            }
            this.#modelStoreH.removeProduct(product.product);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        if (done) this.#deletedData.PRODUCTS.push(deleted);
        this.#viewStoreH.showRemoveModal(done, "Producto", name, "prod", "eliminado correctamente", "no existe el producto.", error);
        this.handleDisplayWholeInterface();
    }

    handleRemProdFromStoreForm = () => {
        this.#viewStoreH.showRemoveProdFromStoreForm(this.#modelStoreH.products, this.#modelStoreH.stores);
        this.#viewStoreH.bindRemProdFromStoreForm(this.handleRemoveProdfromStore);
    }
    handleRemoveProdfromStore = (prod) => {
        let done, error;
        let nameP = "Error";
        let deleted;
        try {
            let product = this.#modelStoreH.getProduct(prod.product);
            let store = new Store("test", prod.store);
            nameP = product.product.name;
            deleted = {
                product: product.product.toJSONObject(),
                store: store.toJSONObject()
            }
            this.#modelStoreH.removeProductFromStore(product.product, store);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        if (done) this.#deletedData.PRODUCTS.push(deleted);
        this.#viewStoreH.showRemoveModal(done, "Producto", nameP, "prodStore", `eliminado correctamente`, "no existe el producto.", error);
        this.handleDisplayWholeInterface();
    }

    hShowLogin = () => {
        this.#viewStoreH.loginModal();
        this.#viewStoreH.bindLoginValidation(this.handleLogin, [...this.#users]);
    }

    handleLogin = (user) => {
        this.setCookie("User", user, 1000);
        this.#viewStoreH.showLoginInfo(this.getCookie, new Date());
        this.#viewStoreH.showAdminPanel();
        this.#viewStoreH.bindAdminMenu(
            this.handleNewCategoryForm,
            this.handleNewStoreForm,
            this.handleRemCategoryForm,
            this.handleRemStoreForm,
            this.handleNewProdForm,
            this.handleAddProdIntoStoreForm,
            this.handleRemProdForm,
            this.handleRemProdFromStoreForm,
            this.handleExportJSON);

        $("#bLogin").attr("disable", true);
    }

    handleLogut = () => {
        this.setCookie("User", "", 0);
        location.reload();
    }


    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getCookie(cname) {
        let re = new RegExp('(?:(?:^|.*;\\s*)' + cname + '\\s*\\=\\s*([^;]*).*$)|^.*$');
        return document.cookie.replace(re, "$1");
    }

}

export default StoreHouseController;