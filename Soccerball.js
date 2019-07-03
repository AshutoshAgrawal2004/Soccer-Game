class SoccerBall {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.xvel = 5;
    this.yvel = 5;
    this.maxx = 15;
    this.maxy = 15;
    this.r = 30;
    this.ang = 0;
    this.lasthitters = [];
  }
  show() {
    // texture(footballimg);
    // fill(255);
    push();
    translate(this.x, this.y);
    rotate(this.ang);
    noStroke();
    imageMode(CENTER);
    image(footballimg, 0, 0, this.r, this.r);
    this.ang += this.xvel - this.yvel;
    pop();
    // ellipse(this.x, this.y, this.r, this.r);
  }
  move() {
    this.x += this.xvel;
    this.y += this.yvel;
    // this.x *= random(0.98, 1.02);
    // this.y *= random(0.98, 1.02);
    this.x = constrain(this.x, -10, width + 10);
    this.y = constrain(this.y, -10, height + 10);
  }
  checkCollision() {
    if(this.y < 0) {
      if(this.x > (width / 2 - topgoal.width / 2) && this.x < (width / 2 + topgoal.width / 2)) {
        me.score++;
        this.reset();
        this.goaled();
      } else {
        this.yvel *= -0.95;
        hitwallsound.play();
      }
    } else if(this.y + this.r / 2 > height) {
      if(this.x > (width / 2 - bottomgoal.width / 2) && this.x < (width / 2 + bottomgoal.width / 2)) {
        ai.score++;
        this.reset();
        this.goaled();
      } else {
        this.yvel *= -0.95;
        hitwallsound.play();
      }
    } else if(this.x < 0) {
      this.xvel *= -1.05;
      hitwallsound.play();
    } else if(this.x + this.r / 2 > width) {
      this.xvel *= -1.05;
      hitwallsound.play();
    }
    //fix the bug ball stuck at the top
    // if(this.xvel >= -2 && this.xvel <= 2) {
    //   this.xvel++;
    // }
  }
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    var dire = floor(random(1, 5));
    switch (dire) {
      case 1:
        this.xvel = 5;
        this.yvel = 5;
        break;
      case 2:
        this.xvel = -5;
        this.yvel = 5;
        break;
      case 3:
        this.xvel = 5;
        this.yvel = -5;
        break;
      case 4:
        this.xvel = -5;
        this.yvel = -5;
        break;
      default:
        this.xvel = 5;
        this.yvel = 5;
    }
  }
  goaled() {
    noLoop();
    textFont(scorefont);
    textSize(120);
    fill(255, 255, 0);
    noStroke();
    textAlign(CENTER, BASELINE);
    text('GOAL!', width / 2, height / 2);
    cheers.play();
    setTimeout(loop, 3000);
  }
  debugme() {
    if((this.x < 0 && this.y < 0) || (this.x < 0 && this.y + this.r > height) || (this.x > width && this.y + this.r > height) || (this.x > width && this.y < 0)) {
      this.reset();
    }
  }
  fixme() {
    var counts = {};
    this.lasthitters.forEach(function(x) {
      counts[x] = (counts[x] || 0) + 1;
    });
    if(counts.me == errorLimit || counts.ai == errorLimit) {
      this.reset();
      this.lasthitters.splice(0, errorLimit);
    }
  }
}