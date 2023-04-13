

export function buildView(){
    const canvas = document.getElementById('mazeCanvas');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const context = canvas.getContext('2d');

    // TODO: Needs to be moved
    //  -- Want to get the rows and cols from the client
    const numRows = 30;
    const numCols = 30;

    // TODO: Needs to be moved
    //  -- Possibly into the constants file
    const activeColor = 'green';
    const visitedColor = 'lightgreen';
    const unvisitedColor = 'lightblue';
    const wallColor = 'red';

    const cellWidth = Math.floor(canvasWidth/numRows);
    const cellHeight = Math.floor(canvasHeight/numCols);

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
    }
}