var profile = require("./profile.js");
//profile.get("lianachin");

var users = process.argv.slice(2);
users.forEach(profile.get);