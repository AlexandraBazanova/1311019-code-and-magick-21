'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var barHeight = CLOUD_HEIGHT - 4 * FONT_GAP - 4 * GAP;
var BAR_GAP_WIDTH = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};


window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px "PT Mono"';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {

    ctx.fillText(
      times[i] = Math.round(times[i]),
      CLOUD_X + BAR_WIDTH + BAR_GAP_WIDTH * i + BAR_WIDTH * i,
      CLOUD_Y + 2 * GAP + 2 * FONT_GAP
    );

    ctx.fillStyle = `rgba(
      0,
      0,
      ${Math.floor(Math.random() * 255)},
      1
      )`
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)'
    };
    ctx.fillRect(
      CLOUD_X + BAR_WIDTH + BAR_GAP_WIDTH * i + BAR_WIDTH * i,
      CLOUD_Y + 4 * FONT_GAP + GAP + barHeight - ((barHeight * times[i]) / maxTime),
      BAR_WIDTH,
      (barHeight * times[i]) / maxTime
    );

    ctx.fillStyle = 'black'
    ctx.fillText(
      names[i],
      CLOUD_X + BAR_WIDTH + BAR_GAP_WIDTH * i + BAR_WIDTH * i,
      CLOUD_Y + CLOUD_HEIGHT - 2 * GAP
    );


  }


};
