'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var BAR_GAP_WIDTH = 50;
var barHeight = CLOUD_HEIGHT - 4 * FONT_GAP - 4 * GAP;
var colours = {
  windowBody: 'white',
  windowShadow: 'rgba(0, 0, 0, 0.7)',
  textColour: 'black',
  barColour: function () {
    return Math.floor(Math.random() * 255)
  },
  youColour: 'rgba(255, 0, 0, 1)'
}

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};
var renderWindow = function (ctx) {
  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, colours.windowShadow);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, colours.windowBody);
};

var renderText = function (ctx) {
  ctx.fillStyle = colours.textColour;

  ctx.fillText('Ура вы победили!', CLOUD_X + BAR_WIDTH, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + BAR_WIDTH, CLOUD_Y + GAP + FONT_GAP);
};

var renderTimes = function (ctx, i, time) {
  ctx.fillText(
    time = Math.round(time),
    CLOUD_X + BAR_WIDTH + BAR_GAP_WIDTH * i + BAR_WIDTH * i,
    CLOUD_Y + 2 * GAP + 2 * FONT_GAP
  );
};

var renderBar = function (ctx, i, time, name, maxTime) {
  ctx.fillStyle = `rgba(
    0,
    0,
    ${colours.barColour()},
    1
    )`
  if (name === 'Вы') {
    ctx.fillStyle = colours.youColour
  };
  ctx.fillRect(
    CLOUD_X + BAR_WIDTH + BAR_GAP_WIDTH * i + BAR_WIDTH * i,
    CLOUD_Y + 4 * FONT_GAP + GAP + barHeight - ((barHeight * time) / maxTime),
    BAR_WIDTH,
    (barHeight * time) / maxTime
  );
}
var renderName = function (ctx, i, name) {
  ctx.fillStyle = colours.textColour;
  ctx.fillText(
    name,
    CLOUD_X + BAR_WIDTH + BAR_GAP_WIDTH * i + BAR_WIDTH * i,
    CLOUD_Y + CLOUD_HEIGHT - 2 * GAP
  );
}
window.renderStatistics = function (ctx, names, times) {
  ctx.textBaseline = 'hanging';
  ctx.font = '16px "PT Mono"';

  renderWindow(ctx);

  renderText(ctx);

  for (var i = 0; i < names.length; i++) {

    renderTimes(ctx, i, times[i]);

    renderBar(ctx, i, times[i], names[i], getMaxElement(times));

    renderName(ctx, i, names[i]);
  }
};
