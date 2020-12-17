"use strict";
exports.__esModule = true;
var ValueNoteView = /** @class */ (function () {
    function ValueNoteView(parent) {
        this.render(parent);
    }
    ValueNoteView.prototype.render = function (parent) {
        this.$note = document.createElement('div');
        this.$value = document.createElement('p');
        this.$note.classList.add('adslider__note');
        this.$value.classList.add('adslider__value');
        this.$note.append(this.$value);
        parent.append(this.$note);
    };
    ValueNoteView.prototype.setValue = function (value) {
        this.$value.textContent = String(value);
    };
    ValueNoteView.prototype.showValueNote = function (data) {
        if (data === true) {
            this.$note.classList.remove('adslider__note_hide');
            this.$note.classList.add('adslider__note_show');
        }
        else {
            this.$note.classList.remove('adslider__note_show');
            this.$note.classList.add('adslider__note_hide');
        }
    };
    return ValueNoteView;
}());
exports["default"] = ValueNoteView;
