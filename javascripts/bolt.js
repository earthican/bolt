var Bolt = require('/Users/justincano/Projects/pebble/lib-bolt');

Pebble.addEventListener("ready", function(e) {
  console.log("PebbleKit JS ready!");
  // Pebble.showSimpleNotificationOnPebble(title, text);

  var req = new XMLHttpRequest();
  req.open('GET', 'https://api.coinbase.com/v2/exchange-rates', true);
  req.onload = function(e) {
    if (req.readyState == 4 && req.status == 200) {
      if(req.status == 200) {
        var response = JSON.parse(req.responseText);
        console.log(response);
        // Pebble.sendAppMessage({ 'icon':icon, 'temperature':temperature + '\u00B0C'});
      } else { console.log('Error'); }
    }
  }
  req.send(null);

  // Notify the watchapp that it is now safe to send messages
  Pebble.sendAppMessage({ 'AppKeyReady': true });
//   Pebble.sendAppMessage({ 0: true });
});