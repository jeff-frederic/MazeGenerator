import * as constant from "./constants.js"

export class Cell{
    constructor(row, column){
        this.row = row;
        this.col = column;

        this.active = false;
        this.visited = false;

        // Order   = [top,  left, bottom, right]
        this.walls = [true, true, true, true]; 
    }

    disableWall(wall){
        switch (wall){
            case 'top':
                this.walls[0] = false;
                break;
            case 'left':
                this.walls[1] = false;
                break;
            case 'bottom':
                this.walls[2] = false;
                break;
            case 'right':
                this.walls[3] = false;
                break;
            default:
                console.log('! INVALID WALL !');
                break;
        }
    }

    enableWall(wall){
        switch (wall){
            case 'top':
                this.walls[0] = true;
                break;
            case 'left':
                this.walls[1] = true;
                break;
            case 'bottom':
                this.walls[2] = true;
                break;
            case 'right':
                this.walls[3] = true;
                break;
            default:
                console.log('! INVALID WALL !');
                break;
        }
    }

    resetCell(){
        this.active = false;
        this.visited = false;
        this.walls = [true, true, true, true];
    }
}


export class Grid{
    constructor(rows, columns){
        this.rows = rows;
        this.columns = columns;

        // 2D container for cells
        this.grid = new Array(this.rows);
        for(let i=0; i<this.rows; i++){
            this.grid[i] = new Array(this.columns);
        }

        // Populate grid with cells
        for(let i=0; i<this.rows; i++){
            for(let j=0; j<this.columns; j++){
                this.grid[i][j] = new Cell(i, j);
            }
        }
    }

    cell(row, col){
        return this.grid[row][col];
    }

    neighbors(cell){
        let neighbors = [];
        let top, left, bottom, right;
        let cellX = cell.row, cellY = cell.col;

        if(cellX == 0){
            bottom = this.cell(cellX+1, cellY);
            if (!bottom.visited){neighbors.push(bottom);}
        }
        else if(cellX == constant.NUM_OF_ROWS-1){
            top = this.cell(cellX-1, cellY);
            if(!top.visited){neighbors.push(top);}
        }
        else{
            top = this.cell(cellX-1, cellY);
            bottom = this.cell(cellX+1, cellY);
            if(!top.visited){neighbors.push(top);}
            if(!bottom.visited){neighbors.push(bottom);}
        }
        
        if(cellY == 0){
            right = this.cell(cellX, cellY+1);
            if(!right.visited){neighbors.push(right);}
        }
        else if(cellY == constant.NUM_OF_COLS-1){
            left = this.cell(cellX, cellY-1);
            if(!left.visited){neighbors.push(left);}
        }
        else{
            right = this.cell(cellX, cellY+1);
            left = this.cell(cellX, cellY-1);
            if(!right.visited){neighbors.push(right);}
            if(!left.visited){neighbors.push(left);}
        }
        
        return neighbors;
    }

    removeWall(cell, neighbor){
        if(cell.row == neighbor.row){
            if(cell.col == neighbor.col+1){
                neighbor.disableWall('bottom');
                cell.disableWall('top');
            }
            else{
                neighbor.disableWall('top');
                cell.disableWall('bottom');
            }
        }
        else{
            if(cell.row == neighbor.row+1){
                neighbor.disableWall('right');
                cell.disableWall('left');
            }
            else{
                neighbor.disableWall('left');
                cell.disableWall('right');
            }
        }
    }
}   