// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create({enableSleeping: true});

// create a renderer
var render = Render.create({
    element: document.querySelector(".galton-container"),
    engine: engine,
    canvas: document.querySelector("#galton-cnv"),
    options: {
      background:"#20212A",
      width: 360,
      height: 640,
      wireframes: false,
      showSleeping: false
    }
});



$(document).on('change','#inp',function(){
  $("#test_wrapper").css('background-color',""+document.getElementById('inp').value);
  $("body").css('background-color',""+document.getElementById('inp').value);
  $("#submit").css('background-color',""+document.getElementById('inp').value);
  $("#submit").css('background-image',"none");
});

// Global Variables
var allObjs = [];
var foregroundColor = "rgba(85, 85, 85, 0.5)";

// Setting Pins
var evenCount = 0;
var oddCount = 0;
var pinOptions = {
  isStatic: true,
  render: {
    fillStyle: foregroundColor,
    strokeStyle: foregroundColor
  }
}
function setPins(){
  for (var i = 0; i < 12; i++) {
    if (i % 2 === 0) {
      for (var j = 0; j < 9; j++) {
        allObjs.push(Bodies.circle((j * 40) + 20, (evenCount * 52) + 106, 5, pinOptions));
      }
      evenCount++;
    } else {
      for (var k = 0; k < 10; k++) {
        allObjs.push(Bodies.circle((k * 40), (oddCount * 52) + 132, 5, pinOptions));
      }
      oddCount++;
    }
  }
  evenCount = 0;
  oddCount = 0;
}
setPins();
// Finished: Setting Pins

var TrialOptions = {
  restitution: 0.3 ,
  friction: 0.5,
  render: {fillStyle: "#FE00AE",
           strokeStyle: "#FE00AE"}
}

var counter = 0;
var allBalls = [];
var test = function(){
  if (counter < limit) {
    var newBall = Bodies.circle(180, 0 , 5, TrialOptions);
    allBalls.push(newBall);
    World.add(engine.world,newBall );
    counter++;
  }
}
var limit = 0;
var generateBalls = setInterval(test, 30);




// Setting Baskets
function setBaskets() {
  for (var i = 0; i < 10; i++) {
    allObjs.push(Bodies.rectangle(i * 40, 552, 8, 257, {isStatic: true,
                                                         render: {
                                                          fillStyle: foregroundColor,
                                                          strokeStyle: foregroundColor}}));
  }
}

setBaskets();
// Finished: Baskets


// Setting Walls
var ground = Bodies.rectangle(400, 670, 810, 60, { isStatic: true, render: {
 fillStyle: foregroundColor,
 strokeStyle: foregroundColor} });

var funnelLeft = Bodies.rectangle(135, 30, 100, 5, { isStatic: true, render: {
 fillStyle: foregroundColor,
 strokeStyle: foregroundColor} });

 Matter.Body.rotate(funnelLeft, 53 * (Math.PI/180));

 var funnelRight = Bodies.rectangle(225, 30, 100, 5, { isStatic: true, render: {
  fillStyle: foregroundColor,
  strokeStyle: foregroundColor} });

  Matter.Body.rotate(funnelRight, 127 * (Math.PI/180));

allObjs.push(ground);
//allObjs.push(funnelLeft);
//allObjs.push(funnelRight);
// Finished: Walls

document.getElementById('submit').addEventListener("click", function(){
  World.remove(engine.world, allBalls);
  limit = parseInt(document.getElementById('nn').value);
  counter = 0;
  TrialOptions.render.fillStyle = document.getElementById('inp').value;
  TrialOptions.render.strokeStyle = document.getElementById('inp').value;
})



// add all of the bodies to the world
World.add(engine.world, allObjs);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
