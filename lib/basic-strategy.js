var BasicStrategy = require("passport-http").BasicStrategy;

var adminUser = process.env.USER_ID || "admin",
    adminPass = process.env.PASSWORD || "password";

module.exports = new BasicStrategy(
    function(userId, password, done) {
        if(userId === adminUser && password === adminPass) {
            return done(null, userId);
        } else {
            return done(null, false);
        }
    }
);
