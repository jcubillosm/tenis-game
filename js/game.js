
var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 5;
var ballSpeedY = 5;
var paddle1Y = 250;
const PADDLE_HEIGHT =100;

// Only executed our code once the DOM is ready.
window.onload = function() {
  // Get a reference to the canvas object
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  var fps = 30;
  setInterval(function(){
              draw();
              move();
            }, 1000 / fps);
  canvas.addEventListener('mousemove',
    function(evt) {
      var mousePos = calculateMousePos(evt);
      paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    });
}

function calculateMousePos(evt){
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return{
    x:mouseX,
    y:mouseY
  };
}

function draw() {
  //Background
  colourRect(0, 0, canvas.width, canvas.height, 'black');
  //Left panel
  colourRect(0, paddle1Y, 50, PADDLE_HEIGHT, 'white');

  //Ball
  colourBall(ballX, ballY, 10, 0, Math.PI*2, true, 'white');
}

function move(){
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;

  if(ballX >= canvas.width || ballX < 0){
    ballSpeedX = -ballSpeedX;
  }
  if(ballY >= canvas.height || ballY < 0){
    ballSpeedY = -ballSpeedY;
  }
}

function colourRect(leftX, topY, width, height, drawColour){
  canvasContext.fillStyle = drawColour;
  canvasContext.fillRect(leftX, topY, width, height);
}
function colourBall(centerX, centerY, width, height, arc, pos, drawColour){
  canvasContext.fillStyle = drawColour;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, width, height, arc, pos);
  canvasContext.fill();
}