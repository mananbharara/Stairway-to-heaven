var PlatformFactory = {
  generatePlatforms : function (nrOfPlatforms, platformWidth, platformHeight) {
    platformWidth = platformWidth ? platformWidth : 70;
    platformHeight = platformHeight ? platformHeight : 20;
    var verticalPosition = 95, type, platforms = [], availableHeight = height - 95;

    for (var i = 0; i < nrOfPlatforms; ++i) {
      type = ~~(Math.random() * 5);
      type = type != 1 ? 0 : 1;
      platforms[i] = new Platform(Math.random() * (width - platformWidth), verticalPosition, platformWidth, platformHeight, type);

      if (verticalPosition < availableHeight - platformHeight)
        verticalPosition += ~~(availableHeight / nrOfPlatforms);
    }

    return platforms;
  }
};
