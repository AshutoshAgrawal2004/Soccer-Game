var hardness = Number(prompt("Select Difficulty \n1 for Easy\n2 for medium\n3 for Super Hard Fun", "1"));
// var hardness = 1;
var video;
var ball;
var me;
var ai;
var backimg;
if(hardness == 2) {
  var aispeed = 12;
  var buffer = 10;
} else {
  var aispeed = 4;
  var buffer = 15;
}
var topgoal;
var bottomgoal;
var kicksound;
var cheers;
var hitwallsound;
var footballimg;
var goaldist = 100;
var errorLimit = 10;
var time = {
  m: 2,
  s: 59
}
var winner;
var winnerdeclared = false;

function preload() {
  // https://cors-anywhere.herokuapp.com/
  scorefont = loadFont('https://dl.dropbox.com/s/6skho5htqsdvcfn/scoreboard.ttf?raw=1');
  kicksound = loadSound("https://dl.dropbox.com/s/3etf4lhvu0rosdw/FOOTBALLKICK.mp3?raw=1");
  cheers = loadSound("https://dl.dropbox.com/s/cntfvu6mtjzcptp/cheer2.mp3?raw=1");
  hitwallsound = loadSound("https://dl.dropbox.com/s/hhb1340y06tb2eu/BOUNCE%2B1.mp3?raw=1");
  footballimg = loadImage('https://i.imgur.com/95gDttF.png');
  // scorefont = loadFont('scoreboard.ttf');
  // kicksound = loadSound('FOOTBALLKICK.mp3');
  // cheers = loadSound("cheer2.mp3");
  // hitwallsound = loadSound('BOUNCE+1.mp3');
  // footballimg = loadImage('Football.png');
}

function setup() {
  createCanvas(340, 620);
  ball = new SoccerBall();
  me = new Players(width / 2, (height / 4) * 3, 'me', [102, 255, 255]);
  ai = new Players(width / 2, height / 4, 'ai', [255, 255, 51]);
  // rectMode(CENTER);
  frameRate(50);
  // background(0, 255, 0);
  setInterval(countDown, 1000);
}

function draw() {
  // background(0, 255, 0);
  var j = 0;
  for(var i = 0; i < height; i += height / 12) {
    if(j % 2 == 0) {
      fill(76, 187, 23);
    } else {
      fill(57, 255, 20);
    }
    noStroke();
    rectMode(CORNER);
    rect(0, i, width, height / 12);
    j++;
  }
  drawbg();
  ball.show();
  ball.move();
  ball.checkCollision();
  me.show();
  me.move();
  me.hitTheBall(ball);
  ai.show();
  ai.hitTheBall(ball);
  ai.aimove(ball);
  showScores();
  showTime();
  ball.debugme();
  ball.fixme();
  if(winnerdeclared == true) {
    showWinner();
    noLoop();
  }
}

function mouseClicked() {
  if(winnerdeclared == true) {
    winnerdeclared = false;
    ball.reset();
    time = {
      s: 59,
      m: 2
    }
    loop();
  }
}

function drawbg() {
  rectMode(CENTER);
  noFill();
  // noStroke();
  stroke(255);
  strokeWeight(5);
  //middleline and circle
  line(0, height / 2, width, height / 2);
  ellipse(width / 2, height / 2, 100, 100);
  //left player goal
  topgoal = {
    x: width / 2,
    y: 0,
    width: goaldist,
    height: goaldist
  }
  arc(topgoal.x, topgoal.y + topgoal.height / 2, 60, 60, 0, PI);
  rect(topgoal.x, topgoal.y, topgoal.width, topgoal.height);
  //right player goal
  bottomgoal = {
    x: width / 2,
    y: height,
    width: goaldist,
    height: goaldist
  }
  arc(bottomgoal.x, bottomgoal.y - bottomgoal.height / 2, 60, 60, PI, 0);
  rect(bottomgoal.x, bottomgoal.y, bottomgoal.width, bottomgoal.height);
}

function showScores() {
  fill(0);
  textFont(scorefont);
  textSize(50);
  var score = me.score + " : " + ai.score;
  textAlign(CENTER, BASELINE);
  text(score, width / 2, height / 2);
}

function showWinner() {
  if(me.score > ai.score) {
    winner = "You Won!";
  } else if(ai.score > me.score) {
    winner = "AI Won!";
  } else {
    winner = "DRAW!"
  }
  if(hardness == 1) {
    fill(0, 255, 0);
  } else if(hardness == 2) {
    fill(255, 255, 0);
  } else if(hardness == 3) {
    fill(255, 0, 0);
  }
  textFont(scorefont);
  textSize(80);
  stroke(0);
  // noStroke();
  textAlign(CENTER, BASELINE);
  text(winner, width / 2, height / 2 - 100);
}

function showTime() {
  fill(255);
  textFont(scorefont);
  textSize(25);
  noStroke();
  // var score = ai.score + " : " + me.score;
  var currentTime = time.m + " : " + time.s;
  textAlign(CENTER, BASELINE);
  text(currentTime, width / 2, height / 2 + 30);
}

function countDown() {
  if(winnerdeclared != true) {
    if(time.s > 0) {
      time.s--;
    } else if(time.m > 0) {
      time.m--;
      time.s = 59;
    } else {
      winnerdeclared = true;
    }
  }
}
