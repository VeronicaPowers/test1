var express = require('express');
var app = express();

app.get('/', function(req, res) {
    return res.send('Hello World');
});

var server = app.listen(3000, function() {
    var port = server.address().port;

    console.log("Express listening on port " + port);
});