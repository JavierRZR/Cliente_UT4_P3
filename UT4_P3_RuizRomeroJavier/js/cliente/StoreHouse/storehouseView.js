


class StoreHouseView {

    constructor() {
        this.menu_store = $("#menu-store");
        this.menu_cat = $("#menu-category");
        this.menu_type = $("#menu-type");
        this.stores = $("#sh-stores");
        this.content = $("#sh-content");
    }

    bindInit(handler) {
        $("#initNav").click(event => {
            handler();
        });
        $("#initFooter").click(event => {
            handler();
        });
    }

    bindDisplayStoreProducts(handlerStore, handlerCat, handlerType) {
        $(this.stores.children()[1]).children().click(function () {
            handlerStore(this.dataset.store, this.dataset.storename);
        });
        this.menu_store.children().find("a").click(function () {
            handlerStore(this.dataset.store);
        });
        this.menu_cat.children().find("a").click(function () {
            handlerCat(this.dataset.category);
        });
        this.menu_type.children().find("a").click(function () {
            handlerType(this.dataset.prodtype);
        });
    }

    bindDisplayProductInfo(handle) {
        this.content.find("tbody").children().click(function () {
            handle(this.dataset.serial, this.dataset.type);
        })
    }

    showMenu(stores, categories, type) {
        this.menu_store.empty();
        this.menu_cat.empty();
        for (const it of stores) {
            if (it.name != "DEFAULT") {
                this.menu_store.append(`
                    <li><a data-store="${it.cif}" class="dropdown-item">${it.name}</a></li>
                `);
            }
        }

        for (const it of categories) {
            if (it.title != "DEFAULT") {
                this.menu_cat.append(`
                    <li><a data-category="${it.title}" class="dropdown-item">${it.title}</a></li>
                `);
            }
        }

        for (const i of type) {
            this.menu_type.append(`
                <li><a data-prodType="${i}" class="dropdown-item">${i}</a></li>
            `);
        }

    }

    showStores(stores) {
        this.stores.empty();
        let _container = $(`<div class="mb-5 d-flex justify-content-center"></div>`);
        this.stores.append(`<div><h3>Tiendas</h3></div>`)
        for (const it of stores) {

            if (it.name != "DEFAULT") {
                _container.append(`
            <div id="tarjeta" data-store="${it.cif}" data-storeName="${it.name}" class="card me-5" style="width: 13rem;">
                <img src="https://via.placeholder.com/250x100.jpg/212529/FFFFFF?text=${it.name}" class="card-img-top" alt="${it.name} Store">
                <div class="card-body text-center">
                    <p class="card-text text-muted fs-6 fw-ligth">${it.address}<br> ${it.phone}</p>
                </div>
            </div>
            `)
            }
        }
        this.stores.append(_container);
    }

    showProducts(products, store = "") {
        this.content.empty();
        this.content.append(`<div><h3>Products ${store}</h3></div>`);
        let container = $(`<div class="container article-banner"><div class="row">
				<div class="table-responsive" id="products-table">
                <table class="table table-hover">
                <thead>
                        <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Categoria/s</th>
                                <th scope="col" class="text-center">Precio</th>
                                <th scope="col" class="text-center">Stock</th>
                                <th scope="col" class="text-right">I.V.A.</th>
                        </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
				</div>
			</div></div>`);
        let tbody = container.find("tbody");
        for (const it of products) {
            let cat = "";
            it.categories.forEach(elem => {
                cat += `${elem} `;
            });
            tbody.append(`
            <tr data-serial="${it.product.serial}" data-category="${cat}" data-type="${it.product.__proto__.constructor.name.split("Intern")[1]}">
                <th scope="row">${it.product.serial}</th>
                <td>${it.product.name}</td>
                <td>${cat}</td>
                <td  class="text-center">${it.product.price.toLocaleString("es-ES", { style: 'currency', currency: 'EUR' })}</td>
                <td  class="text-center">${it.stock} u.</td>
                <td  class="text-center">${it.product.tax} %</td>
            </tr>
            `);
        }
        container.append(`
            <div class="container mt-3"><p id="showProdHelp" class="text-muted">* Stock undefined significa que está listado en el almacén pero no en una tienda real.</p></div>
        `)
        this.content.append(container);
    }

