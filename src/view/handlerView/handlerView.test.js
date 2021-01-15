"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlerView_1 = __importDefault(require("./handlerView"));
describe('handlerView', () => {
    let $parent;
    let handlerView;
    beforeEach(() => {
        $parent = document.createElement('div');
        handlerView = new handlerView_1.default($parent);
    });
    test('Function render: create element', () => {
        expect(handlerView.$handler).not.toBeNull();
        expect(handlerView.$handler.tagName).toBe('DIV');
    });
    test('Function render: add css-class', () => {
        expect(handlerView.$handler.classList.contains('adslider__handler')).toBe(true);
    });
    test('Function render: append track to parent-element', () => {
        expect(handlerView.$handler.parentElement).toBe($parent);
    });
    test('Function getWidth', () => {
        expect(handlerView.getWidth()).toBe(handlerView.$handler.offsetWidth);
    });
    test('Function setPos', () => {
        handlerView.setPos(5);
        expect(window.getComputedStyle(handlerView.$handler).left).toBe('5px');
    });
});
