"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValueNoteView {
    constructor(parent) {
        this.render(parent);
    }
    render(parent) {
        this.$note = document.createElement('div');
        this.$value = document.createElement('p');
        this.$note.classList.add('adslider__note');
        this.$value.classList.add('adslider__value');
        this.$note.append(this.$value);
        parent.append(this.$note);
    }
    setValue(value) {
        this.$value.textContent = String(value);
    }
    showValueNote(data) {
        if (data === true) {
            this.$note.classList.remove('adslider__note_hide');
            this.$note.classList.add('adslider__note_show');
        }
        else {
            this.$note.classList.remove('adslider__note_show');
            this.$note.classList.add('adslider__note_hide');
        }
    }
    setPos(handler) {
        this.$note.style.left = `${parseInt(getComputedStyle(handler).left, 10) + parseInt(getComputedStyle(handler).width, 10) / 2}px`;
    }
}
exports.default = ValueNoteView;
