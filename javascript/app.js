

import { Cell, Grid } from "./models.js";
import { buildView } from "./views.js"
import { DepthFirstSearch } from "./algorithms.js";
import * as c from "./constants.js";

window.onload = () => {
    let view = buildView();
    let grid = new Grid(c.NUM_OF_ROWS, c.NUM_OF_COLS); 
    grid.load();
    view.displayGrid(grid);

    DepthFirstSearch(view, grid.at(5,8), grid, 10);


}