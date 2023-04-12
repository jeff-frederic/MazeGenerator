import * as view from "./views.js"

export class Cell {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.walls = [true, true, true, true];      // [north, west, south, east]
        
        this.active = false;
        this.visited = false;
    }

    generateCell(){
        this.generateCellRect();
        this.generateCellWalls();
    }

    generateCellRect(){
        if(this.active){view.ctx.fillStyle = 'green';}
        else if(this.visited){view.ctx.fillStyle = 'lightgreen';}
        else{view.ctx.fillStyle = 'lightgrey';}
        view.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    generateCellWalls(){
        if(this.walls[0]){
            view.ctx.beginPath();
            view.ctx.moveTo(this.x, this.y);
            view.ctx.lineTo(this.x+this.width, this.y);
            view.ctx.stroke();
        }
        if(this.walls[1]){
            view.ctx.beginPath();
            view.ctx.moveTo(this.x, this.y);
            view.ctx.lineTo(this.x, this.y+this.height);
            view.ctx.stroke();
        }
        if(this.walls[2]){
            view.ctx.beginPath();
            view.ctx.moveTo(this.x, this.y+this.height);
            view.ctx.lineTo(this.x+this.width, this.y+this.height);
            view.ctx.stroke();
        }
        if(this.walls[3]){
            view.ctx.beginPath();
            view.ctx.moveTo(this.x+this.width, this.y);
            view.ctx.lineTo(this.x+this.width, this.y+this.height);
            view.ctx.stroke();
        }
    }

    disableWall(direction){
        switch (direction){
            case 'north':
                this.walls[0] = false;
                break;
            case 'west':
                this.walls[1] = false;
                break;
            case 'south':
                this.walls[2] = false;
                break;
            case 'east':
                this.walls[3] = false;
                break;
            default:
                break;
        }
        this.generateCell();
    }

    setVisited(){
        this.visited = true;
        this.generateCell();
    }
}

export class Grid{
    constructor(){
        this.grid = new Array(view.rows);
        
    }

    populateGrid(){
        for(let i=0; i*view.cellHeight<view.canvas.height; i++){
            this.grid[i] = new Array(view.columns);
            for(let j=0; j*view.cellWidth<view.canvas.width; j++){
                view.ctx.beginPath();
                const cell = new Cell(j*view.cellWidth, i*view.cellHeight, view.cellWidth, view.cellHeight);
                this.grid[i][j] = cell;
                cell.generateCell()
                view.ctx.stroke();
            }
        }
    }

    clearGrid(){
        view.ctx.clearRect(0,0,view.canvas.width,view.canvas.height);
    }

    getCellNeighbors(row, column){
        const neighbors = [];
        let north, west, south, east;
        
        if(row == 0){
            south = this.grid[row+1][column];
            neighbors.push(south);
        }
        else if(row == view.rows-1){
            north = this.grid[row-1][column];
            neighbors.push(north);
        }
        else{
            north = this.grid[row-1][column];
            south = this.grid[row+1][column];
            neighbors.push(north, south);
        }

        if(column == 0){
            east = this.grid[row][column+1];
            neighbors.push(east);
        }
        else if(column == view.columns-1){
            west = this.grid[row][column-1];
            neighbors.push(west);
        }
        else{
            east = this.grid[row][column+1];
            west = this.grid[row][column-1];
            neighbors.push(east, west);
        }

        return neighbors;
    }
}