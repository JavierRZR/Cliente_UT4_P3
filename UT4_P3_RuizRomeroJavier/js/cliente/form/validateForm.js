import { Coord } from '../coord.js';
import { Store } from '../store.js';
import { Product, Plant, Manga, Furniture } from "../entities.js";

function showFeedBack(input, valid, message) {
    let validClass = (valid) ? 'is-valid' : 'is-invalid';
    let div = (valid) ? input.nextAll("div.validfeedback") : input.nextAll("div.invalid-feedback");
    input.nextAll('div').removeClass('d-block');
    div.removeClass('d-none').addClass('d-block');
    input.removeClass('is-valid is-invalid').addClass(validClass);
    if (message) {
        div.empty();
        div.append(message);
    }
}
function defaultCheckElement(event) {
    this.value = this.value.trim();
    if (!this.checkValidity()) {
        showFeedBack($(this), false);
    } else {
        showFeedBack($(this), true);
    }
}

function newCategoryValidation(handler) {
    let form = document.forms.fNewCategory;
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        this.ncDescription.value = this.ncDescription.value.trim();
        showFeedBack($(this.ncDescription), true);
        if (!this.ncTitle.checkValidity()) {
            isValid = false;
            showFeedBack($(this.ncTitle), false);
            firstInvalidElement = this.ncTitle;
        } else {
            showFeedBack($(this.ncTitle), true);
        }
        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.ncTitle.value, this.ncDescription.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });
    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalidfeedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));
    $(form.ncTitle).change(defaultCheckElement);
}


function newStoreValidation(handler) {
    let form = document.forms.fAddStore;
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        this.address.value = this.address.value.trim();
        showFeedBack($(this.address), true);
        this.coord.value = this.coord.value.trim();
        showFeedBack($(this.coord), true);
        this.phone.value = this.phone.value.trim();
        showFeedBack($(this.phone), true);
        //Validar Nombre
        if (!this.name.checkValidity()) {
            isValid = false;
            showFeedBack($(this.name), false);
            firstInvalidElement = this.name;
        } else {
            showFeedBack($(this.name), true);
        }
        //Validar Cif
        if (!this.cif.checkValidity() || !(Store.ERCIF.test(this.cif.value))) {
            isValid = false;
            showFeedBack($(this.cif), false);
            firstInvalidElement = this.cif;
        } else {
            showFeedBack($(this.cif), true);
        }
        //Validar coordenada
        if (this.coord.value != "") {
            try {
                let coord = new Coord();
                coord.changeLocation(this.coord.value);
                showFeedBack($(this.coord), true);
            } catch (error) {
                isValid = false;
                showFeedBack($(this.coord), false);
                firstInvalidElement = this.coord;
            }
        }
        //Validar telefono
        if (this.phone.value != "") {
            if (Store.ERPHONE.test(this.phone.value)) {
                showFeedBack($(this.phone), true);
            } else {
                isValid = false;
                showFeedBack($(this.phone), false);
                firstInvalidElement = this.phone;
            }
        }
        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.name.value, this.cif.value, this.address.value, this.coord.value, this.phone.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalidfeedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));
    $(form.name).change(defaultCheckElement);
    $(form.address).change(defaultCheckElement);
}

function removeCategoryValidation(handler) {
    let form = document.forms.fRemoveCategory;
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        if (!this.rmCtitle.checkValidity()) {
            isValid = false;
            showFeedBack($(this.rmCtitle), false);
            firstInvalidElement = this.rmCtitle;
        } else {
            showFeedBack($(this.rmCtitle), true);
        }
        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.rmCtitle.value,);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalidfeedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));
}

function removeStoreValidation(handler) {
    let form = document.forms.fRemoveStore;
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        if (!this.rmSname.checkValidity()) {
            isValid = false;
            showFeedBack($(this.rmSname), false);
            firstInvalidElement = this.rmSname;
        } else {
            showFeedBack($(this.rmSname), true);
        }
        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.rmSname.value,);
        }
        event.preventDefault();
        event.stopPropagation();
    });
    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalidfeedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));
}

