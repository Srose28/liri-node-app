var axios = require("axios");
var Spotify = require('node-spotify-api');
 
var Music = function(){
    var divider = "\n------------------------------\n\n"

    this.findSong = function(song) {
        var URL = "https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx" + song;

        axios.get(URL).then(function(response) {

        }
    }
}



console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
