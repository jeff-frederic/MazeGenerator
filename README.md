# Maze Generator
#### **Create large complex mazes with the push of a button!**
#### **Begin to create your own *[HERE.](https://jeff-frederic.github.io/MazeGenerator/)***

All you have to do is simply tell the generator the dimensions of the desired maze and press 'GENERATE'! You also have the option to view the Depth First Search algorithm create the randomized maze for you (it's a great way to understand the Depth First Search algorithm). There's also a 'SOLVE' button to display the solution to your randomized maze.

Once your maze has been created you can simply copy the maze, save it as an image or do whatever you want with it. Be sure to also save a copy of the solution in case you get stuck! 

## Development Process
With the use of JavaScript directly connected to HTML <canvas> element. The grid (of object Grid in /javascript/models.js) is a 2D array containing Cell objects (in /javascript/models.js) which are used to manipulate how the maze is generated and managed. All display events are handled in the /javascript/views.js module which allows us to display the grid according to each of the Cell's characteristics.

Example of created 50x50 grid:

![image](https://github.com/jeff-frederic/MazeGenerator/blob/main/assets/grid.PNG)

With every stored Cell in the 2D array, we are able to use randomized Depth First Search (DFS) to create a maze by starting at a random cell, tracking the cells which have been visited, and visiting random unvisited neighboring cells until no unvisiting cells remain.

You are able to view the Depth First Search algorithm at work in the site.

Example of DFS working in a 50x50 grid.

![image](https://github.com/jeff-frederic/MazeGenerator/blob/main/assets/DFS.png)

Resulting generated maze:

![image](https://github.com/jeff-frederic/MazeGenerator/blob/main/assets/maze.PNG)

The solution algorithm works similar to DFS by having as stack of all visited cells, removing from the stack those cells which have been visited and end in a wall, and returning only those which have reached the final destination successfully. 


### Things I Learned: 
This was one of my very first JavaScript projects, and WOW is it different from all the other languages I've used so far. 
- Promises and Timeouts
- Object manipulation 
- Returning functions
- Using function from other modules
- HTML Element specific JavaScript functions

---

Overall, this was a fun project and I hope you enjoy!

*@jeff-frederic*
