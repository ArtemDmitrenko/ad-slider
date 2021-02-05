import HandlerView from './handlerView/handlerView';
import TrackView from './trackView/trackView';
import ValueNoteView from './valueNoteView/valueNoteView';
import EventObserver from '../eventObserver/eventObserver';

export default class View extends EventObserver {
  public $el!: HTMLElement | null;

  public handlerView!: HandlerView;

  public trackView!: TrackView;

  public valueNoteView!: ValueNoteView;

  private $adslider!: HTMLElement;

  private mouseMoveListener!: any;

  private mouseUpListener!: any;

  constructor(container: HTMLElement) {
    super();
    this.render(container);
  }

  private render(container: HTMLElement): void {
    this.$el = container;
    this.$adslider = document.createElement('div');
    this.$adslider.classList.add('adslider');
    this.$el.append(this.$adslider);

    this.trackView = new TrackView(this.$adslider);
    this.handlerView = new HandlerView(this.trackView.$track);
    this.valueNoteView = new ValueNoteView(this.$adslider);

    this.addListeners();
  }

  public updateView(options): void {
    this.setVerticalView(options);
    const data = { value: options.curValue, limits: options.limits };
    this.setHandlerPos(data);
    this.setValueNotePos();
    this.valueNoteView.setValue(options.curValue);
    this.valueNoteView.showValueNote(options.showValueNote);
  }

  private addListeners(options): void {
    this.handlerView.$handler.addEventListener('mousedown', this.moveHandler.bind(this));
  }

  private setVerticalView(options) {
    if (options.vertical) {
      this.$adslider.classList.add('adslider_vertical');
    } else {
      this.$adslider.classList.add('adslider_horizontal');
    }
    this.trackView.setVerticalView(options.vertical);
    this.handlerView.setVerticalView(options.vertical);
    this.valueNoteView.setVerticalView(options.vertical);
  }

  private moveHandler(event: MouseEvent): void {
    event.preventDefault();
    this.bindMousemove(event, this.calcShiftX(event));
  }

  private bindMousemove(event: MouseEvent, shiftX: number): void {
    this.mouseMoveListener = this.mouseMove.bind(this, shiftX);
    this.mouseUpListener = this.mouseUp.bind(this);
    // if (event.type === 'mousedown') {
    document.addEventListener('mousemove', this.mouseMoveListener);
    document.addEventListener('mouseup', this.mouseUpListener);
    // }
  }

  private mouseMove(shiftX: number, e: MouseEvent): void {
    let newLeft = this.calcNewLeft(shiftX, e);
    const rightEdge: number = this.getRightEdge();
    newLeft = this.checkNewLeft(newLeft);
    const data = { newLeft, rightEdge };
    this.broadcast('handlerMove', data);
  }

  private mouseUp(): void {
    document.removeEventListener('mouseup', this.mouseUpListener);
    document.removeEventListener('mousemove', this.mouseMoveListener);
  }

  private getRightEdge(): number {
    const rightEdge = this.trackView.getWidth() - this.handlerView.getWidth();
    return rightEdge;
  }

  public setHandlerPos(data: { value: number, limits: { min: number, max: number } }): void {
    const handlerPos = this.getRightEdge() * ((data.value - data.limits.min) / (data.limits.max - data.limits.min));
    this.handlerView.setPos(handlerPos);
  }

  public setValueNotePos(): void {
    const valueNotePos: number = parseInt(getComputedStyle(this.handlerView.$handler).left, 10) + parseInt(getComputedStyle(this.handlerView.$handler).width, 10) / 2;
    this.valueNoteView.setPos(valueNotePos);
  }

  private checkNewLeft(newLeft: number): number {
    const rightEdge = this.getRightEdge();
    let newLeftCopy = newLeft;
    if (newLeft < 0) {
      newLeftCopy = 0;
    } else if (newLeft > rightEdge) {
      newLeftCopy = rightEdge;
    }
    return newLeftCopy;
  }

  private calcShiftX(e: MouseEvent): number {
    const shiftX: number = e.clientX - this.handlerView.$handler.getBoundingClientRect().left;
    return shiftX;
  }

  private calcNewLeft(shiftX: number, e: MouseEvent): number {
    const newLeft: number = e.clientX - shiftX - this.trackView.$track.getBoundingClientRect().left;
    return newLeft;
  }
}
