import { Store } from "../store.js";
import { Coord } from "../coord.js";
import { Category } from "../category.js";
import { Product, Plant, Manga, Furniture } from "../entities.js";


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
        let m2 = new Manga("0002", "One Piece", 6, "Eichiro Oda", "Norma Editorial", 103);
        let p1 = new Plant("0003", "Aqua", 35, "humidity", "perennial", "spring", "seagreen");
        let p2 = new Plant("0004", "Serpent", 21, "hot", "perennial", "none", "black, green");
        let f1 = new Furniture("0005", "EKEDALEN", 350, "wood", 50, 100, 35);
        let f2 = new Furniture("0006", "Secret Lab's chairs", 499, "cloth", 70, 130, 50);
        m1.addImage = "https://img.huffingtonpost.com/asset/5e7cd77a230000f2360c6d0b.jpeg?ops=scalefit_630_noupscale";
        m1.description = "Esto es una planta verde, con hojas grandes y que aporta mucho oxígeno";
        store.addProduct(m1, c2, c3); store.addProduct(m2, c2, c3);
        store.addProduct(p1, c1); store.addProduct(p2, c1);
        store.addProduct(f1, c3); store.addProduct(f2, c3);
        store.addProductInStore(m1, s1, 6);
        store.addProductInStore(m2, s1, 2);
        store.addProductInStore(p2, s1, 7);
        store.addProductInStore(f2, s1, 12);
    }

    constructor(modelSH, viewSH) {
        this.#modelStoreH = modelSH;
        this.#viewStoreH = viewSH;

        this.onLoad();
    }

    onLoad = () => {
        this.#loadData();
        this.#viewStoreH.bindInit(this.handleInit);
        this.#viewStoreH.showMenu(this.#modelStoreH.stores, this.#modelStoreH.categories);
        this.#viewStoreH.showStores(this.#modelStoreH.stores);
        this.#viewStoreH.bindDisplayStoreProducts(
            this.handleDisplayStoreProducts, this.handleDisplayCategoryProducts);

    }

    onInit = () => {
        this.#viewStoreH.content.empty();
    }

    handleInit = () => {
        this.onInit();
    }

    handleDisplayStoreProducts = (store) => {
        this.#viewStoreH.showProducts(this.#modelStoreH.getStoreProducts(new Store("0", store)));
        this.#viewStoreH.bindDisplayProductInfo(this.handleDisplayProductInfo);
    }
    handleDisplayCategoryProducts = (category) => {
        this.#viewStoreH.showProducts(this.#modelStoreH.getCategoryProducts(new Category(category)));
        this.#viewStoreH.bindDisplayProductInfo(this.handleDisplayProductInfo);
    }

    handleDisplayProductInfo = (product) => {
        this.#viewStoreH.showProductInfo(this.#modelStoreH.getProduct(product));
    }
}

export default StoreHouseController;