/******************* Boilerplate **************************/
const { Engine, Render, Runner, World, Bodies } = Matter;

//**1- new engine
const engine = Engine.create();
//**2-access snapshots of the object we have 
const { world } = engine;
//**-3 render them on screen
const render = Render.create({
  //** 4- telling render where to show the shapes in our html doc
  element: document.body,
  //* 5- telling which engine to use
  engine: engine,
  //-6 also passing option objects 
  options: {
    width: 800,
    height: 600
  }
});

//7- Using Render to start rendering our render object
Render.run(render);
// 8- run everything with code below
Runner.run(Runner.create(), engine);

/********************* sample to make a shape ************************/

// 9- create a shape -- from top left of the screen to the center of the object x, y axis:200,  width and height: 50
//const shape = Bodies.rectangle(200, 200, 50, 50, {
  //isStatic keeps the shape in place at start
 //isStatic: true
//});
//10- Drop it to world
//World.add(world, shape)

/******** Making a Demo *********/
//walls
const walls = [
  Bodies.rectangle(400, 0, 800, 40, {isStatic: true}),
  Bodies.rectangle(400, 600, 800, 40, {isStatic: true}),
  Bodies.rectangle(0, 300, 40, 600, {isStatic: true}),
  Bodies.rectangle(800,300, 40, 600, {isStatic: true}),
]
World.add(world, walls);
World.add(world, Bodies.rectangle(200, 200, 50, 50));