    showProductsFilteredByCategory(products, category) {
        let arrProd = $("#products-table").find("tbody").children();
        if (arrProd.length <= 0 || (!arrProd)) {
            this.showProducts(products);
        } else {
            for (let i = 0; i < arrProd.length; i++) {
                if ($(arrProd[i]).data("category").search(category) === -1) $(arrProd[i]).hide();
            }
        }

    }

    showProductsFilteredByType(products, type) {
        let arrProd = $("#products-table").find("tbody").children();
        if (arrProd.length <= 0 || (!arrProd)) {
            this.showProducts(products);
        } else {
            for (let i = 0; i < arrProd.length; i++) {
                if ($(arrProd[i]).data("type").search(type) === -1) $(arrProd[i]).hide();
            }
        }

    }

    showProductInfo(product, type) {
        $("#product").remove();
        this.content.append(this.#typeInterface[type](product));
    }

    #typeInterface = {
        Plant: this.#plantInterface,
        Manga: this.#mangaInterface,
        Furniture: this.#furnitureInterface
    }
    #mangaInterface(product) {
        return $(`
        <div id="product" class="d-flex mt-5">
        <div class="p-5 border-end col d-flex justify-content-center align-items-center">
            <img src="${product.product.images[0]}" alt="${product.product.name}">
        </div>
        <div class="info p-5 col --prodManga">
            <h1>${product.product.name}</h1>
            <h5 class="text-muted">${product.categories}</h5>
            <div class="d-flex">
            <p>PVP: <span class="text-muted">${product.product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span></p>
            <p class="ms-5">IVA: <span class="text-muted">${product.product.tax} %</span></p>
            </div>  
            <div class="d-flex flex-column">
            <p>Autor: <span class="text-muted">${product.product.author}</span></p>
            <p>Editorial: <span class="text-muted">${product.product.publisher}</span></p>
            <p>Volúmenes: <span class="text-muted">${product.product.volumes}</span></p>
            </div>
            
            <p class="mb-5 border-top border-dark border-3 pt-3">${product.product.description}</p>
            <div class="d-flex justify-content-end">
                <button class="btn btn-primary">Comprar</button>
            </div>
        </div>
    </div>
        `)
    }
    #furnitureInterface(product) {
        return $(`
        <div id="product" class="d-flex mt-5">
        <div class="p-5 border-end col d-flex justify-content-center align-items-center">
            <img src="${product.product.images[0]}" alt="${product.product.name}">
        </div>
        <div class="info p-5 col --prodFurniture">
            <h1>${product.product.name}</h1>
            <h5 class="text-muted">${product.categories}</h5>
            <div class="d-flex">
            <p>PVP: <span class="text-muted">${product.product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span></p>
            <p class="ms-5">IVA: <span class="text-muted">${product.product.tax} %</span></p>
            </div>
            <p>Medidas: <span class="text-muted">${product.product.width}cm  x ${product.product.height}cm  x ${product.product.deep}cm</span></p>
            <p class="mb-5 border-top border-dark border-3 pt-3">${product.product.description}</p>
            <div class="d-flex justify-content-end">
                <button class="btn btn-primary">Comprar</button>
            </div>
        </div>
    </div>
        `)
    }
    #plantInterface(product) {
        return $(`
        <div id="product" class="d-flex mt-5 ">
        <div class="p-5 border-end col d-flex justify-content-center align-items-center">
            <img src="${product.product.images[0]}" alt="${product.product.name}">
        </div>
        <div class="info p-5 col --prodPlant">
            <h1>${product.product.name}</h1>
            <h5 class="text-muted">${product.categories}</h5>
            <div class="d-flex">
            <p>PVP: <span class="text-muted">${product.product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span></p>
            <p class="ms-5">IVA: <span class="text-muted">${product.product.tax} %</span></p>
            </div>  
            <div class="d-flex flex-column">
            <p>Ambiente: <span class="text-muted">${product.product.ambient}</span></p>
            <p>Floración: <span class="text-muted">${product.product.flower}</span></p>
            <p>Hoja: <span class="text-muted">${product.product.leaf}</span></p>
            <p>Color: <span class="text-muted">${product.product.color}</span></p>
            </div>
            
            <p class="mb-5 border-top border-dark border-3 pt-3">${product.product.description}</p>
            <div class="d-flex justify-content-end">
                <button class="btn btn-primary">Comprar</button>
            </div>
        </div>
    </div>
        `)
    }

}

export default StoreHouseView;