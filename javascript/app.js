

import { Cell, Grid } from "./models.js";
import { buildView } from "./views.js"
import { DepthFirstSearch , randomInt, solution} from "./algorithms.js";
import * as c from "./constants.js";

window.onload = () => {
    let view = buildView();
    let grid = new Grid(c.NUM_OF_ROWS, c.NUM_OF_COLS); 
    grid.load();
    view.displayGrid(grid);

    let randomCell = grid.at(randomInt(c.NUM_OF_ROWS), randomInt(c.NUM_OF_COLS))
    let promise = DepthFirstSearch(view, randomCell, grid, 1);
    promise.then(()=>{
        let origin = grid.at(0,0); origin.target=true; view.displayCell(origin);
        let finish = grid.at(c.NUM_OF_ROWS-1, c.NUM_OF_COLS-1); finish.target = true; view.displayCell(finish);
    });
}