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

  Platform.prototype.draw = function (ctx) {
    ctx.fillStyle = thisPlatform.firstColor;
    ctx.beginPath();
    ctx.rect(x, y, 200, 20);
    ctx.closePath();
    ctx.fill();
  };

};