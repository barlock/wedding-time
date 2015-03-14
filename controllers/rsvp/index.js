"use strict";

module.exports = function (router) {
    router.get("/", function (req, res) {
        res.cookie("XSRF-TOKEN", res.locals._csrf);

        res.render("rsvp", {
            title: "RSVP"
        });
    });
};
