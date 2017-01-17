var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();

// parse ajax data
app.use(bodyParser.json());

var processPage = function(url, postRes) {
    var options = {
        host: url
    };

    http.get(options, function(result) {
        console.log('HTTP status: ' + result.statusCode);
        result.pipe(postRes);
    }).on('error', function(e) {
        console.log('hmm...something went wrong', e.message);
        postRes.status(404).send('Not found');
    });
};

app.get('/', function(req,res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/fetchtags', function(req, res) {
    console.log('data received: ', req.body);

    var data = req.body;
    var url = data.url;

    processPage(url, res);
});

// serve our JS/CSS
app.use('/assets', express.static('assets'));

app.listen(3000,function(){
  console.log('listening at http://localhost:3000');
});
