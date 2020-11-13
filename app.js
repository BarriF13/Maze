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
// 9- create a shape
const shape = Bodies.rectangle(200, 200, 50, 50, {
  isStatic: true
});
//10- Drop it to world
World.add(world, shape)