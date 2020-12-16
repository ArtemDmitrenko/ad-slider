"use strict";
exports.__esModule = true;
var EventObserver = /** @class */ (function () {
    function EventObserver() {
        this.observers = [];
    }
    // constructor() {
    //   this.observers = [];
    // }
    EventObserver.prototype.addObserver = function (newObserver) {
        if (typeof newObserver !== 'function') {
            throw new Error('Observer must be a function!');
        }
        this.observers.forEach(function (observer) {
            if (observer === newObserver) {
                throw new Error('Observer already in the list!');
            }
        });
        this.observers.push(newObserver);
    };
    EventObserver.prototype.removeObserver = function (obs) {
        for (var i = 0; i < this.observers.length; i++) {
            if (obs === this.observers[i]) {
                this.observers.splice(i, 1);
                return;
            }
        }
        throw new Error('No such observer in the list!');
    };
    EventObserver.prototype.broadcast = function (data) {
        if (this.observers.length < 1) {
            return;
        }
        var observersClone = this.observers.slice(0);
        observersClone.forEach(function (subscriber) {
            subscriber(data);
        });
    };
    return EventObserver;
}());
exports["default"] = EventObserver;
