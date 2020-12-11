import EventObserver from '../../eventObserver/eventObserver';

export default class HandlerView {
  constructor(parent) {
    this.parent = parent;
    this._render();
    this.eventMousemove = new EventObserver();
  }
  _getHandlerWidth() {
    return this.$handler.offsetWidth;
  }
  _render() {
    this.$handler = document.createElement('div');
    this.$handler.classList.add('adslider__handler');
    this.parent.append(this.$handler);
  }
  _setMovePosition($track) {
      this.$handler.addEventListener('mousedown', e => {
        e.preventDefault();
        const shiftX = e.clientX - this.$handler.getBoundingClientRect().left;
        const mouseMove = e => {
          let newLeft = e.clientX - shiftX - $track.getBoundingClientRect().left;
          let rightEdge = $track.offsetWidth - this.$handler.offsetWidth;
          if (newLeft < 0) {
            newLeft = 0;
          }
          if (newLeft > rightEdge) {
            newLeft = rightEdge;
          }
          this.$handler.style.left = newLeft + 'px';
          const handlerWidth = this.$handler.offsetWidth;
          const data = { newLeft, handlerWidth, rightEdge };
          this.eventMousemove.broadcast(data);
        };

        function mouseUp() {
          document.removeEventListener('mouseup', mouseUp);
          document.removeEventListener('mousemove', mouseMove);
        }
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
      });
      document.addEventListener('dragstart', () => false);
    }
    // method to set position of handler due to value
  _setPosition(newLeft) {
    this.$handler.style.left = newLeft + 'px';
  }
}