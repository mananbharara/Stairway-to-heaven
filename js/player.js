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
  thisPlayer.isMovingLeft = false;
  thisPlayer.isMovingRight = false;
  thisPlayer.jumpSpeed = 0;
  thisPlayer.fallSpeed = 0;
  thisPlayer.horizontalSpeed = 7;


  thisPlayer.setPosition = function (x, y) {
    thisPlayer.X = x;
    thisPlayer.Y = y;
  };

  function setNewPosition() {
    if (thisPlayer.isMovingLeft && thisPlayer.X > 0) thisPlayer.X -= thisPlayer.horizontalSpeed;
    if (thisPlayer.isMovingRight && ((thisPlayer.X + thisPlayer.width) < width)) thisPlayer.X += thisPlayer.horizontalSpeed;
  }

  thisPlayer.draw = function (ctx) {

    setNewPosition();

    try {
      ctx.drawImage(thisPlayer.image, 0, thisPlayer.height * thisPlayer.actualFrame, thisPlayer.width, thisPlayer.height,
        thisPlayer.X, thisPlayer.Y, thisPlayer.width, thisPlayer.height);
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

  thisPlayer.jumpStop = function () {
    thisPlayer.isJumping = false;
    thisPlayer.isFalling = true;
    thisPlayer.fallSpeed = 1;
  };

  thisPlayer.checkJump = function () {
    thisPlayer.setPosition(thisPlayer.X, thisPlayer.Y - thisPlayer.jumpSpeed);
    thisPlayer.jumpSpeed--;
    if (thisPlayer.jumpSpeed == 0) {
      thisPlayer.jumpStop();
    }

  };

  thisPlayer.checkFall = function () {
    thisPlayer.setPosition(thisPlayer.X, thisPlayer.Y + thisPlayer.fallSpeed);
    thisPlayer.fallSpeed++;
  };

  thisPlayer.fallStop = function () {
    thisPlayer.isFalling = thisPlayer.isJumping = false;
    thisPlayer.fallSpeed = 0;
  };

  thisPlayer.moveLeft = function () {
    thisPlayer.isMovingRight = false;
    thisPlayer.isMovingLeft = true;
  };

  thisPlayer.moveRight = function () {
    thisPlayer.isMovingLeft = false;
    thisPlayer.isMovingRight = true;
  };

  thisPlayer.stoop = function () {
    if (thisPlayer.isJumping) thisPlayer.jumpStop();
  };


  document.onkeydown = function (e) {
    if (e.which == '37')
      player.moveLeft();
    if (e.which == '38')
      player.fallStop();
    if (e.which == '39')
      player.moveRight();
    if (e.which == '40') {
      player.stoop();
    }
  };

  document.onkeyup = function (e) {
//    if (e.which == '40') player.jump();
    if (e.which == '38') player.jump();
    if (e.which == '37') player.isMovingLeft = false;
    if (e.which == '39') player.isMovingRight = false;
  };


};

