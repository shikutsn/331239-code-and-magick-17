'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 20;
var FONT_GAP = 15;
var FONT_COLOR = '#000000';
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_ORDINATE = CLOUD_Y + GAP * 2 + FONT_GAP * 3 + BAR_HEIGHT;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement;

  if (arr.length) {
    maxElement = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
  }

  return maxElement;
};

var getBarColor = function (playerName) {
  return (playerName === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + Math.floor(100 * Math.random()) + '%, 50%)';
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.font = '16px PT Mono';
  ctx.baseLine = 'hanging';
  ctx.fillStyle = FONT_COLOR;
  ctx.fillText('Ура, вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var currentPlayerName = names[i];
    var currentPlayerTime = times[i];
    var barActualHeight = Math.round(BAR_HEIGHT * (currentPlayerTime / maxTime));
    var currentBarX = CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i;

    ctx.fillStyle = getBarColor(currentPlayerName);
    ctx.fillRect(currentBarX, BAR_ORDINATE - barActualHeight, BAR_WIDTH, barActualHeight);

    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(currentPlayerName, currentBarX, BAR_ORDINATE + FONT_GAP);
    ctx.fillText(Math.round(currentPlayerTime), currentBarX, BAR_ORDINATE - barActualHeight - FONT_GAP);
  }
};
