//Problem: we need a simple way to look at a user's badge count and JS points
//solution: use node.js to connect to Treehouse's API to get profil info to print out

var https = require("https");
//Print out message
function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
  console.log(message);
}

//Print out error messages
function printError(error){
  console.error(error.message);
}

function get(username){
  //Connect to API url (http://teamtreehouse.com/username.json)
  var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response){
    var body = "";
    //Read the data
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function(){
      if(response.statusCode === 200) {
        try {
        //Parse the data -- read data from string into program friendly format
          var profile = JSON.parse(body);
        //Print the data
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch(error) {
          //Parse Error
          printError(error);
        }
      } else {
        //Status Code Error
        printError({message: "There was an error getting the profile for " + username + ". (" + https.STATUS_CODES[response.statusCode] + ")"});
      }
    });
  });
  //Connection Error
  request.on("error", printError);
}

module.exports.get = get;


