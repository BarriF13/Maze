/******************* Boilerplate **************************/
const {
  Engine,
  Render,
  Runner,
  World,
  Bodies
} = Matter;
const width = 800;
const height = 600;
const cells = 3;

const engine = Engine.create();
//**2-access snapshots of the object we have 
const { world } = engine;
//**-3 render them on screen
const render = Render.create({
  //** 4- telling render where to show the shapes in our html doc----------------
  element: document.body,
  //* 5- telling which engine to use
  engine: engine,
  //-6 also passing option objects -- we separate the width and height on the top----------
  options: {
    wireframes: false,
    width,
    height
  }
});

//7- Using Render to start rendering our render object
Render.run(render);
// 8- run everything with code below
Runner.run(Runner.create(), engine);

/******** Walls *********/
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 40, height, { isStatic: true }),
]
World.add(world, walls);
/******** Maze *********/
// const grid = []
// for (i = 0; i < 3; i++) {
//   grid.push([])
//   for (j = 0; j < 3; j++) {
//     grid[i].push(false);
//   }
// }

const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false)); // need to use map() to not change the original array
//console.log(grid)

/******** Verticals and Horizontals *********/
  const verticals = Array(cells)
  .fill(null)
  .map(()=>Array(cells -1).fill(false));

  const horizontals = Array(cells -1)
  .fill(null)
  .map(()=>Array(cells).fill(false));

 // console.log(verticals, horizontals)

/******** Starting point *********/
// --- pick a random start point
  const startRow = Math.floor(Math.random()*cells);
  const startColumn = Math.floor(Math.random()*cells);
  //console.log(startRow, startColumn)

//--func for walk into the game
const stepThroughCell = (row, column) =>{
// CHECKS :If i have visited the cell [row, column ], then return 
// mark the cell visited with false and true 

//Assemble randomly- ordered list of neighbors

// For each neighbor..
  // see if that neighbor is out of bounds
  // CHECKS : we have visited neighbor , continue to next  
  //Remove a wall from either hor or ver arrays
  //visit the next cell -- means call the whole func again 

};
// run the func for game to start 
stepThroughCell(startRow, startColumn)

/******** rectangle *********/

World.add(world, Bodies.rectangle(200, 200, 50, 50));


