/**
 * Implementation of all maze generation algorithms.
 * 
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
            
            if(delay){
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            
            view.displayCell(curr); 
            view.displayCell(adj);
            
            stack.push(curr);
            stack.push(adj);
        }
    }
    view.clearGridColors(grid);
}

export async function solution(view, grid, cell, endCell){
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
            view.displayCell(adj);
            view.displayCell(curr); 
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


export function randomInt(max){
    return Math.floor(Math.random() * max);
}