import { Grid } from "./models.js";
import { buildView } from "./views.js";
import * as constant from "./constants.js";


function displayGrid(view, grid){
    for(let i=0; i<constant.NUM_OF_ROWS; i++){
        for(let j=0; j<constant.NUM_OF_COLS; j++){
            view.generateCell(grid.getCell(i, j));
        }
    }
}

// Use this function later to reset the board in a cool fashion
function movement(view, grid){
    let interval;
    for(let i=0; i<constant.NUM_OF_ROWS; i++){
        for(let j=0; j<constant.NUM_OF_COLS; j++){
            let cell = grid.getCell(i, j);
            cell.active=true;
            interval = setTimeout(view.generateCell, (i+(2*j))*20, cell);
        }
    }
}

window.onload = () => {
    let view = buildView();
    let grid = new Grid(constant.NUM_OF_ROWS, constant.NUM_OF_COLS);
    displayGrid(view, grid);
    movement(view, grid);
}

// TODO: Recursive backtracking algorithm
//  -- Might need to put this is another file
//  -- Try to do this recursively AND non-recursively


// TODO: Implement movement between the cells with a slight time delay
//  -- Will help when implementing the function


