var Time = require('./time');

var port = process.env.PORT || 3000;

Time.listen(port);
console.log("Listening on port " + port);
