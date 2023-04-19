/**
 * Object models used to control how the individual 
 * cells of the grid, and how the grid uses those cells
 * to produce a maze.
 * 
 * Created by @jeff-frederic
 * April, 2023
 * NOT MAINTAINED
 */


/**
 * Cell object that has unique properties which 
 * we use to control the behavior of the cell and
 * how it interacts with other cells in the grid.
 *  this.row = location in row
 *  this.col = location in col
 *  this.active = if the cell is currently being visited
 *  this.visited = if the cell has been visited
 *  this.target = if the cell is of higher importance
 *  this.walls = which walls are up (true=wall, false=no wall)
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

    // Turns off a specifed wall
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

    // Brings back the cell to the original settings
    resetCell(){
        this.active = false;
        this.visited = false;
        this.walls = [true, true, true, true];
    }


    // Only resets the flags of the cell
    resetCellFlags(){
        this.active = false;
        this.visited = false;
    }
}




/**
 * Grid object in charge of managing the 2D array containing 
 * all Cell objects. We will use this object to take a look at
 * neighboring cells, if there is a clear path, etc. 
 *  this.rows = height of grid
 *  this.cols = width of grid
 *  this.grid = container for 2D array
 */
export class Grid{
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
    }

    // Creates the 2D array with Cells
    load(){
        this.grid = new Array(this.rows);
        for(let i=0; i<this.rows; i++){
            this.grid[i] = new Array(this.cols);
            for(let j=0; j<this.cols; j++){
                this.grid[i][j] = new Cell(i, j);
            }
        }
    }

    // Clears the grid container
    clear(){
        this.grid = [];
    }

    // Returns a cell at a specific location
    at(row, col){
        return this.grid[row][col];
    }

    // Returns the neighbors of a given cell
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

    // Returns neighbors that have a clear path
    // from the specified cell
    availableNeighbors(cell){
        let available = []

        if(!cell.walls[0] && !this.at(cell.row-1, cell.col).visited){available.push(this.at(cell.row-1, cell.col));}
        if(!cell.walls[1] && !this.at(cell.row, cell.col-1).visited){available.push(this.at(cell.row, cell.col-1));}
        if(!cell.walls[2] && !this.at(cell.row+1, cell.col).visited){available.push(this.at(cell.row+1, cell.col));}
        if(!cell.walls[3] && !this.at(cell.row, cell.col+1).visited){available.push(this.at(cell.row, cell.col+1));}

        return available;
    }

    // Removes a wall between a given cell 
    // and a adjacent cell.
    removeWall(cell, adjacentCell){
        let x = cell.row, y = cell.col;
        let x_adj = adjacentCell.row, y_adj = adjacentCell.col;

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


