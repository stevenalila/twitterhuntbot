var Twitter = require('twitter');
var config = require('./config.js');

var T = new Twitter(config);

// Set up your search parameters
var params = {
    q: '#nodejs',
    count: 10,
    result_type: 'recent',
    lang: 'en'
}

T.get('search/tweets', params, gotData);

function gotData(err, data) {
    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
    }
}