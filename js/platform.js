var Platform = function (x, y, platformWidth, platformHeight, type) {
  var thisPlatform = this;

  thisPlatform.firstColor = '#FF8C00';
  thisPlatform.secondColor = '#EEEE00';

  thisPlatform.onCollide = function (player) {
    player.fallStop();
    player.jump();
  };


  if (type === 1) {
    thisPlatform.firstColor = '#AADD00';
    thisPlatform.secondColor = '#698B22';

    thisPlatform.onCollide = function (player) {
      player.fallStop();
      player.jump();
      player.jumpSpeed = 25;
    }

  }

  thisPlatform.x = ~~x;
  thisPlatform.y = ~~y;
  thisPlatform.width = platformWidth;
  thisPlatform.height = platformHeight;
  thisPlatform.type = type;

  thisPlatform.draw = function (ctx) {
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';

    var gradient = ctx.createRadialGradient(thisPlatform.x + (thisPlatform.width / 2), thisPlatform.y + (thisPlatform.height / 2), 5,
      thisPlatform.x + (thisPlatform.width / 2), thisPlatform.y + (thisPlatform.height / 2), 45);
    gradient.addColorStop(0, thisPlatform.firstColor);
    gradient.addColorStop(1, thisPlatform.secondColor);

    ctx.fillStyle = gradient;
    ctx.fillRect(thisPlatform.x, thisPlatform.y, thisPlatform.width, thisPlatform.height);
  };

  thisPlatform.checkCollision = function (player) {
    if (
      (player.isFalling) && (player.X < thisPlatform.x + thisPlatform.width) && (player.X + player.width > thisPlatform.x)
        && (player.Y + player.height > thisPlatform.y) && (player.Y + player.height < thisPlatform.y + thisPlatform.height)
      ) {
      thisPlatform.onCollide(player);
    }
  }

};