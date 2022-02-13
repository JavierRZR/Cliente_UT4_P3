


class StoreHouseView {

    constructor() {
        this.menu_store = $("#menu-store");
        this.menu_cat = $("#menu-category");
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

    bindDisplayStoreProducts(handlerStore, handlerCat) {
        $(this.stores.children()[1]).children().click(function () {
            handlerStore(this.dataset.store);
        });
        this.menu_store.children().find("a").click(function () {
            handlerStore(this.dataset.store);
        });
        this.menu_cat.children().find("a").click(function () {
            handlerCat(this.dataset.category);
        });
    }

    bindDisplayProductInfo(handle) {
        this.content.find("tbody").children().click(function () {
            handle(this.dataset.serial);
        })
    }

    showMenu(stores, categories) {
        this.menu_store.empty();
        this.menu_cat.empty();
        for (const it of stores) {
            if (it.name != "DEFAULT") {
                this.menu_store.append(`
            <li><a data-store="${it.cif}" class="dropdown-item">${it.name}: ${it.cif}</a></li>
            `)
            }
        }

        for (const it of categories) {
            this.menu_cat.append(`
            <li><a data-category="${it.title}" class="dropdown-item">${it.title}</a></li>
            `)
        }
    }

    showStores(stores) {
        this.stores.empty();
        let _container = $(`<div class="mb-5 d-flex justify-content-center"></div>`);
        this.stores.append(`<div><h3>Tiendas</h3></div>`)
        for (const it of stores) {

            if (it.name != "DEFAULT") {
                _container.append(`
            <div id="tarjeta" data-store="${it.cif}" class="card me-5" style="width: 13rem;">
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

    showProducts(products) {
        this.content.empty();
        this.content.append(`<div><h3>Products</h3></div>`);
        let container = $(`<div class="container article-banner"><div class="row">
				<div class="table-responsive" id="shoppingcart-table">
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
            <tr data-serial="${it.product.serial}">
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

    showProductInfo(product) {
        $("#product").remove();
        console.log(product);
        this.content.append(`
        <div id="product" class="container p-5 ms-5 me-5">
                <div class="card mb-3 ms-5 me-5">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${product.product.images[0]}" class="img-fluid rounded-start" alt="${product.product.name}">
                        </div>
                        <div class="col-md-8  p-1 pt-3">
                            <div class="card-body">
                                <h5 class="card-title">${product.product.name}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${product.categories}</h6>
                                <p class="card-text">${product.product.description}</p>
                                <div class="">
                                    <p class="card-text d-flex justify-content-between"><span>Precio: ${product.product.price} €</span>
                                        <span>I.V.A.: ${product.product.tax} %</span></p>
                                </div>
                                <div class="d-flex justify-content-end mt-5">
                                    <button class="btn btn-primary">Comprar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)

    }

}

export default StoreHouseView;