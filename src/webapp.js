(function() {
  var $ = require('jquery');
  var _ = require('lodash');
  var utils = require('lib-bolt');
  var sum = utils.sum;
  var gradientDescent = utils.gradientDescent;
  var leastSquares = utils.leastSquares;
// var Coinbase = require('./exchanges/coinbase');

  var alpha = 1e-3,
      epsilon = 1e-5,
      max_iter = 1e5;

  var extractX = function(data, i) {
    return i;
  };

  var extractY = function(data) {
    // [ time, low, high, open, close, volume ],
    var time = data[0],
        low = data[1],
        high = data[2],
        open = data[3],
        close = data[4],
        volume = data[5];
    return close;
  };

  var printData = function(data) {
    // console.log(data.map(augment(data)));
    var X = _.map(data, extractX),
        y = _.map(data, extractY);
    // console.log(X.reduce);
    // console.log(y);
    var res = leastSquares(X, y);
    var yIntercept = res[1],
        slope = res[0];
    console.log('y = ' + slope + 'x + ' + yIntercept);
  };

  setInterval(function() {
    $.ajax({
      url: 'https://api.exchange.coinbase.com/products/BTC-USD/candles',
      //url: 'https://api.coinbase.com/v1/prices/historical',
      crossDomain: true,
      success: printData
    });
  }, 3000);

})();