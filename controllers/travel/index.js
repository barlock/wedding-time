"use strict";

module.exports = function (router) {
    router.get("/", function (req, res) {
        res.render("travel", {
            title: "Travel | Liz and Michael Wedding"
        });
    });
};
