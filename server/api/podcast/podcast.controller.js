/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /podcasts              ->  index
 */

'use strict';

var http = require('http'),
  parseString = require('xml2js').parseString;

// Get list of things
exports.index = function(req, res) {
  http.get('http://rss.cnn.com/services/podcasting/ac360/rss', function(result){
    var xml = '';
    //another chunk of data has been recieved, so append it to `str`
    result.on('data', function (chunk) {
      xml += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    result.on('end', function () {
      parseString(xml, function (err, podcast_json) {
        res.json(podcast_json);
      });
    });
  })

};
