
var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 7;
var ballSpeedY = 7;
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;


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

  //canvas.addEventListener('mousedown', restart());
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
function calculateComputerPos(){
  var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
  if(paddle2YCenter < ballY - 35) {
    paddle2Y += 6;
  } else if(paddle2YCenter > ballY + 35) {
    paddle2Y -= 6;
  }
}
function draw() {
  calculateComputerPos();
  //Background
  colourRect(0, 0, canvas.width, canvas.height, 'black');
  //Left player paddel
  colourRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
  //Right computer paddel
  colourRect(canvas.width-PADDLE_WIDTH, paddle2Y, canvas.width - PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
  //Ball
  colourBall(ballX, ballY, 10, 0, Math.PI*2, true, 'white');
  //canvasContext.fillText();
}

function move(){
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;

  if(ballX >= canvas.width - PADDLE_WIDTH){
    if(ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT){
      ballSpeedX = -ballSpeedX;
    }
    else{
      reset();
    }
  }
  if(ballX < PADDLE_WIDTH){
    if(ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT){
      ballSpeedX = -ballSpeedX;
    }
    else{
      reset();
    }
  }
  if(ballY >= canvas.height ){
    ballSpeedY = -ballSpeedY;
  }
  if(ballY < 0){
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
function restart(){

}
function reset(){
  ballX = canvas.width/2;
  ballY = canvas.height/2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = -ballSpeedY;
}