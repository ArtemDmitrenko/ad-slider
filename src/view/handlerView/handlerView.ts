
export default class HandlerView {
  public $handler: HTMLElement;
  private $parent: HTMLElement;

  constructor($parent: HTMLElement) {
    this.render($parent);
  }

  private render($parent: HTMLElement): void {
    this.$parent = $parent;
    this.$handler = document.createElement('div');
    this.$handler.classList.add('adslider__handler');
    $parent.append(this.$handler);
  }

  public getHandlerWidth(): number {
    return this.$handler.offsetWidth;
  }

  // _setMovePosition($track) {
  //   this.$handler.addEventListener('mousedown', e => {
  //     e.preventDefault();
  //     const shiftX = e.clientX - this.$handler.getBoundingClientRect().left;
  //     const mouseMove = e => {
  //       let newLeft = e.clientX - shiftX - $track.getBoundingClientRect().left;
  //       let rightEdge = $track.offsetWidth - this.$handler.offsetWidth;
  //       if (newLeft < 0) {
  //         newLeft = 0;
  //       }
  //       if (newLeft > rightEdge) {
  //         newLeft = rightEdge;
  //       }
  //       this.$handler.style.left = newLeft + 'px';
  //       const handlerWidth = this.$handler.offsetWidth;
  //       const data = { newLeft, handlerWidth, rightEdge };
  //       this.eventMousemove.broadcast(data);
  //     };

  //     function mouseUp() {
  //       document.removeEventListener('mouseup', mouseUp);
  //       document.removeEventListener('mousemove', mouseMove);
  //     }
  //     document.addEventListener('mousemove', mouseMove);
  //     document.addEventListener('mouseup', mouseUp);
  //   });
  //   document.addEventListener('dragstart', () => false);
  // }
  // _setPosition(newLeft) {
  //   this.$handler.style.left = newLeft + 'px';
  // }

}