/**
 * Implementation of all maze generation algorithms.
 * 
 */



export async function DepthFirstSearch(view, cell, grid, delay){
    let stack = [];
    cell.visited = true;
    stack.push(cell);

    while(stack.length > 0){
        let curr = stack.pop();
        curr.active = true;
        view.displayCell(curr);
        curr.active = false;
        let neighbors = grid.unvisitedNeighbors(curr);
        if(neighbors.length > 0){
            let adj = neighbors[Math.floor(Math.random()*neighbors.length)];
            grid.removeWall(curr, adj);
            if(delay){await new Promise(resolve => setTimeout(resolve, delay));}
            adj.visited = true;
            view.displayCell(curr); 
            view.displayCell(adj);
            stack.push(curr);
            stack.push(adj);
        }
    }
}