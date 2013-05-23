var width = 320, height = 500, gLoop;
var c = document.getElementById('c');
ctx = c.getContext('2d');

c.width = width;
c.height = height;

var clear = function () {
  ctx.fillStyle = '#d0e7f9';
  ctx.beginPath();
  ctx.rect(0, 0, width, height);
  ctx.closePath();
  ctx.fill();

};

var howManyCircles = 10, circles = [];

for (var i = 0; i < howManyCircles; ++i) {
  circles.push([Math.random() * width, Math.random() * height, Math.random() * 100, Math.random() / 2]);
}

var drawCircles = function () {
  for (var i = 0; i < howManyCircles; i++) {
    ctx.fillStyle = 'rgba(255, 255, 255, ' + circles[i][3] + ')';
    ctx.beginPath();
    ctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
};

var moveCircles = function (deltaY) {
  for (var i = 0; i < howManyCircles; i++) {
    if (circles[i][1] - circles[i][2] > height) {
      circles[i][0] = Math.random() * width;
      circles[i][2] = Math.random() * 100;
      circles[i][1] = 0 - circles[i][2];
      circles[i][3] = Math.random() / 2;
    } else {
      circles[i][1] += deltaY;
    }
  }
};


var player = new (function () {
  var thisPlayer = this;

  thisPlayer.image = new Image();
  thisPlayer.image.src = "img/image.png";
  thisPlayer.width = 65;
  thisPlayer.height = 95;

  thisPlayer.X = 0;
  thisPlayer.Y = 0;

  thisPlayer.frames = 1;
  thisPlayer.actualFrame = 0;
  thisPlayer.interval = 0;

  thisPlayer.isJumping = false;
  thisPlayer.isFalling = false;
  thisPlayer.jumpSpeed = 0;
  thisPlayer.fallSpeed = 0;


  thisPlayer.setPosition = function (x, y) {
    thisPlayer.X = x;
    thisPlayer.Y = y;
  };

  thisPlayer.draw = function () {

    try {
      ctx.drawImage(thisPlayer.image, 0, thisPlayer.height * thisPlayer.actualFrame, thisPlayer.width, thisPlayer.height, thisPlayer.X, thisPlayer.Y, thisPlayer.width, thisPlayer.height);
    } catch (e) {
    }
    if (thisPlayer.interval == 4) {
      if (thisPlayer.actualFrame == thisPlayer.frames) {
        thisPlayer.actualFrame = 0;
      } else {
        thisPlayer.actualFrame++;
      }
      thisPlayer.interval = 0;
    }
    thisPlayer.interval++;
  };

  thisPlayer.jump = function () {
    if (!thisPlayer.isJumping && !thisPlayer.isFalling) {
      thisPlayer.fallSpeed = 0;
      thisPlayer.isJumping = true;
      thisPlayer.jumpSpeed = 17;
    }
  };

  thisPlayer.checkJump = function () {
    thisPlayer.setPosition(thisPlayer.X, thisPlayer.Y - thisPlayer.jumpSpeed);
//move object by number of pixels equal to current value of 'jumpSpeed'
    thisPlayer.jumpSpeed--;
    if (thisPlayer.jumpSpeed == 0) {
      thisPlayer.isJumping = false;
      thisPlayer.isFalling = true;
      thisPlayer.fallSpeed = 1;
    }

  };

  thisPlayer.checkFall = function () {
    if (thisPlayer.Y < height - thisPlayer.height) {
      thisPlayer.setPosition(thisPlayer.X, thisPlayer.Y + thisPlayer.fallSpeed);
      thisPlayer.fallSpeed++;
    } else {
      thisPlayer.fallStop();
    }
  };

  thisPlayer.fallStop = function () {
    thisPlayer.isFalling = false;
    thisPlayer.fallSpeed = 0;
    thisPlayer.jump();
  };

  thisPlayer.moveLeft = function () {
    if (thisPlayer.X > 0) {
      thisPlayer.setPosition(thisPlayer.X - 10, thisPlayer.Y);
    }
  };

  thisPlayer.moveRight = function () {
    if (thisPlayer.X + thisPlayer.width < width) {
      thisPlayer.setPosition(thisPlayer.X + 10, thisPlayer.Y);
    }
  };

  thisPlayer.stoop = function () {
    thisPlayer.setPosition(thisPlayer.X, height - thisPlayer.height);
  };

})();

player.setPosition(~~((width - player.width) / 2), ~~((height - player.height) / 2));
player.jump();

document.onkeydown = function (e) {
  if (e.which == '37')
    player.moveLeft();
  if (e.which == '39')
    player.moveRight();
  if (e.which == '40')
    player.stoop();
};

var GameLoop = function () {
  clear();
  moveCircles(5);
  drawCircles();
  if (player.isJumping) player.checkJump();
  if (player.isFalling) player.checkFall();
  player.draw();
  gLoop = setTimeout(GameLoop, 1000 / 50);
};
GameLoop();