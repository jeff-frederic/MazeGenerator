/**
 * Initializes all of the components needed for the actual display 
 * onto the webpage. Takes control of how Cell and Grid objects are
 * displayed onto the <canvas> and how the constants are used.
 * 
 * Created by @jeff-frederic
 * April, 2023
 * NOT MAINTAINED
 */

import * as c from "./constants.js";


export function buildView(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const VISUALIZE = document.getElementById('visualize').checked;

    const NUM_OF_ROWS = document.getElementById('rows').value;
    const NUM_OF_COLS = document.getElementById('cols').value;

    const CELL_WIDTH = c.CELL_WIDTH;
    const CELL_HEIGHT = c.CELL_HEIGHT;

    canvas.width = CELL_WIDTH*NUM_OF_COLS;
    canvas.height = CELL_HEIGHT*NUM_OF_ROWS;

    return {
        /**
         * Takes in a cell, displays it according to its
         * characteristics.
         * @param {Cell} cell 
         */
        displayCell(cell){
            let x = cell.col*CELL_WIDTH, y = cell.row*CELL_HEIGHT;

            // Displaying cell bg color
            if(cell.active){ctx.fillStyle = c.CELL_ACTIVE_COLOR;}
            else if(cell.visited){ctx.fillStyle = c.CELL_VISITED_COLOR;}
            else{ctx.fillStyle = c.CELL_UNVISITED_COLOR;}
            if(cell.target){ctx.fillStyle = c.CELL_TARGET_COLOR;}
            ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT);

            // Displaying cell walls
            let walls = cell.walls;
            if(walls[0]){   // top
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x+CELL_WIDTH, y);
                ctx.stroke();
            }
            if(walls[1]){   // left
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y+CELL_HEIGHT);
                ctx.stroke();
            }
            if(walls[2]){   // bottom
                ctx.beginPath();
                ctx.moveTo(x, y+CELL_HEIGHT);
                ctx.lineTo(x+CELL_WIDTH, y+CELL_HEIGHT);
                ctx.stroke();
            }
            if(walls[3]){   // right
                ctx.beginPath();
                ctx.moveTo(x+CELL_WIDTH, y);
                ctx.lineTo(x+CELL_WIDTH, y+CELL_HEIGHT);
                ctx.stroke();
            }
        },
        /**
         * Takes in a Grid, and displays it according to its 
         * characteristics.
         * @param {Grid} grid 
         */
        displayGrid(grid){
            for(let i=0; i<NUM_OF_ROWS; i++){
                for(let j=0; j<NUM_OF_COLS; j++){
                    this.displayCell(grid.at(i, j));
                }
            }
        },
        /**
         * Removes all colors of the grid
         * by completely resetting it.
         * @param {Grid} grid 
         */
        clearGridColors(grid){
            for(let i=0; i<NUM_OF_ROWS; i++){
                for(let j=0; j<NUM_OF_COLS; j++){
                    let cell = grid.at(i, j);
                    cell.resetCellFlags();
                    this.displayCell(cell);
                }
            }
        }, 
        // Returing the specified rows, cols, and boolean display vars
        // in order to pass them on to Grid and Cell objects
        NUM_OF_ROWS, NUM_OF_COLS, VISUALIZE
    }
}