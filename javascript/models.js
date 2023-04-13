

export class Cell{
    constructor(row, column, width, height){
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;

        this.active = false;
        this.visited = false;

        this.walls = [true, true, true, true]; 
    }

    get coordinates(){
        return [this.row, this.column];
    }
}