import EventObserver from '../../eventObserver/eventObserver';

export default class ValueNoteView {
  constructor(parent) {
    this.parent = parent;
    this._render();

  }
  _render() {
    this.$note = document.createElement('div');
    this.$value = document.createElement('p');
    this.$note.classList.add('adslider__note');
    this.$value.classList.add('adslider__value');
    this.$note.append(this.$value);
    this.parent.append(this.$note);
  }
  _setValue(value) {
    this.$value.textContent = value;
  }
  _alignRelHandler(handlerWidth) {
    this.$note.style.left = handlerWidth / 2 + 'px';
  }
  _setPosition(data) {
    this.$note.style.left = data.newLeft + data.handlerWidth / 2 + 'px';
  }
}