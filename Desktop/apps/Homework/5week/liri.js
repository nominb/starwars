require("dotenv").config();
// var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var request = require ("request");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var randomSearch = process.argv [2];
var userSearch=process.argv[3];

//check if user types what matches what we set up in console.log
    for (i=4; i<process.argv.length; i++) {
        userSearch += "+" + process.argv [i];
    }

function Switch(){
    switch (randomSearch) {
        
        case "spotify":
        runSpotify();
        break;

        case "movie-this":
        movieName();
        break;

        case "bands-in-town":
        bandsintown();
        break;

        case "do-what-it-says":
        dowhatitsays();
        break;
    }
};

///===============spotify with inquirer
// make it so liri.js can take in one of the following commands:
// inquirer
//   .prompt([
//     // Here we create a basic text prompt.
//     {
//       type: "input",
//       message: "What would you like to do ?",
//       name: "selection"
//     },
    
// ]).then(answers => {
//     console.log(answers);
//      if(answers.selection == 'spotify') {
//         runSpotify();  
//      }
// });
// function runSpotify() {
//     inquirer
//   .prompt([
//     // Here we create a basic text prompt.
//     {
//       type: "input",
//       message: "What song would you like?",
//       name: "selection"
//     },
    
// ]).then(answers => {
    
//     spotify.search({type:"track", query: answers.selection },function(err,data){
//         if (err) {
//             return console.log("Error:" + err);
//         }
//         else {
//             for(var i = 0; i < data.tracks.items[0].artists.length; i ++) {
//                 if (i == 0) {
//                     console.log("artist: " + data.tracks.items[0].artists[i].name)
//                     console.log("Song Name: " + data.tracks.items[0].name);
//                     console.log ("preview_url: " + data.tracks.item[0].preview_url)
//                     console.log ("album: " + data.tracks.item[0].album)
//                 }
//             }
//         }
    
//     });
    

// });

// }

//==============Bands in town search===============//

// inquirer
//   .prompt([
//     // Here we create a basic text prompt.
//     {
//       type: "input",
//       message: "What would you like to do?",
//       name: "selection"
//     },
    
// ]).then(answers => {
//     console.log(answers);
//      if(answers.selection == 'concert-this') {
//         runBandsinTown();  
//      }
// });
// function runBandsinTown() {
//     inquirer
//   .prompt([
//     // Here we create a basic text prompt.
//     {
//       type: "input",
//       message: "What band would you like?",
//       name: "selection"
//     },
////===========Bands in town search

function bandsintown() {
    console.log("band name");

var concert;
if (userSearch === undefined) {
    bandsintown = "";
} else{
    bandsintown = userSearch;
};

// Then run a request to the bandsintown API with the movie specified   
var url = "https://rest.bandsintown.com/artists/" + bandsintown + "/events?app_id=codingbootcamp";
request(url, function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover 
    console.log("The artist is: " + JSON.parse(body).bandsintown);
  }
});

//////==========Spotify search

function runSpotify(){
    console.log("We're in Spotify!")

    var answers;
    if(userSearch==undefined) {
        answers = "What song do you like?";
    }else{
        answers = userSearch;
    }

    spotify.search({type:"track", query: answers.selection},function(err,data){
        if (err) {
            return console.log("Error:" + err);
        }
        else {
                    console.log("artist: " + data.tracks.items[0].artists[i].name)
                    console.log("Song Name: " + data.tracks.items[0].name);
                    console.log ("preview_url: " + data.tracks.item[0].preview_url);
                    console.log ("album: " + data.tracks.item[0].album);
                
        }
    
    });
    };

///////OMDB search

function movieName() {
    console.log("Movie Name");

var movieSearch;
if (userSearch === undefined) {
    movieSearch = "Mr.Nobody";
} else{
    movieSearch = userSearch;
};

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function(error, response, body) {


  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("* Title of the movie: " + JSON.parse(body).Title);
    console.log("* IMDB Rating of the Movie: " + JSON.parse(body).imbdRating);
    console.log("* Year the movie came out: " + JSON.parse(body).Year);
    console.log("* Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
    console.log("* Country where the movie was produced: " + JSON.parse(body).Country);
    console.log("* Language of the movie: " + JSON.parse(body).Language);
    console.log("* Plot of the movie: " + JSON.parse(body).Plot);
    console.log("* Actors in the movie: " + JSON.parse(body).Actors);

  }
});
};
////===============Do-what-it-says function
function dowhatitsays() {
    console.log("random.txt works!");
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error) {
            console.log(error);
        }
    else{
        var dataArr = data.split(",");
        randomSearch = dataArr[0];
        userSearch = dataArr[1];

        for(i=2; i<dataArr.length; i++) {
            userSearch =userSearch + "+" + dataArr [0];
        };
        //here we run our switch
        Switch();
    }; 
});
};

Switch();

};