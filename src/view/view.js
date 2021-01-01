"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Config } from '../model/model';
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
    addListeners() {
        this.handlerView.$handler.addEventListener('mousedown', this.moveHandler.bind(this));
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
            this.handlerView.setPos(newLeft);
            this.valueNoteView.setPos(this.handlerView.$handler);
            const data = { newLeft, rightEdge };
            this.broadcast(data);
        };
        function mouseUp() {
            document.removeEventListener('mouseup', mouseUp);
            document.removeEventListener('mousemove', mouseMove);
        }
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    }
    getRightEdge() {
        const rightEdge = this.trackView.getLength() - this.handlerView.getWidth();
        return rightEdge;
    }
    setHandlerPosAndValue(value, limits, rightEdge) {
        const handlerPos = rightEdge * ((value - limits.min) / (limits.max - limits.min));
        this.handlerView.setPos(handlerPos);
        this.valueNoteView.setPos(this.handlerView.$handler);
        this.valueNoteView.setValue(value);
    }
}
exports.default = View;
