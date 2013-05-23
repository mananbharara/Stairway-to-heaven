var Player = function () {
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

};
