'use strict';

var mongoose = require('mongoose');

var GuestModel = function () {
    var schema = mongoose.Schema({
        address: {type: String, required: true},
        group: {type: String, required: true},
        nameInvited: {type: String, required: true},
        nameComing: String,
        numberInvited: {type: Number, required: true},
        numberComing: Number,
        guestAllowed: Boolean,
        guestComing: Boolean,
        rsvpCode: {type: String, unique: true, required: true},
        rsvpd: Boolean
    });

    return mongoose.model('Guest', schema);
};

module.exports = new GuestModel();
