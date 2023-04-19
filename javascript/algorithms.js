/**
 * Algorithms needed to properly create and 
 * solve a Maze. 
 * 
 * Created by @jeff-frederic
 * April, 2023
 * NOT MAINTAINED
 */


/**
 * Depth First Search algorithm that will starts at a specified cell, 
 * and begins randomly visiting and removing walls of all unvisited neighbors 
 * until there are no more left. Ending result is a maze.   
 * @param {View} view Used to display the resulting/changing grid 
 * @param {Cell} cell Cell where DFS will start from 
 * @param {Grid} grid Used to manage Cell objects and find their neighbors
 * @param {Integer} delay Specifes if DFS should have a slight delay
 */
export async function DepthFirstSearch(view, cell, grid, delay){
    let stack = [];
    stack.push(cell);
    cell.visited = true;

    while(stack.length > 0){
        let curr = stack.pop();
        let neighbors = grid.neighbors(curr);
        let unvisited = []
        for(let i=0; i<neighbors.length; i++){if(!neighbors[i].visited){unvisited.push(neighbors[i]);}}
        
        curr.active = true;
        view.displayCell(curr);
        curr.active = false;

        if(unvisited.length > 0){
            let adj = unvisited[Math.floor(Math.random()*unvisited.length)];
            grid.removeWall(curr, adj);
            adj.visited = true;
            
            
            view.displayCell(curr); 
            view.displayCell(adj);
            
            stack.push(curr);
            stack.push(adj);
        }
        
        if(delay){
            await new Promise(resolve => setTimeout(resolve, 1));
        }
    }
    view.clearGridColors(grid);
}


/**
 * Function that uses Depth First Search to find the path from 
 * a starting cell to and ending cell. Result of this function 
 * is that it will highlight all cells in that path in the grid.
 * @param {view} view Will allow display of solution
 * @param {Grid} grid Used to manage all cells
 * @param {Cell} cell starting cell of the path 
 * @param {Cell} endCell ending cell of the path
 */
export function solution(view, grid, cell, endCell){
    let stack = [];
    stack.push(cell);
    cell.visited = true;

    while(stack.length > 0){
        let curr = stack.pop();
        let available = grid.availableNeighbors(curr);
        
        curr.active = true;
        view.displayCell(curr);
        curr.active = false;

        if(available.length > 0){
            let adj = available[Math.floor(Math.random()*available.length)];
            
            adj.visited = true;
            view.displayCell(curr); 
            view.displayCell(adj);
            stack.push(curr);
            stack.push(adj);
            
            if(adj.row == endCell.row && adj.col == endCell.col){
                view.clearGridColors(grid);
                for(let i=0; i<stack.length; i++){
                    stack[i].target = true;
                    view.displayCell(stack[i]);
                }
                break;
            }
        }
    }

}

/**
 * Function that takes in a integer and using the Math.random() function, 
 * find a random integer in the range (0-(max-1)).
 * @param {*} max Max value of range (not including max).
 * @returns Random integer between 0 and max (not including max).
 */
export function randomInt(max){
    return Math.floor(Math.random() * max);
}