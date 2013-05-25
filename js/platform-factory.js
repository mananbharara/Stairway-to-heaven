var PlatformFactory = {
  generatePlatforms : function (nrOfPlatforms, platformHeight, platformWidth) {
    platformWidth = platformWidth ? platformWidth : 70;
    platformHeight = platformHeight ? platformHeight : 20;
    var verticalPosition = 0, type, platforms = [];

    for (var i = 0; i < nrOfPlatforms; ++i) {
      type = ~~(Math.random() * 5);
      type = type != 1 ? 0 : 1;
      platforms[i] = new Platform(Math.random() * (width - platformWidth), verticalPosition, type);

      if (verticalPosition < height - platformHeight)
        verticalPosition += ~~(height / nrOfPlatforms);
    }

    return platforms;
  }
};
