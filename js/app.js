const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

const rows = 50, columns = 50;
const cellWidth = Math.floor(canvas.width/columns);
const cellHeight = Math.floor(canvas.height/rows);

function generateGrid(){
    for(let i=0; i<canvas.height; i+=cellHeight){
        for(let j=0; j<canvas.width; j+= cellWidth){
            ctx.beginPath();
            const cell = new Cell(j, i, cellWidth, cellHeight);
            cell.generateCell()
            ctx.stroke();
        }
    }
}

class Cell {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        // Active Walls = [top, left, bottom, right];
        this.walls = [true, true, true, true];
    }

    generateCell(){
        this.generateCellRect();
        this.generateCellWalls();
    }

    generateCellRect(){
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    generateCellWalls(){
        if(this.walls[0]){
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x+this.width, this.y);
        }
        if(this.walls[1]){
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y+this.height);
        }
        if(this.walls[2]){
            ctx.moveTo(this.x, this.y+this.height);
            ctx.lineTo(this.x+this.width, this.y+this.height);
        }
        if(this.walls[3]){
            ctx.moveTo(this.x+this.width, this.y);
            ctx.lineTo(this.x+this.width, this.y+this.height);
        }

    }

}

generateGrid();