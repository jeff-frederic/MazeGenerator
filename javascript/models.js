import * as view from "./views.js"

export class Cell {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.walls = [true, true, true, true];      // [top, left, bottom, right]
        
        this.active = false;
        this.visited = false;
    }

    generateCell(){
        this.generateCellWalls();
        this.generateCellRect();
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
}
