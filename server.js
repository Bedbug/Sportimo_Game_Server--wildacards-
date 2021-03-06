// v 0.0.1

/*

 Cards_Server Modular

 Info:
 This servers has the following modules:
 
    Wildcards - This module's purpose is to register playing cards from the clients
    of the Sporimo app and handle timers and scoring.
 
    Notifications - This module's purpose is to register user actions and push notifications
    from the sportimo dashboard. 

    LiveMatches - This module's purpose is to handle active matches.

    Calendar - This module's purpose is to handle matches calendar.


 Copyright (c) Bedbug 2015
 Author: Aris Brink

 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

var express = require("express");
var http = require('http');
var bodyParser = require('body-parser');
var app = express();


// Create Server
var server = http.createServer(app);
server.listen(process.env.PORT || 3031);
// log("Server is lestening on "+)

app.get( "/crossdomain.xml", onCrossDomainHandler );
function onCrossDomainHandler( req, res ) {
    var xml = '<?xml version="1.0"?>\n<!DOCTYPE cross-domain-policy SYSTEM' +
        ' "http://www.macromedia.com/xml/dtds/cross-domain-policy.dtd">\n<cross-domain-policy>\n';
    xml += '<allow-access-from domain="*" to-ports="*"/>\n';
    xml += '</cross-domain-policy>\n';

    req.setEncoding('utf8');
    res.writeHead( 200, {'Content-Type': 'text/xml'} );
    res.end( xml );
}

var redisCreds = {url:'pub-redis-11162.us-east-1-3.6.ec2.redislabs.com',port:11162 , secret: 'a21th21',channel:"socketServers"};


var RedisIP = 'pub-redis-11162.us-east-1-3.6.ec2.redislabs.com';
var RedisPort = 11162;
var RedisAuth = 'a21th21';


var mongoConnection = 'mongodb://bedbug:a21th21@ds043523-a0.mongolab.com:43523,ds043523-a1.mongolab.com:43523/sportimo?replicaSet=rs-ds043523';

 var Wildcards = require('./sportimo_modules/wildcards');
 Wildcards.setRedisPubSub(redisCreds.url, redisCreds.port, redisCreds.secret);
 Wildcards.setServerForRoutes(app);

var Notifications = require('./sportimo_modules/notifications');
Notifications.SetupServer(app);
Notifications.setMongoConnection (mongoConnection);



function log(info) {
    console.log("[" + Date.now() + "] API CALL: " + info);
}


app.get('/', function (req, res, next) {
    res.send(200, "The Cards Server is running smoothly.");
});