'use strict';

var Guest = require('../../../../models/guest'),
    passport = require('passport'),
    _ = require('underscore');

module.exports = function (router) {

    function getGuest(body) {
        var guest = _.clone(body);

        _.each(guest, function (value, key) {
            if (typeof value === 'string') {
                guest[key] = value.trim();
            }

            if (guest.rsvpCode) {
                guest.rsvpCode = guest.rsvpCode.toLowerCase();
            }
        });

        return guest;
    }


    // Get
    router.get('/', function (req, res) {
        var query = req.query.rsvp ? {
            rsvpCode: req.query.rsvp.trim().toLowerCase()
        } : {};

        Guest.find(query, function (err, guests) {
            if (err) {
                console.log(err);
                res.send(500, err);
            } else {
                if (_.isEmpty(query)) {
                    res.json(guests);
                } else {
                    res.json(guests[0]);
                }
            }
        });
    });

    // Update
    router.put('/:id', function (req, res) {
        var id = req.params.id;

        Guest.findOneAndUpdate({_id: id}, getGuest(req.body),
            function (err) {
                if (err) {
                    console.log(err);
                    res.send(500, err);
                } else {
                    res.sendStatus(200);
                }
            }
        );
    });

    router.use(passport.authenticate('basic'));

    // Create
    router.post('/', function (req, res) {
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
                res.status(200).json({id: guest._id});
            }
        });
    });

    // Delete
    router.delete('/:id', function (req, res) {
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
