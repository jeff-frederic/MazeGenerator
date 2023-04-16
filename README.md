# Maze Generator
#### **Create large complex mazes with the push of a button!**
#### **Begin to create your own *[HERE.](https://jeff-frederic.github.io/MazeGenerator/)***

All you have to do is simply tell the generator the dimensions of the desired maze and press 'GENERATE'! You also have the option to view the Depth First Search algorithm create the randomized maze for you (it's a great way to understand the Depth First Search algorithm). There's also a 'SOLVE' button to display the solution to your randomized maze.

Once your maze has been created you can simply copy the maze, save it as an image or do whatever you want with it. Be sure to also save a copy of the solution in case you get stuck! 

## Development Process
With the use of JavaScript directly connected to HTML <canvas> element, I was able to generate individual cells that I would then use as a grid. The grid (of object Grid in /javascript/models.js) is composed of a 2D array that contains Cell objects (in /javascript/models.js) which can be used to manipulate how the maze is generated, which walls get displayed and how to find a solution in the grid. All display events are handled in the /javascript/views.js module which allows us to take a grid, and display its objects on the canvas according to each object's characteristics. 



![image](https://github.com/jeff-frederic/MazeGenerator/blob/main/assets/DFS.png)


## Depth First Search


##  Things Learned:
