"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventObserver {
    constructor() {
        this.observers = [];
    }
    // constructor() {
    //   this.observers = [];
    // }
    addObserver(newObserver) {
        if (typeof newObserver !== 'function') {
            throw new Error('Observer must be a function!');
        }
        this.observers.forEach((observer) => {
            if (observer === newObserver) {
                throw new Error('Observer already in the list!');
            }
        });
        this.observers.push(newObserver);
    }
    removeObserver(obs) {
        for (let i = 0; i < this.observers.length; i += 1) {
            if (obs === this.observers[i]) {
                this.observers.splice(i, 1);
                return;
            }
        }
        throw new Error('No such observer in the list!');
    }
    broadcast(data) {
        if (this.observers.length < 1) {
            return;
        }
        const observersClone = this.observers.slice(0);
        observersClone.forEach((subscriber) => {
            subscriber(data);
        });
    }
}
exports.default = EventObserver;
