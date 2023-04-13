

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

    getCell(row, col){
        return this.grid[row][col];
    }

    // TODO: getNeighborCells function
}