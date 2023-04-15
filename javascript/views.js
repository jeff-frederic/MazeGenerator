/**
 * Builds components needed to properly manage the canvas drawings, size, 
 * appearance, updating, etc. 
 * @returns Functions that control the canvas
 */

import * as c from "./constants.js";


export function buildView(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const NUM_OF_ROWS = c.NUM_OF_ROWS;
    const NUM_OF_COLS = c.NUM_OF_COLS;

    const CELL_WIDTH = c.CELL_WIDTH;
    const CELL_HEIGHT = c.CELL_HEIGHT;

    canvas.width = CELL_WIDTH*NUM_OF_COLS;
    canvas.height = CELL_HEIGHT*NUM_OF_ROWS;

    return {
        displayCell(cell){
            let x = cell.col*CELL_WIDTH, y = cell.row*CELL_HEIGHT;

            // Displaying cell bg color
            if(cell.active){ctx.fillStyle = c.CELL_ACTIVE_COLOR;}
            else if(cell.visited){ctx.fillStyle = c.CELL_VISITED_COLOR;}
            else{ctx.fillStyle = c.CELL_UNVISITED_COLOR;}
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
        displayGrid(grid){
            for(let i=0; i<c.NUM_OF_ROWS; i++){
                for(let j=0; j<c.NUM_OF_COLS; j++){
                    this.displayCell(grid.at(i, j));
                }
            }
        },
        clearGridColors(grid){
            for(let i=0; i<c.NUM_OF_ROWS; i++){
                for(let j=0; j<c.NUM_OF_COLS; j++){
                    let cell = grid.at(i, j);
                    cell.resetCellFlags();
                    this.displayCell(cell);
                }
            }
        }
    }
}