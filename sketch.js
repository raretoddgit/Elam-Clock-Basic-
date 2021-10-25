/*
  Draws a clock. Outside radius arcs with seconds
  Circle goes:  
                3*PI/2 at the top
                      |
  PI on the left    - o -       0 on the right
                      |
                PI/2 at the bottom
  
Program works by rotating the drawing surface proportional to the angle
of each hand, then drawing the line for the hand.

created 22 Aug 2012
re-written for P5.js 1 May 2016
by Tom Igoe
*/

// parameters of the clock:
var clockRadius = 600;
var handLength = 300;
var handStart = -10;
var angle = 0;

function setup() {
  // set the general parameters for drawing:
  createCanvas(windowWidth, windowHeight);
  smooth();
  strokeWeight(2);
  strokeCap(ROUND);
  angleMode(DEGREES);
}

let desiredSecondTime = 45;
let desiredMinuteTime = 210;
let desiredHourTime = 333;


function draw() {
  background(255);
  angleMode(DEGREES);
  translate(width / 2, height / 2); 
  rotate(360); 

  // draw second hand:
  let secondHand = new Hand(desiredSecondTime, second(), '#000', handLength, 60);
  secondHand.display();
  
  // draw minute hand:
  let minuteHand = new Hand(desiredMinuteTime, minute(), '#FF0000', handLength, 60)
  minuteHand.display();

  // draw hour hand:
  let hourHand = new Hand(desiredHourTime, hour(), '#ace', handLength, 12)
  hourHand.display();
  
  
  // draw arc from 0 to current second:
  push();
  stroke("#5597cf"); 
  strokeWeight(4);
  noFill(); 
  arc(0, 0, clockRadius, clockRadius, 270, angle);
  angle += 0.24;
  pop();
}

let isPressed = false;

function mousePressed() {
  isPressed = true; 
}

function mouseReleased() {
  isPressed = false;
}


class Hand {
  constructor(desiredTime, handType, handColor, handLength, divisions){
    this.desiredTime = desiredTime;
    this.handType = handType;
    this.handColor = handColor;
    this.handLength = handLength;
    this.divisions = divisions;
  }
  update(){
    if (isPressed) { 
      rotate(this.desiredTime * 2 * PI / this.divisions); // rotate to draw hand according to desired time,
    } else {
      rotate(this.handType * 1); // rotating according to hand type - seconds, minutes, hours
    }
    
  }
  display(){
    push();
    this.update();
    stroke(this.handColor); 
    line(handStart, 0, this.handLength + handStart, 0);
    pop();
  }
}

