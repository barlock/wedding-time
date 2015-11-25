'use strict';

var namespace = require('guests').name;

describe('RsvpController:', function () {
    var mockScope, mockWindow = {location: {href: ''}}, successCallback,
        mockGuests = {
            get: function (code, success) {
                successCallback = success;
            },
            update: function (id, guest, success) {
                successCallback = success;
            }
        };

    beforeEach(angular.mock.module(namespace));

    beforeEach(angular.mock.module(function ($provide) {
        $provide.value('$window', mockWindow);
        $provide.factory(namespace + '.GuestServices', function () {
            return mockGuests;
        });
    }));

    beforeEach(angular.mock.inject(function ($controller, $rootScope) {
        mockScope = $rootScope.$new();
        $controller(namespace + '.RsvpController', {
            '$scope': mockScope
        });
        spyOn(mockGuests, 'get').and.callThrough();
        spyOn(mockGuests, 'update').and.callThrough();
    }));

    describe('when controller loaded', function () {
        it('then default state should be set', function () {
            expect(mockScope.guest).toBeEmptyObject();
            expect(mockScope.attending).toBeEmptyObject();
            expect(mockScope.attempts).toEqual(0);
        });
    });

    describe('when RSVP code validated successfully', function () {
        var rsvpCode = 'banana', result = {
            address: '123 Main Street↵Raleigh, NC 27613',
            group: 'Michael',
            guestAllowed: true,
            invitationName: 'Joe Smith',
            namesComing: [],
            namesInvited: ['Joe Smith'],
            numberInvited: 2,
            rsvpCode: 'papa bear',
            rsvpd: false
        };

        beforeEach(function () {
            mockScope.validate(rsvpCode);
            successCallback(result);
            mockScope.$apply();
        });

        it('then guest service should be called', function () {
            expect(mockGuests.get.calls.mostRecent().args[0]).toEqual({rsvp: rsvpCode});
        });

        it('then number of attempts is incremented', function () {
            expect(mockScope.attempts).toEqual(1);
        });

        it('then guest should equal result', function () {
            expect(mockScope.guest).toEqual(result);
        });

        it('then attending should equal the number of guests invited', function () {
            expect(mockScope.attending).toEqual({'Joe Smith': true});
        });
    });

    describe('when RSVP code unsuccessfully validated', function () {
        var rsvpCode = 'banana', result = {};

        beforeEach(function () {
            mockScope.validate(rsvpCode);
            successCallback(result);
            mockScope.$apply();
        });

        it('then guest service should be called', function () {
            expect(mockGuests.get.calls.mostRecent().args[0]).toEqual({rsvp: rsvpCode});
        });

        it('then number of attempts is incremented', function () {
            expect(mockScope.attempts).toEqual(1);
        });

        it('then guest should be empty', function () {
            expect(mockScope.guest).toBeEmptyObject();
        });

        it('then attending should be empty', function () {
            expect(mockScope.attending).toBeEmptyObject();
        });
    });

    describe('when user enters incorrect RSVP code and wants to re-enter code', function () {
        it('then guest should be cleared', function () {
            mockScope.giveUp();
            expect(mockScope.guest).toBeEmptyObject();
        });
    });

    describe('when user submits RSVP', function () {
        var id = '1234';
        beforeEach(function () {
            mockScope.guest = {
                _id: id,
                address: '123 Main Street↵Raleigh, NC 27613',
                group: 'Michael',
                guestAllowed: true,
                invitationName: 'Joe Smith',
                namesComing: [],
                namesInvited: ['Joe Smith'],
                numberInvited: 2,
                rsvpCode: 'papa bear',
                rsvpd: false
            };
            mockScope.attending = {
                'Joe Smith': true
            };

            mockScope.submit();
        });

        it('then guest information should be updated', function () {
            expect(mockScope.guest.rsvpd).toBeTrue();
            expect(mockScope.guest.namesComing).toContain('Joe Smith');
            expect(mockScope.guest.numberComing).toEqual(1);
        });

        it('then database should be updated', function () {
            expect(mockGuests.update.calls.mostRecent().args[0]).toEqual({id: id});
            expect(mockGuests.update.calls.mostRecent().args[1]).toEqual(mockScope.guest);
        });

        it('then user should be redirected to the Accomodations page', function () {
            successCallback();
            mockScope.$apply();
            expect(mockWindow.location.href).toEqual('/accommodations');
        });
    });
});
