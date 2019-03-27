/**
 * This is an example of the Implicit Grant oAuth2 flow to authenticate against the Spotify Accounts.
 * https://developer.spotify.com/web-api/authorization-guide/#implicit_grant_flow
 * 
 */

var express = require('express'); // Express web server framework
var app = express();
app.use(express.static(__dirname + '/client')); 
console.log('Listening on 8888');
app.listen(8888);