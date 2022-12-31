var mainCanvas = document.getElementById("myCanvas");
var mainContext = mainCanvas.getContext('2d');
mainContext.globalCompositeOperation = "destination-over";
 
var circles = new Array();
         
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

function Circle(radius, speed, width, xPos, yPos) {
  this.radius = radius;
  this.width = width;
  this.xPos = xPos;
  this.yPos = yPos;

  this.width_ratio = this.width/70 //N.B. 70 is maximum width size
  this.width_ratio_inv = 1/this.width_ratio;

  this.speed = speed/speed*this.width_ratio_inv + 0.1;
  this.speed = 0.1 + this.speed/30;

  this.opacity = .6 + Math.random() * .2 - this.width_ratio/4 ;

  //Randomly generate phase argument for this Circle, used to control opacity later
  this.initialPhase = Math.random() * Math.PI;
 
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
    this.xPos + Math.cos(this.initialPhase + this.counter / 40) * this.radius, 
    this.yPos - Math.sin(this.initialPhase + this.counter / 40) * this.radius, //higher y-direction frequency increases the perception of vertical motion
    this.width, 
    0, 
    Math.PI * 2,
    false
  );
                             
  mainContext.closePath();

  var alphaPhase = Math.pow(Math.cos(this.initialPhase + this.counter/40), 1);
 
  mainContext.fillStyle = 'rgba(235, 245, 251,' + 1.2*this.opacity*alphaPhase + ')';
  mainContext.fill();
};
 
function drawCircles() {
  for (var i = 0; i < 250; i++) {
    var randomX = Math.round(-100 + Math.random() * 2000);
    var randomY = Math.round(-100 + Math.random() * 2000);
    var speed = 0.005 + Math.random() * 1.5;
    var size = 5 + Math.random() * 70;
 
    var circle = new Circle(40, speed, size, randomX, randomY);
    circles.push(circle);

//repeating the above argument to add extra small circles
/*
    var randomX = Math.round(-100 + Math.random() * 2000);
    var randomY = Math.round(-100 + Math.random() * 2000);
    var speed = 0.5 + Math.random() * 2.5;
    var size = 10 + Math.random() * 50;
 
    var circle = new Circle(40, speed, size, randomX, randomY);
    circles.push(circle);
*/

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