function newPlantValidation(handler) {
    let form = document.forms.fAddProdPlant;
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {

        let isValid = true;
        let firstInvalidElement = null;
        let categories = [];
        for (const it of $(this).find(":checked")) {
            categories.push(it.value);
        }
        //Codigo
        if (!this.code.checkValidity()) {
            isValid = false;
            showFeedBack($(this.code), false);
            firstInvalidElement = this.code;
        } else {
            showFeedBack($(this.code), true);
        }
        //Nombre
        if (!this.name.checkValidity()) {
            isValid = false;
            showFeedBack($(this.name), false);
            firstInvalidElement = this.name;
        } else {
            showFeedBack($(this.name), true);
        }
        //Precio
        if (!this.price.checkValidity()) {
            isValid = false;
            showFeedBack($(this.price), false);
            firstInvalidElement = this.price;
        } else {
            showFeedBack($(this.price), true);
        }
        //Descripción
        if (!this.desc.checkValidity()) {
            isValid = false;
            showFeedBack($(this.desc), false);
            firstInvalidElement = this.desc;
        } else {
            showFeedBack($(this.desc), true);
        }
        //Imagen
        if (!this.image.checkValidity()) {
            isValid = false;
            showFeedBack($(this.image), false);
            firstInvalidElement = this.image;
        } else {
            showFeedBack($(this.image), true);
        }

        //Ambiente
        if (!this.ambient.checkValidity() || !(Plant.ERAMBIENT.test(this.ambient.value))) {
            isValid = false;
            showFeedBack($(this.ambient), false);
            firstInvalidElement = this.ambient;
        } else {
            showFeedBack($(this.ambient), true);
        }
        //Hoja
        if (!this.leaf.checkValidity() || !(Plant.ERLEAF.test(this.leaf.value))) {
            isValid = false;
            showFeedBack($(this.leaf), false);
            firstInvalidElement = this.leaf;
        } else {
            showFeedBack($(this.leaf), true);
        }
        //Flor
        if (this.flower.value != "") {
            if (!this.flower.checkValidity() || !(Plant.ERFLOWER.test(this.flower.value))) {
                isValid = false;
                showFeedBack($(this.flower), false);
                firstInvalidElement = this.flower;
            } else {
                showFeedBack($(this.flower), true);
            }
        } else {
            if (!this.flower.checkValidity()) {
                isValid = false;
                showFeedBack($(this.flower), false);
                firstInvalidElement = this.flower;
            } else {
                showFeedBack($(this.flower), true);
            }
        }
        //Color
        if (!this.color.checkValidity()) {
            isValid = false;
            showFeedBack($(this.color), false);
            firstInvalidElement = this.color;
        } else {
            showFeedBack($(this.color), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            let prod = {
                code: this.code.value,
                name: this.name.value,
                price: this.price.value,
                desc: this.desc.value || "undefined",
                categories: categories,
                image: this.image.value.substr(this.image.value.lastIndexOf("\\") + 1),
                ambient: this.ambient.value,
                leaf: this.leaf.value,
                flower: this.flower.value || "none",
                color: this.color.value || "undefined",
            }
            handler(prod);
        }
        event.preventDefault();
        event.stopPropagation();
    });
    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalidfeedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));
    $(form.code).change(defaultCheckElement);
    $(form.name).change(defaultCheckElement);
    $(form.price).change(defaultCheckElement);
    $(form.desc).change(defaultCheckElement);

}
function newMangaValidation(handler) {
    let form = document.forms.fAddProdManga;
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        let categories = [];
        for (const it of $(this).find(":checked")) {
            categories.push(it.value);
        }
        //Codigo
        if (!this.code.checkValidity()) {
            isValid = false;
            showFeedBack($(this.code), false);
            firstInvalidElement = this.code;
        } else {
            showFeedBack($(this.code), true);
        }
        //Nombre
        if (!this.name.checkValidity()) {
            isValid = false;
            showFeedBack($(this.name), false);
            firstInvalidElement = this.name;
        } else {
            showFeedBack($(this.name), true);
        }
        //Precio
        if (!this.price.checkValidity()) {
            isValid = false;
            showFeedBack($(this.price), false);
            firstInvalidElement = this.price;
        } else {
            showFeedBack($(this.price), true);
        }
        //Descripción
        if (!this.desc.checkValidity()) {
            isValid = false;
            showFeedBack($(this.desc), false);
            firstInvalidElement = this.desc;
        } else {
            showFeedBack($(this.desc), true);
        }
        //Imagen
        if (!this.image.checkValidity()) {
            isValid = false;
            showFeedBack($(this.image), false);
            firstInvalidElement = this.image;
        } else {
            showFeedBack($(this.image), true);
        }
        //Autor
        if (!this.author.checkValidity()) {
            isValid = false;
            showFeedBack($(this.author), false);
            firstInvalidElement = this.author;
        } else {
            showFeedBack($(this.author), true);
        }
        //Publisher
        if (!this.publisher.checkValidity()) {
            isValid = false;
            showFeedBack($(this.publisher), false);
            firstInvalidElement = this.publisher;
        } else {
            showFeedBack($(this.publisher), true);
        }


        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            let prod = {
                code: this.code.value,
                name: this.name.value,
                price: this.price.value,
                desc: this.desc.value || "undefined",
                categories: categories,
                image: this.image.value.substr(this.image.value.lastIndexOf("\\") + 1),
                author: this.author.value || "unknown",
                publisher: this.publisher.value || "unknown"
            }
            handler(prod);
        }
        event.preventDefault();
        event.stopPropagation();
    });
    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalidfeedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));
    $(form.code).change(defaultCheckElement);
    $(form.name).change(defaultCheckElement);
    $(form.price).change(defaultCheckElement);
    $(form.desc).change(defaultCheckElement);
}
function newFurnitureValidation(handler) {
    let form = document.forms.fAddProdFurniture;
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        let categories = [];
        for (const it of $(this).find(":checked")) {
            categories.push(it.value);
        }
        //Codigo
        if (!this.code.checkValidity()) {
            isValid = false;
            showFeedBack($(this.code), false);
            firstInvalidElement = this.code;
        } else {
            showFeedBack($(this.code), true);
        }
        //Nombre
        if (!this.name.checkValidity()) {
            isValid = false;
            showFeedBack($(this.name), false);
            firstInvalidElement = this.name;
        } else {
            showFeedBack($(this.name), true);
        }
        //Precio
        if (!this.price.checkValidity()) {
            isValid = false;
            showFeedBack($(this.price), false);
            firstInvalidElement = this.price;
        } else {
            showFeedBack($(this.price), true);
        }
        //Descripción
        if (!this.desc.checkValidity()) {
            isValid = false;
            showFeedBack($(this.desc), false);
            firstInvalidElement = this.desc;
        } else {
            showFeedBack($(this.desc), true);
        }
        //Imagen
        if (!this.image.checkValidity()) {
            isValid = false;
            showFeedBack($(this.image), false);
            firstInvalidElement = this.image;
        } else {
            showFeedBack($(this.image), true);
        }

        //Material
        if (!this.type.checkValidity() || !(Furniture.ERTYPE.test(this.type.value))) {
            isValid = false;
            showFeedBack($(this.type), false);
            firstInvalidElement = this.type;
        } else {
            showFeedBack($(this.type), true);
        }
        //Width
        if (!this.width.checkValidity()) {
            isValid = false;
            showFeedBack($(this.width), false);
            firstInvalidElement = this.width;
        } else {
            showFeedBack($(this.width), true);
        }
        //height
        if (!this.height.checkValidity()) {
            isValid = false;
            showFeedBack($(this.height), false);
            firstInvalidElement = this.height;
        } else {
            showFeedBack($(this.height), true);
        }
        //deep
        if (!this.deep.checkValidity()) {
            isValid = false;
            showFeedBack($(this.deep), false);
            firstInvalidElement = this.deep;
        } else {
            showFeedBack($(this.deep), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            let prod = {
                code: this.code.value,
                name: this.name.value,
                price: this.price.value,
                desc: this.desc.value || "undefined",
                categories: categories,
                image: this.image.value.substr(this.image.value.lastIndexOf("\\") + 1),
                type: this.type.value,
                width: this.width.value,
                height: this.height.value,
                deep: this.deep.value,
            }
            handler(prod);
        }
        event.preventDefault();
        event.stopPropagation();
    });
    $(form.code).change(defaultCheckElement);
    $(form.name).change(defaultCheckElement);
    $(form.price).change(defaultCheckElement);
    $(form.desc).change(defaultCheckElement);
}

