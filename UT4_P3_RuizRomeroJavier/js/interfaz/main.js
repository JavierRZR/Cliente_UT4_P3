import StoreHouseApp from "../cliente/StoreHouse/storehouseApp.js";

$(function () {

    //Arrow top scroll
    let arrow = $('<i class="fas fa-arrow-circle-up display-3"></i>');
    arrow.css({
        position: "fixed",
        right: "0.5em",
        bottom: "0.5em",
        color: "orange",
        cursor: "pointer"
    })
    arrow.click((event) => {
        window.scroll(0, 0);
    })
    $("body").append(arrow);
});

const historyActions = {
    init: () => {
        StoreHouseApp.handleInit();
    },
    storeFilter: (event) => StoreHouseApp.handleDisplayStoreProducts(event.state.store, event.state.storename),
    categoryFilter: (event) => StoreHouseApp.handleDisplayCategoryProducts(event.state.category),
    typeFilter: (event) => StoreHouseApp.handleDisplayTypeProducts(event.state.type),
    displayProductInfo: (event) => StoreHouseApp.handleDisplayProductInfo(event.state.serial, event.state.type)
}

window.addEventListener('popstate', function (event) {
    if (event.state) {
        console.log(event.state.action);
        historyActions[event.state.action](event);
    }
});

history.replaceState({ action: 'init' }, null);