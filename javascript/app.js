

import { Cell, Grid } from "./models.js";
import { buildView } from "./views.js"
import { DepthFirstSearch , randomInt} from "./algorithms.js";
import * as c from "./constants.js";

window.onload = () => {
    let view = buildView();
    let grid = new Grid(c.NUM_OF_ROWS, c.NUM_OF_COLS); 
    grid.load();
    view.displayGrid(grid);

    let randomCell = grid.at(randomInt(c.NUM_OF_ROWS), randomInt(c.NUM_OF_COLS))
    DepthFirstSearch(view, randomCell, grid, 0);
}