export default class TrackView {
  constructor(parent) {
    this.parent = parent;
    this._render();
  }
  _render() {
    this.$track = document.createElement('div');
    this.$track.classList.add('adslider__track');
    this.parent.append(this.$track);
  }
}