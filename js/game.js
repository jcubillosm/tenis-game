
var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 10;
var paddle1Y = 250;
var paddle2Y = 250;
var score1 = 0;
var score2 = 0;
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

/**
 * calculateMousePos: Calcule mouse position
 * to move user paddle
 * @param  {[obj]} evt
 * @return {[obj]} Position x and y of pointer
 */
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
/**
 * calculateComputerPos: Calcule position of ball to move
 * the computer paddle
 * @return {[ none]} 
 */
function calculateComputerPos(){
  var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);

  //Calculate random number to be speed of computer paddle 
  var speed = Math.round(Math.random() * (15 - 6)) + 6;
  if(paddle2YCenter < ballY - 35) {
    paddle2Y += speed;
  } else if(paddle2YCenter > ballY + 35) {
    paddle2Y -= speed;
  }
}
/**
 * draw: call the function draw on canvas
 * @return {[none]}
 */
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
  canvasContext.fillText('Player 1: ' + score1, canvas.width/4, 100);
  canvasContext.fillText('Player 2: ' + score2, canvas.width*3/4, 100);
  //Draw the center net
  net();
}
/**
 * net: call function draw center net odd times
 * @return {[none]} 
 */
function net(){
  var count = (canvas.height/30) ;
  for(var i = 0; i < 30; i++){
    colourRect(canvas.width/2, (count*i*2) - 1 , 5, 25, 'white');
  }
}
/**
 * move: Move the ball
 * @return {[none]}
 */
function move(){
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;

  if(ballX >= canvas.width - PADDLE_WIDTH){
    if(ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT){
      ballSpeedX = -ballSpeedX;
    }
    else{
      score1++;
      resetBall();
    }
  }
  if(ballX < PADDLE_WIDTH){
    if(ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT){
      ballSpeedX = -ballSpeedX;
    }
    else{
      score2++;
      resetBall();
    }
  }
  if(ballY >= canvas.height ){
    ballSpeedY = -ballSpeedY;
  }
  if(ballY < 0){
    ballSpeedY = -ballSpeedY;
  }
}

/**
 * colourRect: Draw paddles and net on canvas
 * @param  {[number]} leftX: left position on screen
 * @param  {[number]} topY :Right position on screen
 * @param  {[number]} width
 * @param  {[number]} height
 * @param  {[Colour]} drawColour: colour
 * @return {[none]}
 */
function colourRect(leftX, topY, width, height, drawColour){
  canvasContext.fillStyle = drawColour;
  canvasContext.fillRect(leftX, topY, width, height);
}
/**
 * colourBall: draw ball
 * @param  {[number]} centerX
 * @param  {[number]} centerY
 * @param  {[number]} width
 * @param  {[number]} height
 * @param  {[number]} arc
 * @param  {[number]} pos
 * @param  {[number]} drawColour
 * @return {[none]}
 */
function colourBall(centerX, centerY, width, height, arc, pos, drawColour){
  canvasContext.fillStyle = drawColour;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, width, height, arc, pos);
  canvasContext.fill();
}
function restart(){

}
/**
 * resetBall: return ball to center
 * @return {[none]}
 */
function resetBall(){
  ballX = canvas.width/2;
  ballY = canvas.height/2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = -ballSpeedY;
}