import { Grid } from "./models.js";
import { buildView } from "./views.js";
import * as constant from "./constants.js";


function displayGrid(view, grid){
    for(let i=0; i<constant.NUM_OF_ROWS; i++){
        for(let j=0; j<constant.NUM_OF_COLS; j++){
            view.generateCell(grid.cell(i, j));
        }
    }
}

// Use this function later to reset the board in a cool fashion
function movement(view, grid){
    let interval;
    for(let i=0; i<constant.NUM_OF_ROWS; i++){
        for(let j=0; j<constant.NUM_OF_COLS; j++){
            let cell = grid.cell(i, j);
            cell.active=true;
            interval = setTimeout(view.generateCell, (i+(2*j))*20, cell);
        }
    }
}

window.onload = () => {
    let view = buildView();
    let grid = new Grid(constant.NUM_OF_ROWS, constant.NUM_OF_COLS);
    displayGrid(view, grid);
    //movement(view, grid);
    let randomRow = Math.floor(Math.random() * constant.NUM_OF_ROWS);
    let randomCol = Math.floor(Math.random() * constant.NUM_OF_COLS);

    DepthFirstSearch(view, grid, grid.cell(randomRow, randomCol));
}

// TODO: Recursive backtracking algorithm
//  -- Might need to put this is another file
//  -- Try to do this recursively AND non-recursively
function DepthFirstSearch(view, grid, cell){
    let timeout = 50;
    let neighbors = grid.neighbors(cell);
    cell.active = true;
    setTimeout(view.generateCell, timeout, cell);
    cell.active = false;
    
    while(neighbors.length > 0){
        let randomCell = selectRandomDelete(neighbors);
        if(!randomCell.visited){
            randomCell.visited = true;
            grid.removeWall(cell, randomCell);
            setTimeout(view.generateCell, timeout, randomCell);
            DepthFirstSearch(view, grid, randomCell);
        }
    }
}


/**
 * Allows us to select an element from an array
 * randomly, returns said element, then removes
 * it from the array.
 */
function selectRandomDelete(array){
    let r = Math.floor(Math.random() * array.length);
    let cell = array[r];
    array.splice(r, 1);
    return cell;
}


// TODO: Implement movement between the cells with a slight time delay
//  -- Will help when implementing the function


