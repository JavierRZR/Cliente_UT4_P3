import StoreHouse from "./storehouse.js";
import StoreHouseController from "./storehouseController.js";
import StoreHouseView from "./storehouseView.js";


const StoreHouseApp = new StoreHouseController(
    StoreHouse.getInstance(), new StoreHouseView()
);

export default StoreHouseApp;