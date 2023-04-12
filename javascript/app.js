import { Grid } from "./models.js";
import * as view from "./views.js";

const grid = new Array(view.rows);

window.onload = () => {
    var grid = new Grid();
    grid.populateGrid();
};