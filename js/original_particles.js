//here's the original for future reference, from https://codepen.io/F5/pen/QEKVXq


var mainCanvas = document.getElementById("myCanvas");
var mainContext = mainCanvas.getContext('2d');
 
var circles = new Array();
         
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

function Circle(radius, speed, width, xPos, yPos) {
  this.radius = radius;
  this.speed = speed/4;
  this.width = width;
  this.xPos = xPos;
  this.yPos = yPos;
  this.opacity = .01 + Math.random() * .8;
 
  this.counter = 0;
 
  var signHelper = Math.floor(Math.random() * 3);
 
  if (signHelper == 1) {
    this.sign = -1;
  } else {
    this.sign = 1;
  }
}
 
Circle.prototype.update = function () {
 
  this.counter += this.sign * this.speed;
 
  mainContext.beginPath();
             
  mainContext.arc(
    this.xPos + Math.cos(this.counter / 50) * this.radius, 
    this.yPos + Math.sin(this.counter / 50) * this.radius, 
    this.width, 
    0, 
    Math.PI * 2,
    false
  );
                             
  mainContext.closePath();
 
  mainContext.fillStyle = 'rgba(235, 245, 251,' + 1.5*this.opacity + ')';
  mainContext.fill();
};
 
function drawCircles() {
  for (var i = 0; i < 150; i++) {
    var randomX = Math.round(-100 + Math.random() * 2000);
    var randomY = Math.round(-100 + Math.random() * 2000);
    var speed = .2 + Math.random() * 2;
    var size = 1 + Math.random() * 60;
 
    var circle = new Circle(40, speed, size, randomX, randomY);
    circles.push(circle);
  }

  draw();
}

drawCircles();
 
function draw() {
  mainContext.clearRect(0, 0, 2000, 2000);
 
  for (var i = 0; i < circles.length; i++) {
    var myCircle = circles[i];
    myCircle.update();
  }
  
  requestAnimationFrame(draw);
}