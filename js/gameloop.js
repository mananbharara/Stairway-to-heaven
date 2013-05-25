var width = 640, height = 800, gLoop;
var universe = document.getElementById('universe');
ctx = universe.getContext('2d');

universe.width = width;
universe.height = height;
universe.checkCollision = function (player) {
  if (player.Y >= universe.height - player.height) {
    player.fallStop();
    player.jump();
  }
};

var player = new Player();

player.setPosition(~~((width - player.width) / 2), ~~((height - player.height) / 2));
player.jump();

var platformHeight = 20;
var platformWidth = 70;
var platforms = PlatformFactory.generatePlatforms(7, platformWidth, platformHeight);

CloudFactory.generateClouds(10);

var clear = function (ctx) {
  ctx.fillStyle = '#d0e7f9';
  ctx.beginPath();
  ctx.rect(0, 0, width, height);
  ctx.closePath();
  ctx.fill();
};

var GameLoop = function () {
  clear(ctx);
  CloudFactory.refreshClouds(ctx);
  if (player.isJumping) player.checkJump();
  if (player.isFalling) {
    player.checkFall();
    universe.checkCollision(player);
  }

  platforms.forEach(function (platform) {
    platform.draw(ctx);
    platform.checkCollision(player);
  });

  player.draw(ctx);
  gLoop = setTimeout(GameLoop, 1000 / 50);
};

GameLoop();
