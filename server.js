var Time = require('./time');

var port = process.env.PORT || 8888;

Time.listen(port);
console.log("Listening on port " + port);
