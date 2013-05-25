var player = new Player();

player.setPosition(~~((width - player.width) / 2), ~~((height - player.height) / 2));
player.jump();

var platformHeight = 70;
var platformWidth = 20;
var platforms = PlatformFactory.generatePlatforms(7, platformHeight, platformWidth);

var GameLoop = function () {
  clear();
  moveCircles(5);
  drawCircles();
  platforms.forEach(function (platform) {
    platform.draw(ctx, platformHeight, platformWidth);
  });
  if (player.isJumping) player.checkJump();
  if (player.isFalling) player.checkFall();
  player.draw();
  gLoop = setTimeout(GameLoop, 1000 / 50);
};
GameLoop();