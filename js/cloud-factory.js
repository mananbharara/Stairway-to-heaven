var CloudFactory = {
  circles: [],
  howManyClouds: 10,
  generateClouds: function (howManyClouds) {
    this.howManyClouds = howManyClouds ? howManyClouds : 10;

    for (var i = 0; i < howManyClouds; ++i) {
      this.circles.push([Math.random() * width, Math.random() * height, Math.random() * 100, Math.random() / 2]);
    }
  },

  drawClouds: function (ctx) {
    for (var i = 0; i < this.howManyClouds; i++) {
      ctx.fillStyle = 'rgba(255, 255, 255, ' + this.circles[i][3] + ')';
      ctx.beginPath();
      ctx.arc(this.circles[i][0], this.circles[i][1], this.circles[i][2], 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    }
  },

  moveClouds: function (deltaY) {
    for (var i = 0; i < this.howManyClouds; i++) {
      if (this.circles[i][1] - this.circles[i][2] > height) {
        this.circles[i][0] = Math.random() * width;
        this.circles[i][2] = Math.random() * 100;
        this.circles[i][1] = 0 - this.circles[i][2];
        this.circles[i][3] = Math.random() / 2;
      } else {
        this.circles[i][1] += deltaY;
      }
    }
  },

  refreshClouds: function(ctx) {
    this.moveClouds(5);
    this.drawClouds(ctx);
  }
};