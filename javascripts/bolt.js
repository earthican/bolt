var _ = require("lodash");

Pebble.addEventListener("ready", function(e) {
  console.log("PebbleKit JS ready!");
  setTimeout(function() {console.log("hello, pebble!")}, 3000);

  // Notify the watchapp that it is now safe to send messages
  Pebble.sendAppMessage({ 'AppKeyReady': true });
//   Pebble.sendAppMessage({ 0: true });
});