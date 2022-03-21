import { Product } from "../entities.js";
import {
    newCategoryValidation,
    newStoreValidation,
    removeCategoryValidation,
    removeStoreValidation,
    newPlantValidation,
    newMangaValidation,
    newFurnitureValidation,
    addIntoStoreValidation,
    removeProdValidation,
    removeProdFromStoreValidation
} from '../form/validateForm.js';



class StoreHouseView {

    #executeHandler(handler, handlerArguments, scrollElement, data, url, event) {
        handler(...handlerArguments);
        $(scrollElement).get(0).scrollIntoView();
        history.pushState(data, null, url);
        event.preventDefault();
    }

    constructor() {
        this.menu_store = $("#menu-store");
        this.menu_cat = $("#menu-category");
        this.menu_type = $("#menu-type");
        this.stores = $("#sh-stores");
        this.content = $("#sh-content");
        this.windows = new Map();
        this.menu_admin = $("#sh-admin");
        this.form = $("#sh-form");
        this.login = $("#sh-login");
    }

    bindInit(handler) {
        $("#initNav").click(event => {
            this.#executeHandler(handler, [], 'body', { action: 'init' }, '#', event);
        });
        $("#initFooter").click(event => {
            this.#executeHandler(handler, [], 'body', { action: 'init' }, '#', event);
        });
    }

    bindDisplayStoreProducts(handlerStore, handlerCat, handlerType) {
        $(this.stores.children()[1]).children().click((event) => {
            let store = $(event.target).closest($(".card")).data("store");
            let storename = $(event.target).closest($(".card")).data("storename")
            this.#executeHandler(handlerStore, [store, storename], 'table', { action: 'storeFilter', store: store, storename: storename }, '#content', event);
        });
        this.menu_store.children().find("a").click((event) => {
            let store = $(event.target).closest($("a")).data("store");
            this.#executeHandler(handlerStore, [store], 'table', { action: 'storeFilter', store: store }, '#content', event);
        });
        this.menu_cat.children().find("a").click((event) => {
            let category = $(event.target).closest($("a")).data("category");
            this.#executeHandler(handlerCat, [category], 'table', { action: 'categoryFilter', category: category }, '#content', event);
        });
        this.menu_type.children().find("a").click((event) => {
            let type = $(event.target).closest($("a")).data("prodtype");
            this.#executeHandler(handlerType, [type], 'table', { action: 'typeFilter', type: type }, '#content', event);
        });
    }

    bindDisplayProductInfo(handle) {
        this.content.find("tbody").children().click((event) => {
            let serial = $(event.target).parent().data("serial").toString();
            let type = $(event.target).parent().data("type");
            this.#executeHandler(handle, [serial, type], '#product', { action: 'displayProductInfo', serial: serial, type: type }, '#content', event);
        });
    }

    bindNewWindowProduct(handle) {
        let serial = $("#product").data("serial").toString();
        let type = $("#product").data("type");
        $("#newwindow").click(() => {
            if (!(this.windows.get(serial))) {
                this.windows.set(serial, window.open("product.html", serial, "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no"));
                this.windows.get(serial).addEventListener('DOMContentLoaded', () => {
                    handle(serial, type);
                });
            } else {
                this.windows.get(serial).focus();
            }
        });
    }

    showMenu(stores, categories, type) {
        this.menu_store.empty();
        this.menu_cat.empty();
        this.menu_type.empty();
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
        let _container = $(`<div id="divtiendas" class="mb-5 d-flex justify-content-center"></div>`);
        this.stores.append(`<div><h3>Tiendas</h3></div>`)
        for (const it of stores) {

            if (it.name != "DEFAULT") {
                _container.append(`
            <div id="tarjeta" data-store="${it.cif}" data-storeName="${it.name}" class="card me-5" style="width: 13rem;">
                <img src="https://via.placeholder.com/250x100.jpg/212529/FFFFFF?text=${it.name}" class="card-img-top" alt="${it.name} Store">
                <div class="card-body text-center">
                    <p class="card-text text-muted fw-ligth">${it.address}<br> ${it.phone}</p>
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
        $("#product").remove();
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
        $("#product").remove();
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
        this.content.append(this.#typeInterface[type](product, type));

    }

    showNewWindowProduct(product, type, msg) {
        let botoncerrar = $(`<button id="closewindow" class="btn btn-danger" onClick="window.close()">Cerrar</button>`);
        let window = $(this.windows.get(product.product.serial).document);
        window.find("header").append(`
            <h1>Producto:</h1><h5>${product.product.name}</h5>
        `);
        window.find("main").append(this.#typeInterface[type](product, type));
        window.find("#newwindow").remove();
        window.find("#btnbuy").parent().prepend(botoncerrar);
        let cerrartodas = $(`<button id="closewindows" class="btn btn-danger btn-lg">Cerrar Todas las pestañas</button>`)

        if (!($("#closewindows")[0])) {
            this.content.append(cerrartodas);
            cerrartodas.click(event => {
                this.windows.forEach(elem => {
                    elem.close();
                    $("#product").remove();
                    cerrartodas.remove();
                })
            })
        }

    }

    #typeInterface = {
        Plant: this.#plantInterface,
        Manga: this.#mangaInterface,
        Furniture: this.#furnitureInterface
    }
    #mangaInterface(product, type) {
        return $(`
        <div id="product" class="mt-5" data-serial="${product.product.serial}" data-type="${type}">
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
            <div class="d-flex justify-content-between">
                <button id="newwindow" class="btn btn-info">Abrir ventana</button>
                <button id="btnbuy" class="btn btn-primary">Comprar</button>
            </div>
        </div>
    </div>
        `)
    }
    #furnitureInterface(product, type) {
        return $(`
        <div id="product" class="mt-5" data-serial="${product.product.serial}" data-type="${type}">
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
            <div class="d-flex justify-content-between">
                <button id="newwindow" class="btn btn-info">Abrir ventana</button>
                <button id="btnbuy" class="btn btn-primary">Comprar</button>
            </div>
        </div>
    </div>
        `)
    }
    #plantInterface(product, type) {
        return $(`
        <div id="product" class="mt-5" data-serial="${product.product.serial}" data-type="${type}">
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
            <div class="d-flex justify-content-between">
                <button id="newwindow" class="btn btn-info">Abrir ventana</button>
                <button id="btnbuy" class="btn btn-primary">Comprar</button>
            </div>
        </div>
    </div>
        `)
    }

    showAdminPanel() {
        this.menu_admin.empty();
        this.menu_admin.append(`
            <h1>Panel de administración</h1>
            <div id="adminpanel" class="mb-5">
            <div class="text-center border-bottom p-3">
                <p class="h5 fw-bold">PRODUCTOS <span class="fw-normal">(Almacén)</span></p>
                <button id="addProd" type="button" class="btn btn-lg btn-success value="addProd">Añadir</button>
                <button id="remProd" type="button" class="btn btn-lg btn-danger value="remProd">Eliminar</button>
            </div>
            <div class="text-center border-bottom p-3">
                <p class="h5 fw-bold">PRODUCTOS <span class="fw-normal">(Tiendas)</span></p>
                <button id="addProdIntoStore" type="button" class="btn btn-lg btn-success value="addCat">Añadir</button>
                <button id="remProdFromStore" type="button" class="btn btn-lg btn-danger value="remCat">Eliminar</button>
            </div>
            <div class="text-center border-bottom p-3">
                <p class="h5 fw-bold">CATEGORÍAS</p>
                <button id="addCat" type="button" class="btn btn-lg btn-success value="addCat">Añadir</button>
                <button id="remCat" type="button" class="btn btn-lg btn-danger value="remCat">Eliminar</button>
            </div>
            <div class="text-center border-bottom p-3">
                <p class="h5 fw-bold">TIENDAS</p>
                <button id="addStore" type="button" class="btn btn-lg btn-success value="addStore">Añadir</button>
                <button id="remStore" type="button" class="btn btn-lg btn-danger value="remStore">Eliminar</button>
            </div>
            </div>
            <div class="text-center border-bottom p-3">
                <p class="h5 fw-bold">EXPORTAR CAMBIOS A JSON</p>
                <button id="json" type="button" class="btn btn-lg btn-warning value="addStore">EXPORTAR</button>
            </div>
        `)
    }

    bindAdminMenu(hNewCategory, hNewStore, hRemCat, hRemStore, hNewProd, hAddProdIntoStore, hRemProd, hRemProdFromStore, hExportJSON) {
        $('#addCat').click(() => {
            hNewCategory();
        });
        $('#addStore').click(() => {
            hNewStore();
        });
        $('#remCat').click(() => {
            hRemCat();
        });
        $('#remStore').click(() => {
            hRemStore();
        });
        $('#addProd').click(() => {
            hNewProd();
        });
        $('#addProdIntoStore').click(() => {
            hAddProdIntoStore();
        });
        $('#remProd').click(() => {
            hRemProd();
        });
        $('#remProdFromStore').click(() => {
            hRemProdFromStore();
        });
        $('#json').click(() => {
            hExportJSON();
        });
    }

    bindNewCategoryForm(handler) {
        newCategoryValidation(handler);
    }
    bindNewStoreForm(handler) {
        newStoreValidation(handler);
    }
    bindRemCategoryForm(handler) {
        removeCategoryValidation(handler);
    }
    bindRemStoreForm(handler) {
        removeStoreValidation(handler);
    }

    //Productos
    bindNewPlantForm(handler) {
        newPlantValidation(handler);
    }
    bindNewMangaForm(handler) {
        newMangaValidation(handler);
    }
    bindNewFurnitureForm(handler) {
        newFurnitureValidation(handler);
    }
    bindAddProdIntoStoreForm(handler) {
        addIntoStoreValidation(handler);
    }
    bindRemProdForm(handler) {
        removeProdValidation(handler);
    }
    bindRemProdFromStoreForm(handler) {
        removeProdFromStoreValidation(handler);
    }

    //!FORMULARIOS
    showNewCategoryForm() {
        this.form.empty();
        let container = $(`
        <div class="card mb-3 form" id="new-category">
        <form name="fNewCategory" role="form" novalidate>
         <div class="card-header bg-dark text-white">AÑADIR CATEGORÍA</div>
         <div class="card-body" style="background-color: aliceblue;">
         
                 <div class="form-floating mb-3">
                     <input type="text" class="form-control" id="ncTitle" name="ncTitle" required>
                     <label for="address">Nombre</label>
                     <div class="invalidfeedback">El título es obligatorio.</div>
                     <div class="valid-feedback">Correcto.</div>
                 </div>
                 <div class="form-floating mb-3">
                     <input type="text" class="form-control" id="ncDescription" name="ncDescription">
                     <label for="address">Descripción</label>
                     <div class="invalid-feedback"></div>
                     <div class="valid-feedback">Correcto.</div>
                 </div>
         </div>
         <div class="card-footer d-flex justify-content-end bg-dark">
             <button class="btn btn-primary me-3" type="submit" >Enviar</button>
             <button class="btn btn-secondary" type="reset">Borrar</button>
         </div>
         </form>
     </div>
     `);
        this.form.append(container);
    }

    showNewStoreForm() {
        this.form.empty();
        let container = $(`
        <div class="card mb-3 form">
        <form name="fAddStore" role="form" novalidate>
        <div class="card-header bg-dark text-white">AÑADIR TIENDA</div>
        <div class="card-body" style="background-color: aliceblue;">
                <div class="row g-2 mb-3">
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="name" required>
                            <label for="name">Nombre *</label>
                            <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Ha de introducir un nombre.</p>
                        </div>
                    </div>
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="cif" required>
                            <label for="cif">CIF *</label>
                            <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Introduzca un CIF válido: ej: Z99999999.</p>
                        </div>
                    </div>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="address">
                    <label for="address">Dirección</label>
                    <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">.</p>
                </div>
                <div class="row g-2 mb-3">
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="coord">
                            <label for="coord">Coordenadas</label>
                            <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Introduzca un formato de coordenadas válido.</p>
                        </div>
                    </div>
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="phone">
                            <label for="phone">Teléfono</label>
                            <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Introduzca un formato de teléfono válido.</p>
                        </div>
                    </div>
                </div>
        </div>
        <div class="card-footer d-flex justify-content-end bg-dark">
            <button class="btn btn-primary me-3" type="submit">ENVIAR</button>
            <button class="btn btn-secondary" type="reset">Borrar</button>
        </div>
        </form>
    </div>
        `);
        this.form.append(container);
    }

    showRemoveCategoryForm(cat) {
        this.form.empty();
        let select = $(`<select class="form-select" name="rmCtitle" id="rmCtitle" required>
                            <option value=""> </option>`);
        for (const it of cat) {
            if (it.title != "DEFAULT") select.append(`<option value="${it.title}" >${it.title}</option>`);

        }
        select.append(`</select>`);
        let container = $(`
        <div class="card mb-3 form">
        <form name="fRemoveCategory" role="form" novalidate>
         <div class="card-header bg-dark text-white">ELIMINAR CATEGORÍA</div>
         <div class="card-body" style="background-color: aliceblue;">
         
                 <div id="aqui" class="form-floating mb-3">

                    <label for="floatingSelect">Elige una categoría</label>
                     <div class="invalidfeedback">Es obligatorio seleccionar una opción.</div>
                     <div class="valid-feedback">Correcto.</div>
                 </div>
         </div>
         <div class="card-footer d-flex justify-content-end bg-dark">
             <button class="btn btn-primary me-3" type="submit" >Enviar</button>
             <button class="btn btn-secondary" type="reset">Borrar</button>
         </div>
         </form>
     </div>
     `);
        container.find("#aqui").prepend(select);
        this.form.append(container);
    }

    showRemoveStoreForm(stores) {
        this.form.empty();
        let select = $(`<select class="form-select" name="rmSname" id="rmSname" required>
                            <option value=""> </option>`);
        for (const it of stores) {
            if (it.name != "DEFAULT") select.append(`<option value="${it.cif}" >${it.name}</option>`);

        }
        select.append(`</select>`);
        let container = $(`
        <div class="card mb-3 form">
        <form name="fRemoveStore" role="form" novalidate>
         <div class="card-header bg-dark text-white">ELIMINAR TIENDA</div>
         <div class="card-body" style="background-color: aliceblue;">
         
                 <div id="aqui" class="form-floating mb-3">

                    <label for="floatingSelect">Elige una tienda</label>
                     <div class="invalidfeedback">Es obligatorio seleccionar una opción.</div>
                     <div class="valid-feedback">Correcto.</div>
                 </div>
         </div>
         <div class="card-footer d-flex justify-content-end bg-dark">
             <button class="btn btn-primary me-3" type="submit" >Enviar</button>
             <button class="btn btn-secondary" type="reset">Borrar</button>
         </div>
         </form>
     </div>
     `);
        container.find("#aqui").prepend(select);
        this.form.append(container);
    }

    showNewProdForm(cat) {
        this.form.empty();
        let categories = $("<div></div>");
        for (const it of cat) {
            if (it.title != "DEFAULT") {
                categories.append(`
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${it.title}" id="${it.title}">
                <label class="form-check-label" for="flexCheckDefault">${it.title}</label>
            </div>
            `)
            }
        }
        let container = $(`
        <div id="newProd" class="" style="width: auto;">
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home"
                            aria-selected="true">Planta</button>
                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile"
                            type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Manga</button>
                        <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact"
                            type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Mueble</button>
                    </div>

                    <div class="tab-content mt-3" id="nav-tabContent" class="insertAqui">
                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel"
                            aria-labelledby="nav-home-tab">
        <div class=" mb-3 form">
                                <form name="fAddProdPlant" role="form" enctype="multipart/form-data" novalidate>
                                    <div class="card-header bg-dark text-white">AÑADIR PLANTA</div>
                                    <div class="card-body" style="background-color: aliceblue;">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" id="code" required>
                                            <label for="code">Código *</label>
                                            <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Ha de
                                                introducir un código.</p>
                                        </div>
                                        <div class="row g-2 mb-3">
                                            <div class="col-md">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" id="name" required>
                                                    <label for="name">Nombre *</label>
                                                    <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Ha
                                                        de introducir un nombre.</p>
                                                </div>
                                            </div>
                                            <div class="col-md">
                                                <div class="form-floating">
                                                    <input type="number" min="1" class="form-control" id="price"
                                                        required>
                                                    <label for="price">Precio *</label>
                                                    <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">
                                                        Introduzca un precio válido. Ej: 35</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" id="desc">
                                            <label for="desc">Descripción</label>
                                            <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">.</p>
                                        </div>
                                        <div id="insertCat" class="mb-3">
                                            <p class="fw-bold">Categorías</p>
                                        </div>
                                        <div class="row g-2 mb-3">
                                            <div class="col-md">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" id="ambient" required>
                                                    <label for="ambient">Ambiente *</label>
                                                    <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Ha
                                                        de introducir un Ambiente. (humidity|dryland|hot|cold)</p>
                                                </div>
                                            </div>
                                            <div class="col-md">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" id="leaf" required>
                                                    <label for="leaf">Hoja *</label>
                                                    <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">
                                                        Introduzca un tipo de hoja válido. (perennial|fallen)</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row g-2 mb-3">
                                            <div class="col-md">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" id="flower">
                                                    <label for="flower">Flor </label>
                                                    <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Ha
                                                        de introducir un tipo de Flor.
                                                        (spring|summer|autumm|winter|none)</p>
                                                </div>
                                            </div>
                                            <div class="col-md">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" id="color">
                                                    <label for="color">Color</label>
                                                    <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">
                                                        Introduzca un color.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input type="file" class="form-control" id="image" required>
                                            <label for="image">Imagen</label>
                                            <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Introduce
                                                una imagen.</p>
                                        </div>
                                    </div>
                                    <div class="card-footer d-flex justify-content-end bg-dark">
                                        <button class="btn btn-primary me-3" type="submit">ENVIAR</button>
                                        <button class="btn btn-secondary" type="reset">Borrar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
        <div class=" mb-3 form">
                        <form name="fAddProdManga" role="form" enctype="multipart/form-data" novalidate>
                            <div class="card-header bg-dark text-white">AÑADIR MANGA</div>
                            <div class="card-body" style="background-color: aliceblue;">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="code" required>
                                    <label for="code">Código *</label>
                                    <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Ha de
                                        introducir un código.</p>
                                </div>
                                <div class="row g-2 mb-3">
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="name" required>
                                            <label for="name">Nombre *</label>
                                            <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Ha
                                                de introducir un nombre.</p>
                                        </div>
                                    </div>
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input type="number" min="1" class="form-control" id="price" required>
                                            <label for="price">Precio *</label>
                                            <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">
                                                Introduzca un precio válido. Ej: 35</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="desc">
                                    <label for="desc">Descripción</label>
                                    <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">.</p>
                                </div>
                                <div id="insertCat" class="mb-3">
                                    <p class="fw-bold">Categorías</p>
                                </div>
                                <div class="row g-2 mb-3">
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="author">
                                            <label for="author">Autor</label>
                                            <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Introduce un
                                                autor.</p>
                                        </div>
                                    </div>
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="publisher">
                                            <label for="publisher">Publisher</label>
                                            <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Introduce un
                                                publisher.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="file" class="form-control" id="image" required>
                                    <label for="image">Imagen</label>
                                    <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Introduce
                                        una imagen.</p>
                                </div>
                            </div>
                            <div class="card-footer d-flex justify-content-end bg-dark">
                                <button class="btn btn-primary me-3" type="submit">ENVIAR</button>
                                <button class="btn btn-secondary" type="reset">Borrar</button>
                            </div>
                        </form>
                    </div> 
                        </div>
                        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
        <div class=" mb-3 form">
                        <form name="fAddProdFurniture" role="form" enctype="multipart/form-data" novalidate>
                            <div class="card-header bg-dark text-white">AÑADIR MUEBLE</div>
                            <div class="card-body" style="background-color: aliceblue;">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="code" required>
                                    <label for="code">Código *</label>
                                    <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Ha de
                                        introducir un código.</p>
                                </div>
                                <div class="row g-2 mb-3">
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="name" required>
                                            <label for="name">Nombre *</label>
                                            <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Ha
                                                de introducir un nombre.</p>
                                        </div>
                                    </div>
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input type="number" min="1" class="form-control" id="price" required>
                                            <label for="price">Precio *</label>
                                            <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">
                                                Introduzca un precio válido. Ej: 35</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="desc">
                                    <label for="desc">Descripción</label>
                                    <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">.</p>
                                </div>
                                <div id="insertCat" class="mb-3">
                                    <p class="fw-bold">Categorías</p>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="type" required>
                                    <label for="type">Material *</label>
                                    <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Introduzca un tipo de
                                        material. (Wood|Iron|Cristal|Plastic|Cloth).</p>
                                </div>
                                <div class="row g-2 mb-3">
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" min="1" required id="width">
                                            <label for="width">Anchura *</label>
                                            <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Introduce una
                                                anchura mayor a 1cm.</p>
                                        </div>
                                    </div>
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" min="1" required id="height">
                                            <label for="height">Altura *</label>
                                            <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Introduce una
                                                altura mayor a 1cm.</p>
                                        </div>
                                    </div>
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" min="1" required id="deep">
                                            <label for="deep">Profuncidad *</label>
                                            <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Introduce una
                                                profuncidad mayor a 1cm.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="file" class="form-control" id="image" required>
                                    <label for="image">Imagen</label>
                                    <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Introduce
                                        una imagen.</p>
                                </div>
                            </div>
                            <div class="card-footer d-flex justify-content-end bg-dark">
                                <button class="btn btn-primary me-3" type="submit">ENVIAR</button>
                                <button class="btn btn-secondary" type="reset">Borrar</button>
                            </div>
                        </form>
                    </div>
                        </div>
                    </div>
                </div>
        `);
        container.find("#insertCat").append(categories);
        this.form.append(container);
    }

    showAddProdIntoStoreForm(product, store) {
        this.form.empty();
        let stores = $(`<select class="form-select" name="store" id="store" required>
                            <option value=""> </option>`);
        for (const it of store) {
            if (it.name != "DEFAULT") stores.append(`<option value="${it.cif}" >${it.cif}</option>`);

        }
        stores.append(`</select>`);

        let products = $(`<select class="form-select" name="product" id="product" required>
                            <option value=""> </option>`);
        for (const it of product) {
            products.append(`<option value="${it.product.serial}" >${it.product.name}</option>`);

        }
        products.append(`</select>`);
        let container = $(`
        <div class="card mb-3 form">
        <form name="fAddProductInStore" role="form" novalidate>
         <div class="card-header bg-dark text-white">AÑADIR PRODUCTO A UNA TIENDA</div>
         <div class="card-body" style="background-color: aliceblue;">
                 <div class="row g-2 mb-3">
                 <div id="aquiProd" class="col-md form-floating mb-3">

                 <label for="floatingSelect">Elige un producto</label>
                  <div class="invalidfeedback">Es obligatorio seleccionar una opción.</div>
                  <div class="valid-feedback">Correcto.</div>
              </div>
              <div id="aquiStore" class="col-md form-floating mb-3">

              <label for="floatingSelect">Elige una tienda</label>
               <div class="invalidfeedback">Es obligatorio seleccionar una opción.</div>
               <div class="valid-feedback">Correcto.</div>
           </div>
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" min="1" required id="units">
                                            <label for="units">Unidades *</label>
                                            <p class="d-none text-danger fw-bold" style="font-size: 0.9em;">Introduce una
                                                cantidad mayor a 1u.</p>
                                        </div>
                                    </div>
                                </div>
         </div>
         <div class="card-footer d-flex justify-content-end bg-dark">
             <button class="btn btn-primary me-3" type="submit" >Enviar</button>
             <button class="btn btn-secondary" type="reset">Borrar</button>
         </div>
         </form>
     </div>
     `);
        container.find("#aquiProd").prepend(products);
        container.find("#aquiStore").prepend(stores);
        this.form.append(container);
    }

    showRemoveProdForm(product) {
        this.form.empty();
        let products = $(`<select class="form-select" name="product" id="product" required>
                            <option value=""> </option>`);
        for (const it of product) {
            products.append(`<option value="${it.product.serial}" >${it.product.name}</option>`);

        }
        products.append(`</select>`);
        let container = $(`
        <div class="card mb-3 form">
        <form name="fRemoveProd" role="form" novalidate>
         <div class="card-header bg-dark text-white">ELIMINAR PRODUCTO DEL ALMACÉN</div>
         <div class="card-body" style="background-color: aliceblue;">
                
                 <div id="aquiProd" class="col-md form-floating mb-3">

                  <label for="floatingSelect">Elige un producto</label>
                  <div class="invalidfeedback">Es obligatorio seleccionar una opción.</div>
                  <div class="valid-feedback">Correcto.</div>
              </div>
            
                
         </div>
         <div class="card-footer d-flex justify-content-end bg-dark">
             <button class="btn btn-primary me-3" type="submit" >Enviar</button>
             <button class="btn btn-secondary" type="reset">Borrar</button>
         </div>
         </form>
     </div>
     `);
        container.find("#aquiProd").prepend(products);
        this.form.append(container);
    }

    showRemoveProdFromStoreForm(product, store) {
        this.form.empty();
        let stores = $(`<select class="form-select" name="store" id="store" required>
                            <option value=""> </option>`);
        for (const it of store) {
            if (it.name != "DEFAULT") stores.append(`<option value="${it.cif}" >${it.cif}</option>`);

        }
        stores.append(`</select>`);

        let products = $(`<select class="form-select" name="product" id="product" required>
                            <option value=""> </option>`);
        for (const it of product) {
            products.append(`<option value="${it.product.serial}" >${it.product.name}</option>`);

        }
        products.append(`</select>`);
        let container = $(`
        <div class="card mb-3 form">
        <form name="fRemoveProductFromStore" role="form" novalidate>
         <div class="card-header bg-dark text-white">ELIMINAR PRODUCTO DE TIENDA</div>
         <div class="card-body" style="background-color: aliceblue;">
                 <div class="row g-2 mb-3">
                 <div id="aquiProd" class="col-md form-floating mb-3">

                 <label for="floatingSelect">Elige un producto</label>
                  <div class="invalidfeedback">Es obligatorio seleccionar una opción.</div>
                  <div class="valid-feedback">Correcto.</div>
              </div>
              <div id="aquiStore" class="col-md form-floating mb-3">

              <label for="floatingSelect">Elige una tienda</label>
               <div class="invalidfeedback">Es obligatorio seleccionar una opción.</div>
               <div class="valid-feedback">Correcto.</div>
           </div>
         </div>
         <div class="card-footer d-flex justify-content-end bg-dark">
             <button class="btn btn-primary me-3" type="submit" >Enviar</button>
             <button class="btn btn-secondary" type="reset">Borrar</button>
         </div>
         </form>
     </div>
     `);
        container.find("#aquiProd").prepend(products);
        container.find("#aquiStore").prepend(stores);
        this.form.append(container);
    }

    //!MODALES
    showRemoveModal(done, type, name, form, msg, msgerror, error) {
        let forms = {
            prodStore: $(document.fRemoveProductFromStore),
            prod: $(document.fRemoveProd),
            category: $(document.fRemoveCategory),
            store: $(document.fRemoveStore)
        }
        forms[form].find('div.error').remove();
        if (done) {
            let modal = $(`<div class="modal fade" id="newStoreModal" tabindex
       ="-1"
        data-backdrop="static" data-keyboard="false" role="dialog" arialabelledby="newStoreModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
        <h5 class="modaltitle" id="newStoreModalLabel">${type} eliminado.</h5>
        <button type="button" class="btn-close" datadismiss="modal" aria-label="Close">
        <span aria-hidden="true"></span>
        </button>
        </div>
        <div class="modal-body">
        ${type} <strong>${name}</strong> ${msg}.
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-primary" datadismiss="modal">Aceptar</button>
        </div>
        </div>
        </div>
        </div>`);
            $('body').append(modal);
            let newStoreModal = $('#newStoreModal');
            newStoreModal.modal('show');
            newStoreModal.find('button').click(() => {
                newStoreModal.on('hidden.bs.modal', function (event) {
                    forms[form][0].reset();
                    // forms[form][0].name.focus();
                    this.remove();
                });
                newStoreModal.modal('hide');
            })
        } else {
            forms[form].prepend(`<div class="error text-danger p3"><i class="fas fa-exclamationtriangle"></i> ${type} <strong>${name}</strong> ${msgerror}.
       </div>`);
        }
    }

    showNewModal(done, type, name, form, msg, msgerror, error) {
        let forms = {
            plant: $(document.fAddProdPlant),
            manga: $(document.fAddProdManga),
            furniture: $(document.fAddProdFurniture),
            category: $(document.fNewCategory),
            store: $(document.fAddStore),
            addProductStore: $(document.fAddProductInStore)
        }
        forms[form].find('div.error').remove();
        if (done) {
            let modal = $(`<div class="modal fade" id="newStoreModal" tabindex
       ="-1"
        data-backdrop="static" data-keyboard="false" role="dialog" arialabelledby="newStoreModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
        <h5 class="modaltitle" id="newStoreModalLabel">${type} creado</h5>
        <button type="button" class="btn-close" datadismiss="modal" aria-label="Close">
        <span aria-hidden="true"></span>
        </button>
        </div>
        <div class="modal-body">
        ${type} <strong>${name}</strong> ${msg}.
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-primary" datadismiss="modal">Aceptar</button>
        </div>
        </div>
        </div>
        </div>`);
            $('body').append(modal);
            let newStoreModal = $('#newStoreModal');
            newStoreModal.modal('show');
            newStoreModal.find('button').click(() => {
                newStoreModal.on('hidden.bs.modal', function (event) {
                    forms[form][0].reset();
                    // forms[form][0].name.focus();
                    this.remove();
                });
                newStoreModal.modal('hide');
            })
        } else {
            forms[form].prepend(`<div class="error text-danger p3"><i class="fas fa-exclamationtriangle"></i> ${type} <strong>${name}</strong> ${msgerror}.
       </div>`);
        }
    }

    bindLoginModalForm(handlerLogin, handlerLogout) {
        $("#bLogin").click(function () {
            handlerLogin();
        });
        $("#bLogout").click(function () {
            handlerLogout();
        });
    }

    bindLoginValidation(handler, users) {
        let form = document.forms.loginForm;
        $(form).attr('novalidate', true);
        $(form).submit(function (event) {
            let user;
            let isValid = false;
            for (const it of users) {
                if (this.user.value == it.user && this.pass.value == it.pass) {
                    isValid = true;
                    user = it.user;
                }
            }

            if (!isValid) {
                $(this).find("#errorMsg").removeClass("d-none");
            } else {
                handler(user);
            }
            event.preventDefault();
            event.stopPropagation();
        });
    }

    loginModal() {
        let modal = $(`<div class="modal fade" id="newStoreModal" tabindex="-1"
         data-backdrop="static" data-keyboard="false" role="dialog" arialabelledby="newStoreModalLabel" aria-hidden="true">
         <div class="modal-dialog" role="document">
         <div class="modal-content bg-white">
        <div class="modal-header">
        <h5 class="modaltitle" id="newStoreModalLabel">FORMULARIO LOGIN</h5>
        <button type="button" class="btn-close" datadismiss="modal" aria-label="Close">
        <span aria-hidden="true"></span>
        </button>
        </div>
        <div class="modal-body">
        <form name="loginForm" role="form" novalidate>
         <div class="mb-3">
           <label for="user" class="form-label">User</label>
           <input type="user" class="form-control" id="user" aria-describedby="userHelp">
         </div>
         <div class="mb-3">
           <label for="pass" class="form-label">Password</label>
           <input type="password" class="form-control" id="pass">
         </div>
        <p id="errorMsg" class="text-danger ps-3 d-none">Error en usuario o contraseña</p>
         <button type="submit" class="btn btn-primary">Submit</button>
       </form>
        </div>
        
       </div>
         </div>
         </div>`);
        $("body").append(modal);
        let newStoreModal = $('#newStoreModal');
        newStoreModal.modal('show');
        newStoreModal.find('button').click(() => {
            newStoreModal.on('hidden.bs.modal', function (event) {
                // this.remove();
            });
            // newStoreModal.modal('hide');
        })
    }

    showLoginInfo(user, date) {
        user = user("User");
        this.login.empty();
        if (user) {
            this.login.append(`
            <div><h1>Bienvenido ${user}: </h1> ${date}</div>
            `)
        }

    }
}


export default StoreHouseView;