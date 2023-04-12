import { Grid } from "./models.js";
import * as view from "./views.js";

const grid = new Array(view.rows);

window.onload = () => {
    var grid = new Grid();
    grid.populateGrid();
    // grid.removeNeighboringWall(grid.getCell(2, 2), grid.getCell(2, 3));
    grid.DepthFirstSearch(0,0);
};