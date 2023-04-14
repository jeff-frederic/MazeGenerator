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

// TODO: Move into the view file
//  -- This has to do going through each cell and viewing it.
//  -- Has a diagonal view to it

// Use this function later to reset the board in a cool fashion
function diagonalDisplay(view, grid){
    for(let i=0; i<constant.NUM_OF_ROWS; i++){
        for(let j=0; j<constant.NUM_OF_COLS; j++){
            let cell = grid.cell(i, j);
            setTimeout(view.generateCell, (i+j)*50, cell);
        }
    }
}

window.onload = () => {
    let view = buildView();
    let grid = new Grid(constant.NUM_OF_ROWS, constant.NUM_OF_COLS);
    displayGrid(view, grid);

    let randomRow = Math.floor(Math.random() * constant.NUM_OF_ROWS);
    let randomCol = Math.floor(Math.random() * constant.NUM_OF_COLS);

    DepthFirstSearch(view, grid, grid.cell(randomRow, randomCol), 1);
    diagonalDisplay(view, grid);

}

// TODO: Recursive backtracking algorithm
//  -- Might need to put this is another file
//  -- Try to do this recursively AND non-recursively


async function DepthFirstSearch(view, grid, randomCell, delay){
    let stack = [];
    stack.push(randomCell);
    
    while (stack.length > 0) {
        let currentCell = stack.pop();
        
        currentCell.visited = true;
        view.generateCell(currentCell);
        
        if(delay){
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    
        let neighbors = grid.neighbors(currentCell);
        if (neighbors.length > 0) {
          let randomIndex = Math.floor(Math.random() * neighbors.length);
          let nextCell = neighbors[randomIndex];
    
          grid.removeWall(currentCell, nextCell);
          grid.removeWall(nextCell, currentCell);
    
          stack.push(currentCell);
          stack.push(nextCell);
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


