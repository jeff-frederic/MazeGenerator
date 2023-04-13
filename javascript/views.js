import * as constant from "./constants.js";

export function buildView(){
    const canvas = document.getElementById('mazeCanvas');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const context = canvas.getContext('2d');

    // TODO: Needs to be moved
    //  -- Want to get the rows and cols from the client
    const numRows = constant.NUM_OF_ROWS;
    const numCols = constant.NUM_OF_COLS;

    // TODO: Needs to be moved
    //  -- Possibly into the constants file
    const activeColor = 'green';
    const visitedColor = 'lightgreen';
    const unvisitedColor = 'lightblue';
    const wallColor = 'red';

    const cellWidth = Math.floor(canvasWidth/numRows);
    const cellHeight = Math.floor(canvasHeight/numCols);

    // TODO: Resizing window issue
    //  -- Find a way to fix the canvas alignment when the window is resized
    //  -- Possibly add a container that wraps the maze, which would also need to be resized
    //      -- Take a look at resource online on how to do this

    return {
        generateCell(cell){
            let x = cell.row, y = cell.col;
            let originX = x*cellWidth, originY = y*cellHeight;

            // Could be an issue at rendering
            if(x == numRows){x--;}
            if(y == numCols){y--;}

            // Draw cell rectangle
            if(cell.active){context.fillStyle = activeColor;}
            else if(cell.visited){context.fillStyle = visitedColor;}
            else{context.fillStyle = unvisitedColor;}
            context.fillRect(originX, originY, cellWidth, cellHeight)

            // Draw cell walls
            let walls = cell.walls;
            context.strokeStyle = wallColor;
            if(walls[0]){
                // Adding top wall
                context.beginPath();
                context.moveTo(originX, originY);
                context.lineTo(originX+cellWidth, originY);
                context.stroke();
            }
            if(walls[1]){
                // Adding left wall
                context.beginPath();
                context.moveTo(originX, originY);
                context.lineTo(originX, originY+cellHeight);
                context.stroke();
            }
            if(walls[2]){
                // Adding bottom wall
                context.beginPath();
                context.moveTo(originX, originY+cellHeight);
                context.lineTo(originX+cellWidth, originY+cellHeight);
                context.stroke();
            }
            if(walls[3]){
                // Adding right wall
                context.beginPath();
                context.moveTo(originX+cellWidth, originY);
                context.lineTo(originX+cellWidth, originY+cellHeight);
                context.stroke();
            }
        }
        //TODO: clearCanvas function
        //  -- sets a big rectangle on top of the canvas
    }
}