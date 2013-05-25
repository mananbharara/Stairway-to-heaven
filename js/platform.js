var Platform = function (x, y, type) {
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
      player.jumpSpeed = 50;
      player.jump();
    }

  }

  thisPlatform.x = ~~x;
  thisPlatform.y = ~~y;
  thisPlatform.type = type;

  thisPlatform.draw = function (ctx, platformWidth, platformHeight) {
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';

    var gradient = ctx.createRadialGradient(thisPlatform.x + (platformWidth/2), thisPlatform.y + (platformHeight/2), 5,
      thisPlatform.x + (platformWidth/2), thisPlatform.y + (platformHeight/2), 45);
    gradient.addColorStop(0, thisPlatform.firstColor);
    gradient.addColorStop(1, thisPlatform.secondColor);

    ctx.fillStyle = gradient;
    ctx.fillRect(thisPlatform.x, thisPlatform.y, platformWidth, platformHeight);
  };

};