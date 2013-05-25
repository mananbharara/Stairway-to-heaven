var player = new Player();

player.setPosition(~~((width - player.width) / 2), ~~((height - player.height) / 2));
player.jump();

var platformHeight = 20;
var platformWidth = 70;
var platforms = PlatformFactory.generatePlatforms(7, platformWidth, platformHeight);

var GameLoop = function () {
  clear();
  moveCircles(5);
  drawCircles();
  platforms.forEach(function (platform) {
    platform.draw(ctx);
  });
  if (player.isJumping) player.checkJump();
  if (player.isFalling) player.checkFall();
  player.draw();
  gLoop = setTimeout(GameLoop, 1000 / 50);
};
GameLoop();