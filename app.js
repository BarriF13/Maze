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

const grid = Array(3)
  .fill(null)
  .map(() => Array(3).fill(false)); // need to use map() to not change the original array
console.log(grid)

/******** Verticals and Horizontals *********/
  const verticals = Array(3)
  .fill(null)
  .map(()=>Array(2).fill(false));

  const horizontals = Array(2)
  .fill(null)
  .map(()=>Array(3).fill(false));

  console.log(verticals, horizontals)
/******** rectangle *********/

World.add(world, Bodies.rectangle(200, 200, 50, 50));


