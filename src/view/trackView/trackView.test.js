"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trackView_1 = __importDefault(require("./trackView"));
describe('trackView', () => {
    const $parent = document.createElement('div');
    const trackView = new trackView_1.default($parent);
    test('Function render: create element', () => {
        expect(trackView.$track).not.toBeNull();
        expect(trackView.$track.tagName).toBe('DIV');
    });
    test('Function render: add css-class', () => {
        expect(trackView.$track.classList.contains('adslider__track')).toBe(true);
    });
    test('Function render: append track to parent-element', () => {
        expect(trackView.$track.parentElement).toBe($parent);
    });
    test('Function getLength', () => {
        expect(trackView.getLength()).toBe(trackView.$track.offsetWidth);
    });
});
