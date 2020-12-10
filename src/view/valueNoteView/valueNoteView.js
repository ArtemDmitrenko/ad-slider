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
  setValue(value) {
    this.$value.textContent = value;
  }
}