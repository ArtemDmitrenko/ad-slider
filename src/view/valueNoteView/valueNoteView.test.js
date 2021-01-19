"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const valueNoteView_1 = __importDefault(require("./valueNoteView"));
describe('valueNoteView', () => {
    let $parent;
    let valueNoteView;
    beforeEach(() => {
        $parent = document.createElement('div');
        valueNoteView = new valueNoteView_1.default($parent);
    });
    test('Function render: create $note element', () => {
        expect(valueNoteView.$note).not.toBeNull();
        expect(valueNoteView.$note.tagName).toBe('DIV');
    });
    test('Function render: create $value element', () => {
        expect(valueNoteView.$value).not.toBeNull();
        expect(valueNoteView.$value.tagName).toBe('P');
    });
    test('Function render: add css-class to $note element', () => {
        expect(valueNoteView.$note.classList.contains('adslider__note')).toBe(true);
    });
    test('Function render: add css-class to $value element', () => {
        expect(valueNoteView.$value.classList.contains('adslider__value')).toBe(true);
    });
    test('Function render: append $value to $note', () => {
        expect(valueNoteView.$value.parentElement).toBe(valueNoteView.$note);
    });
    test('Function render: append $note to parent-element', () => {
        expect(valueNoteView.$note.parentElement).toBe($parent);
    });
    test('Function setValue', () => {
        valueNoteView.setValue(50);
        expect(valueNoteView.$value.innerHTML).toBe('50');
    });
    test('Function setPos', () => {
        valueNoteView.setPos(50);
        expect(getComputedStyle(valueNoteView.$note).left).toBe('50px');
    });
    test('Function showValueNote', () => {
        valueNoteView.showValueNote(true);
        expect(valueNoteView.$note.classList.contains('adslider__note_hide')).toBe(false);
        expect(valueNoteView.$note.classList.contains('adslider__note_show')).toBe(true);
        valueNoteView.showValueNote(false);
        expect(valueNoteView.$note.classList.contains('adslider__note_hide')).toBe(true);
        expect(valueNoteView.$note.classList.contains('adslider__note_show')).toBe(false);
    });
});
