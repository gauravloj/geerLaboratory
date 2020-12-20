var crypto = require('crypto');

var toHash = "1234";

var sha = crypto.createHash('sha256');

var hash = sha.update(toHash).digest("hex");

console.log(hash); 
