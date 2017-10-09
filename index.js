var express = require('express');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var Twitter = require('twitter');
var config = require('./config.js');
var app = express();

app.engine('handlebars', handlebars({defaultLayout: 'main'}), handlebars({helpers: {
    toJSON : function(object) {
        return JSON.stringify(object);
    }
}}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:true }));

// parse application/json
app.use(bodyParser.json());

//use our config file
var T = new Twitter(config);

//store our tweets
var tweetStore = [];

// Set up your search parameters
var params = {
    q: 'javascript mean developer',
    count: 50,
    lang: 'en'
};

function gotData(err, data, next) {
    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++) {
        tweetStore.push(tweets[i].text);
        console.log(tweetStore);
    }
}

T.get('search/tweets', params, gotData);

app.get('/', function(req, res){


    res.render('home', { tweetStore });

});



var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('All systems go on', host, port);
});