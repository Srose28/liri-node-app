require("dotenv").config();

var keys = require("./keys.js");
var spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var moment = require("moment");
moment().format();

var fs = require("fs");

var axios = require("axios");


var command = process.argv[2];
var value = process.argv[3]; 


switch (command) {
    case "concert-this":
        concertThis(value);
        break;
    case "spotify-this-song":
        spotifyThis(value);
        break;
    case "movie-this":
        movieThis(value);
        break;
    case "do-what-it-says":
        saysThis();
        break;
};


function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp").then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var datetime = response.data[i].datetime;
                var dateArr = datetime.split('T');

                var concertResults =
                    "---------------------------------------" +
                    "\nVenue Name: " + response.data[i].venue.name +
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of Event: " + moment(dateArr[0]).format("MM-DD-YYYY");
                console.log(concertResults);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};


function spotifyThis() {
    if (value === undefined) {
        value = "The Sign";
    }
    spotify.search({ type: "track", query: value })
        .then(function (response) {
            for (i = 0; i < 5; i++) {
                var spotifyResults =
                "---------------------------" +
                "\nArtist(s): " + response.tracks.items[i].artists[0].name +
                "\nSong name: " + response.tracks.items[i].name +
                "\nAlbum: " + response.tracks.items[i].album.name +
                "\nPreview from Spotify: " + response.tracks.items[i].preview_url;

            console.log(spotifyResults);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
};


function movieThis(value) {
    if (value === undefined) {
        value = "mr nobody";
        console.log("\nIf you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    }
    axios.get("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("Movie Title: " + response.data.Title);
            console.log("Year of release: " + response.data.Year);
            console.log("IMDB rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
            console.log("Country produced in: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    )
};

function saysThis() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        spotifyThis(dataArr[0], dataArr[1]);
    });
}