import { Cell } from "./models.js";
import * as view from "./views.js";

const grid = new Array(view.rows);

function generateGrid(){
    for(let i=0; i*view.cellHeight<view.canvas.height; i++){
        grid[i] = new Array(view.columns);
        for(let j=0; j*view.cellWidth<view.canvas.width; j++){
            view.ctx.beginPath();
            const cell = new Cell(j*view.cellWidth, i*view.cellHeight, view.cellWidth, view.cellHeight);
            grid[i][j] = cell;
            cell.generateCell()
            view.ctx.stroke();
        }
    }
}

generateGrid();
