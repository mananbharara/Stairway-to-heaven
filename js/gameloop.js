var player = new Player();

player.setPosition(~~((width - player.width) / 2), ~~((height - player.height) / 2));
player.jump();

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