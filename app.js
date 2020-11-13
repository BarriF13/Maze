/******************* Boilerplate **************************/
const {
  Engine,
  Render,
  Runner,
  World,
  Bodies
} = Matter;
const width = 600;
const height = 600;
const cells = 10;

const unitLength = width / cells;


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
  Bodies.rectangle(width / 2, 0, width, 5, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 5, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 5, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 5, height, { isStatic: true }),
]
World.add(world, walls);

/******** rectangle *********/

// World.add(world, Bodies.rectangle(200, 200, 50, 50));

/******** Maze *********/
// const grid = []
// for (i = 0; i < 3; i++) {
//   grid.push([])
//   for (j = 0; j < 3; j++) {
//     grid[i].push(false);
//   }
// }
//--- Shuffle func for neighbors
const shuffle = arr => {
  let counter = arr.length;//3

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);//2
    counter--;//2

    const temp = arr[counter];//3th
    arr[counter] = arr[index] //3th swap with 2th
    arr[index] = temp; //2th swap with 3th

  }
  return arr;
};
const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false)); // need to use map() to not change the original array
//console.log(grid)

/******** Verticals and Horizontals *********/
const verticals = Array(cells)
  .fill(null)
  .map(() => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1)
  .fill(null)
  .map(() => Array(cells).fill(false));

// console.log(verticals, horizontals)

/******** Starting point *********/
// --- pick a random start point
const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);
//console.log(startRow, startColumn)

//--func for walk into the game
const stepThroughCell = (row, column) => {
  // CHECKS :If i have visited the cell [row, column ], then return 
  if (grid[row][column]) {
    return;
  }

  // mark the cell visited with false and true 
  grid[row][column] = true;
  //Assemble randomly- ordered list of neighbors -- we need to find a way to randomize this
  const neighbors = shuffle([
    [row - 1, column, 'up'],
    [row, column + 1, 'right'],
    [row + 1, column, 'down'],
    [row, column - 1, 'left']
  ]);
  // console.log(neighbors)
  // For each neighbor..
  for (let neighbor of neighbors) {
    // see if that neighbor is out of bounds
    const [nextRow, nextColumn, direction] = neighbor;
    if (
      nextRow < 0 ||
      nextRow >= cells ||
      nextColumn < 0 ||
      nextColumn >= cells
    ) {
      continue;//skip
    }
    // CHECKS : we have visited neighbor , continue to next neighbor
    if (grid[nextRow][nextColumn]) {
      continue; //skip
    }
    //Remove a wall from either hor or ver arrays
    if (direction === 'left') {
      verticals[row][column - 1] = true;
    } else if (direction === 'right') {
      verticals[row][column] = true;
    } else if (direction === 'up') {
      horizontals[row - 1][column] = true;
    } else if (direction === 'down') {
      horizontals[row][column] = true;
    }
    stepThroughCell(nextRow, nextColumn);
  }
  //visit the next cell -- means call the whole func again 


};

// run the func for game to start 
stepThroughCell(startRow, startColumn)
//stepThroughCell(1, 1)
//console.log(grid)

/***********    Making the walls *********************/
horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open === true) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLength + unitLength / 2,
      rowIndex * unitLength + unitLength,
      unitLength,
      10, {
      isStatic: true
    }
    );
    World.add(world, wall);
  });
});
verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open === true) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLength + unitLength,
      rowIndex * unitLength + unitLength / 2,
      10,
      unitLength,
      {
        isStatic: true
      }
    );
    World.add(world, wall);
  });
});
/***********    GOALS  *********************/

const goal = Bodies.rectangle(
  width - unitLength / 2,
  height - unitLength / 2,
  unitLength * .7,
  unitLength * .7, {
  isStatic: true
}
);
World.add(world, goal)


/***********    Ball  *********************/
const ball = Bodies.circle(
  unitLength / 2,
  unitLength / 2,
  unitLength / 4
);
World.add(world, ball)

/***********    Keyboard  *********************/
document.addEventListener('keydown', e => {
  if (e.keyCode === 87) {
    console.log('up')
  } 
  
  if (e.keyCode === 68) {
    console.log('R')

  } 
   if (e.keyCode === 83) {
    console.log('d')

  } 
  if (e.keyCode === 65) {
    console.log('L')
  }
})