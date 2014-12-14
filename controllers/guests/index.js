"use strict";

var passport = require("passport");

module.exports = function (router) {

    router.get("/",
        passport.authenticate("basic"),
        function (req, res) {
            res.cookie("XSRF-TOKEN", res.locals._csrf);

            res.render("guests", {
                title: "Guests"
            });
        }
    );
};
