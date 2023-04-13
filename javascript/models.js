

export class Cell{
    constructor(row, column){
        this.row = row;
        this.col = column;

        this.active = false;
        this.visited = false;

        // Order   = [top,  left, bottom, right]
        this.walls = [true, true, true, true]; 
    }


    setActive(isActive){
        this.active = isActive;
    }

    setVisited(isVisited){
        this.visited = isVisited;
    }

}