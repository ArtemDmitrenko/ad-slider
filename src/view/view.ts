import { Config } from '../model/model';
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

  public updateView(options: Config): void {
    const handlerPos: number = this.calcHandlerPos(options.curValue, options.limits);
    this.handlerView.setPos(handlerPos);
    const valueNotePos: number = this.calcValueNotePos();
    this.valueNoteView.setPos(valueNotePos);
    this.valueNoteView.setValue(options.curValue);
    this.valueNoteView.showValueNote(options.showValueNote);
  }

  private addListeners(): void {
    this.handlerView.$handler.addEventListener('mousedown', this.moveHandler.bind(this));
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
    this.handlerView.setPos(newLeft);
    this.valueNoteView.setPos(this.calcValueNotePos());
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

  private calcHandlerPos(value: number, limits: { min: number, max: number }): number {
    const handlerPos = this.getRightEdge() * ((value - limits.min) / (limits.max - limits.min));
    return handlerPos;
  }

  private calcValueNotePos(): number {
    const valueNotePos: number = parseInt(getComputedStyle(this.handlerView.$handler).left, 10) + parseInt(getComputedStyle(this.handlerView.$handler).width, 10) / 2;
    return valueNotePos;
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
