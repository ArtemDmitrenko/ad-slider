"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlerView_1 = __importDefault(require("./handlerView/handlerView"));
const trackView_1 = __importDefault(require("./trackView/trackView"));
const valueNoteView_1 = __importDefault(require("./valueNoteView/valueNoteView"));
const eventObserver_1 = __importDefault(require("../eventObserver/eventObserver"));
class View extends eventObserver_1.default {
    constructor(selector) {
        super();
        this.render(selector);
    }
    render(selector) {
        this.$el = document.querySelector(selector);
        if (!this.$el) {
            throw new Error('You do not have this selector in your DOM');
        }
        this.$adslider = document.createElement('div');
        this.$adslider.classList.add('adslider');
        this.$el.append(this.$adslider);
        this.trackView = new trackView_1.default(this.$adslider);
        this.handlerView = new handlerView_1.default(this.trackView.$track);
        this.valueNoteView = new valueNoteView_1.default(this.$adslider);
        this.addListeners();
    }
    getRightEdge() {
        const rightEdge = this.trackView.getLength() - this.handlerView.getHandlerWidth();
        return rightEdge;
    }
    calcPosAndValue(value, limits, rightEdge) {
        const handlerPos = rightEdge * ((value - limits.min) / (limits.max - limits.min));
        this.setHandlerPos(handlerPos);
        this.valueNoteView.setValue(value);
    }
    calNewLeft(e, shiftX) {
        let newLeft = e.clientX - shiftX - this.trackView.$track.getBoundingClientRect().left;
        const rightEdge = this.getRightEdge();
        if (newLeft < 0) {
            newLeft = 0;
        }
        else if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }
        return newLeft;
    }
    setHandlerPos(value) {
        this.handlerView.$handler.style.left = `${value}px`;
        this.valueNoteView.$note.style.left = `${value + this.handlerView.getHandlerWidth() / 2}px`;
    }
    addListeners() {
        this.handlerView.$handler.addEventListener('mousedown', this.moveHandler.bind(this));
        // document.addEventListener('dragstart', View.dragstart);
    }
    static dragstart() {
        return false;
    }
    moveHandler(event) {
        event.preventDefault();
        const shiftX = event.clientX - this.handlerView.$handler.getBoundingClientRect().left;
        const mouseMove = (e) => {
            let newLeft = e.clientX - shiftX - this.trackView.$track.getBoundingClientRect().left;
            const rightEdge = this.getRightEdge();
            if (newLeft < 0) {
                newLeft = 0;
            }
            else if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }
            console.log(newLeft);
            console.log(this);
            this.handlerView.$handler.style.left = `${newLeft}px`;
            this.valueNoteView.$note.style.left = `${newLeft + this.handlerView.getHandlerWidth() / 2}px`;
        };
        function mouseUp() {
            document.removeEventListener('mouseup', mouseUp);
            document.removeEventListener('mousemove', mouseMove);
        }
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    }
}
exports.default = View;
