/**
 * Object models to assist with the manipulation of elements in the maze.
 *  - Cell : Object that handles a single cell in the maze
 *  - Grid : Object that manages the grid as a whole, performing operations
 *      on cells.
 */


export class Cell{
    constructor(row, col){
        this.row = row;
        this.col = col;

        this.active = false;
        this.visited = false;
        this.target = false;

        this.walls = [true, true, true, true];
        // Walls => {top, left, bottom, right}
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
                break
            default:
                break;
        }
    }

    resetCell(){
        this.active = false;
        this.visited = false;
        this.walls = [true, true, true, true];
    }

    resetCellFlags(){
        this.active = false;
        this.visited = false;
    }
}



export class Grid{
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
    }

    load(){
        this.grid = new Array(this.rows);
        for(let i=0; i<this.rows; i++){
            this.grid[i] = new Array(this.cols);
            for(let j=0; j<this.cols; j++){
                this.grid[i][j] = new Cell(i, j);
            }
        }
    }

    clear(){
        this.grid = [];
    }

    at(row, col){
        return this.grid[row][col];
    }

    neighbors(cell){
        let row = cell.row, col = cell.col;
        let top, left, bottom, right;
        let neighbors = [];
        if(row > 0){
            top = this.at(row-1, col);
            neighbors.push(top);
        }
    
        if(row < this.rows-1){
            bottom = this.at(row+1, col);
            neighbors.push(bottom);
        }
    
        if(col > 0){
            left = this.at(row, col-1);
            neighbors.push(left);
        }
    
        if(col < this.cols-1){
            right = this.at(row, col+1);
            neighbors.push(right);
        }

        return neighbors;
    }

    availableNeighbors(cell){
        let available = []

        if(!cell.walls[0] && !this.at(cell.row-1, cell.col).visited){available.push(this.at(cell.row-1, cell.col));}
        if(!cell.walls[1] && !this.at(cell.row, cell.col-1).visited){available.push(this.at(cell.row, cell.col-1));}
        if(!cell.walls[2] && !this.at(cell.row+1, cell.col).visited){available.push(this.at(cell.row+1, cell.col));}
        if(!cell.walls[3] && !this.at(cell.row, cell.col+1).visited){available.push(this.at(cell.row, cell.col+1));}

        return available;
    }

    removeWall(cell, adjacentCell){
        let x = cell.row, y = cell.col;
        let x_adj = adjacentCell.row, y_adj = adjacentCell.col;

        // Might need to check that they are ACTUALLY adjacent

        if(x == x_adj){
            if(y_adj > y){
                cell.disableWall('right');
                adjacentCell.disableWall('left');
            }
            else if(y_adj < y){
                cell.disableWall('left');
                adjacentCell.disableWall('right');
            }
        }
        else if (y == y_adj){
            if(x_adj > x){
                cell.disableWall('bottom');
                adjacentCell.disableWall('top');
            }
            else if(x_adj < x){
                cell.disableWall('top');
                adjacentCell.disableWall('bottom');
            }
        }
    }
}