function addIntoStoreValidation(handler) {
    let form = document.forms.fAddProductInStore;
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        //Product
        if (!this.product.checkValidity()) {
            isValid = false;
            showFeedBack($(this.product), false);
            firstInvalidElement = this.product;
        } else {
            showFeedBack($(this.product), true);
        }
        //store
        if (!this.store.checkValidity()) {
            isValid = false;
            showFeedBack($(this.store), false);
            firstInvalidElement = this.store;
        } else {
            showFeedBack($(this.store), true);
        }
        //units
        if (!this.units.checkValidity()) {
            isValid = false;
            showFeedBack($(this.units), false);
            firstInvalidElement = this.units;
        } else {
            showFeedBack($(this.units), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            let prod = {
                product: this.product.value,
                store: this.store.value,
                units: this.units.value
            }
            handler(prod);
        }
        event.preventDefault();
        event.stopPropagation();
    });
    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalidfeedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));
    $(form.units).change(defaultCheckElement);
}

function removeProdValidation(handler) {
    let form = document.forms.fRemoveProd;
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        //Codigo
        if (!this.product.checkValidity()) {
            isValid = false;
            showFeedBack($(this.product), false);
            firstInvalidElement = this.product;
        } else {
            showFeedBack($(this.product), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            let prod = {
                product: this.product.value,
            }
            handler(prod);
        }
        event.preventDefault();
        event.stopPropagation();
    });
    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalidfeedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));
}

function removeProdFromStoreValidation(handler) {
    let form = document.forms.fRemoveProductFromStore;
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        //Product
        if (!this.product.checkValidity()) {
            isValid = false;
            showFeedBack($(this.product), false);
            firstInvalidElement = this.product;
        } else {
            showFeedBack($(this.product), true);
        }
        //store
        if (!this.store.checkValidity()) {
            isValid = false;
            showFeedBack($(this.store), false);
            firstInvalidElement = this.store;
        } else {
            showFeedBack($(this.store), true);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            let prod = {
                product: this.product.value,
                store: this.store.value,
            }
            handler(prod);
        }
        event.preventDefault();
        event.stopPropagation();
    });
    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalidfeedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));
}

export {
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
};