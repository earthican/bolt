(function() {
  var $ = require('jquery');
  var _ = require('lodash');
  var Chartist = require('chartist');
  var utils = require('lib-bolt');
  var sum = utils.sum;
  var gradientDescent = utils.gradientDescent;
  var leastSquares = utils.leastSquares;
// var Coinbase = require('./exchanges/coinbase');

  // var alpha = 1e-3,
  //     epsilon = 1e-5,
  //     max_iter = 1e5;

  /** Chartist **/
  var welcomeText = document.createTextNode('Chartist version ' + Chartist.version);

  var container = document.createElement('div');
  container.className = 'ct-chart';
  container.attributes.style = 'font-family: Arial';

  var styleSheet = document.createElement('link');
  styleSheet.rel = 'stylesheet';
  styleSheet.href = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/85781/chartist-0.1.10.min.css';

  document.head.appendChild(styleSheet);
  document.body.appendChild(container);

  var extractX = function(data, i) {
    return i;
  };

  var extractXSeries = function(data, i) {
    return [i];
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

  var extractTime = function(data) {
    // [ time, low, high, open, close, volume ],
    var time = data[0],
        low = data[1],
        high = data[2],
        open = data[3],
        close = data[4],
        volume = data[5];
    return time;
  };

  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

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

  var plotLineChart = function(data) {
    var X = _.map(data, extractXSeries),
        y = _.map(data, extractY),
        labels = _.map(_.map(data, extractTime), timeConverter);

    var chartData = {
      labels: labels,
      series: [y]
    };

    var options = {
      width: "100%",
      height: 320
    };

    Chartist.Line(container, chartData, options);
  }

  var requestAndUpdate = function() {
    $.ajax({
      url: 'https://api.exchange.coinbase.com/products/BTC-USD/candles',
      //url: 'https://api.coinbase.com/v1/prices/historical',
      crossDomain: true,
      success: plotLineChart
    });
  }

  requestAndUpdate()
  setInterval(requestAndUpdate, 60000); // every minute


})();