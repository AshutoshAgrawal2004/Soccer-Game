class Players {
  constructor(x, y, name, fillcol) {
    this.x = x;
    this.y = y;
    this.r = 50;
    this.score = 0;
    this.name = name;
    this.fillcol = fillcol;
    this.kicked = false;
  }
  show() {
    fill(this.fillcol[0], this.fillcol[1], this.fillcol[2]);
    noStroke();
    ellipse(this.x, this.y, this.r, this.r);
  }
  move() {
    if(hardness == 3) {
      this.x = width - mouseX;
      this.y = map(mouseY, height / 2, height, height, height / 2);
    } else {
      this.x = mouseX;
      this.y = mouseY;
    }
    this.x = constrain(this.x, this.r / 2, width - this.r / 2);
    this.y = constrain(this.y, height / 2 + this.r / 2, height - this.r / 2);
  }
  aimove(follow) {
    // if(follow.x > width / 2) {
    //   this.y = follow.y;
    // }
    if(follow.yvel < 0 && follow.y + follow.r / 2 < height / 2) {
      if(this.x < follow.x - buffer) {
        if(this.x + this.r < height) {
          this.x += aispeed;
        }
      } else if(this.x > follow.x + buffer) {
        if(this.x + this.r > 0) {
          this.x -= aispeed;
        }
      }
      if(this.y < follow.y - buffer) {
        if(this.y + this.r < width) {
          this.y += aispeed;
        }
      } else if(this.y > follow.y + buffer) {
        if(this.y + this.r > 0) {
          this.y -= aispeed;
        }
      }
    } else {
      if(this.x > width / 2 + buffer) {
        this.x -= aispeed;
      } else if(this.x < width / 2 - buffer) {
        this.x += aispeed;
      }
      if(this.y > height / 4 + buffer) {
        this.y -= aispeed;
      } else if(this.x < height / 4 - buffer) {
        this.y += aispeed;
      }
    }
    this.x = constrain(this.x, this.r, width - this.r);
  }
  hitTheBall(whichball) {
    var distbw = dist(this.x, this.y, whichball.x, whichball.y);
    if(distbw <= (this.r + whichball.r) / 2 && this.kicked == false) {
      whichball.lasthitters.push(this.name);
      if(whichball.lasthitters.length > errorLimit) {
        whichball.lasthitters.splice(0, errorLimit);
      }
      whichball.yvel *= random(-0.85, -1.2);
      // whichball.y += whichball.yvel;
      // whichball.yvel *= random(0.8, 1.2);
      // var deltaY = (whichball.y - (this.x + this.r)).toFixed(2);
      // whichball.yvel = deltaY * -0.05;
      var deltaX = (whichball.x - (this.x + this.r)).toFixed(2);
      whichball.xvel = deltaX * 0.1;
      whichball.xvel = constrain(whichball.xvel, -whichball.maxx, whichball.maxx);
      whichball.yvel = constrain(whichball.yvel, -whichball.maxy, whichball.maxy);
      //fix the precision
      whichball.xvel = Number(whichball.xvel.toFixed(2));
      whichball.yvel = Number(whichball.yvel.toFixed(2));
      kicksound.play();
      this.kicked = true;
    } else {
      this.kicked = false;
    }
  }
}