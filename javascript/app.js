

import { Cell, Grid } from "./models.js";
import { buildView } from "./views.js"
import { DepthFirstSearch , randomInt, solution} from "./algorithms.js";



let view, grid; 
let solve = false, generating = false;


document.getElementById('generate').addEventListener('click', generateMaze);
document.getElementById('solve').addEventListener('click', solveMaze);


window.onload = () => {
    view = buildView();
    grid = new Grid(view.NUM_OF_ROWS, view.NUM_OF_COLS); 
    grid.load();
    view.displayGrid(grid);
}

function generateMaze(){
   if(!generating){ 
    solve = false; generating = true;

    view = buildView();
    grid = new Grid(view.NUM_OF_ROWS, view.NUM_OF_COLS); 
    grid.load();
    view.displayGrid(grid);

    let randomCell = grid.at(randomInt(view.NUM_OF_ROWS), randomInt(view.NUM_OF_COLS))
    let promise = DepthFirstSearch(view, randomCell, grid, view.VISUALIZE);
    promise.then(()=>{
        let origin = grid.at(0,0); origin.target=true; view.displayCell(origin);
        let finish = grid.at(view.NUM_OF_ROWS-1, view.NUM_OF_COLS-1); finish.target = true; view.displayCell(finish);
        solve = true; generating = false;
    });}
}

function solveMaze(){
    let origin = grid.at(0,0)
    let finish = grid.at(view.NUM_OF_ROWS-1, view.NUM_OF_COLS-1);
    if(solve){solution(view, grid, origin, finish);}
}