'use strict';

var mongoose = require('mongoose');

var GuestModel = function () {
    var schema = mongoose.Schema({
        address: {type: String, required: true},
        group: {type: String, required: true},
        invitationName: {type: String, required: true},
        namesInvited: {type: [String], required: true},
        namesComing: [String],
        numberInvited: {type: Number, required: true},
        numberComing: Number,
        guestAllowed: Boolean,
        guestComing: Boolean,
        guestName: String,
        rsvpCode: {type: String, unique: true, required: true},
        rsvpd: Boolean,
        message: String
    });

    return mongoose.model('Guest', schema);
};

module.exports = new GuestModel();
