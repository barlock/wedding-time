"use strict";

var Guest = require('../../../../models/guest'),
    passport = require("passport"),
    _ = require("underscore");

module.exports = function (router) {

    function getGuest(body) {
        var guest = _.clone(body);

        _.each(guest, function(value, key) {
            if(typeof value === "String") {
                guest[key] = value.trim();
            }
        });

        return guest;
    }

    router.use(passport.authenticate("basic"));

    // Get
    router.get("/", function (req, res) {
        Guest.find(function (err, guests) {
            if (err) {
                console.log(err);
                res.send(500, err);
            } {
                res.json(guests);
            }
        });
    });

    // Create
    router.post("/", function(req, res) {
        //Retrieve data
        var guestOpts = getGuest(req.body);

        //Create a new instance of a guest
        var guest = new Guest(guestOpts);

        //Save it to the database.
        guest.save(function (err) {
            if (err) {
                console.log('save error', err);
                res.send(500, err);
            } else {
                res.json(200, {id: guest._id });
            }
        });
    });

    // Update
    router.put("/:id", function(req, res) {
        var id = req.params.id;

        Guest.findOneAndUpdate({_id: id}, getGuest(req.body),
            function(err) {
                if(err) {
                    console.log(err);
                    res.send(500, err);
                } else {
                    res.sendStatus(200);
                }
            }
        );
    });

    // Delete
    router.delete("/:id", function (req, res) {
        Guest.remove({_id: req.params.id}, function (err) {
            if (err) {
                console.log('Remove error: ', err);
                res.send(500, err);
            } else {
                res.sendStatus(200);
            }
        });
    });
};
