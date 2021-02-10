import HandlerView from './handlerView/handlerView';
import TrackView from './trackView/trackView';
import ValueNoteView from './valueNoteView/valueNoteView';
import BarView from './barView/barView';
import ScaleView from './scaleView/scaleView';
import EventObserver from '../eventObserver/eventObserver';
import { Config } from '../model/model';

export default class View extends EventObserver {
  public $el!: HTMLElement | null;

  public handlerView!: HandlerView;

  public trackView!: TrackView;

  public valueNoteView!: ValueNoteView;

  public barView!: BarView;

  public scaleView!: ScaleView;

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
    this.barView = new BarView(this.$adslider);
    this.scaleView = new ScaleView(this.$adslider);

    this.addListeners();
  }

  public updateView(options: Config): void {
    this.setVerticalView(options);
    const data = { value: options.curValue, limits: options.limits };
    this.setHandlerPos(data);
    this.setValueNotePos();
    this.valueNoteView.setValue(options.curValue);
    this.valueNoteView.showValueNote(options.showValueNote);
    this.barView.setLength(this.handlerView.$handler);
    this.scaleView.drawScale(options, this.handlerView.$handler);
  }

  private addListeners(options: Config): void {
    this.handlerView.$handler.addEventListener('mousedown', this.moveHandler.bind(this));
    this.trackView.$track.addEventListener('mousedown', this.changeHandlerPos.bind(this));
    this.barView.$bar.addEventListener('mousedown', this.changeHandlerPos.bind(this));
    this.scaleView.$scale.addEventListener('mousedown', this.changeHandlerPos.bind(this));
  }

  private changeHandlerPos(e: MouseEvent) {
    this.mouseMove(this.handlerView.getLength() / 2, e);
  }

  private setVerticalView(options: Config) {
    if (options.vertical) {
      this.$adslider.classList.add('adslider_vertical');
    } else {
      this.$adslider.classList.add('adslider_horizontal');
    }
    this.trackView.setVerticalView(options.vertical);
    this.handlerView.setVerticalView(options.vertical);
    this.valueNoteView.setVerticalView(options.vertical);
    this.barView.setVerticalView(options.vertical);
  }

  private moveHandler(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.bindMousemove(event, this.calcShift(event));
  }

  private bindMousemove(event: MouseEvent, shift: number): void {
    this.mouseMoveListener = this.mouseMove.bind(this, shift);
    this.mouseUpListener = this.mouseUp.bind(this);
    // if (event.type === 'mousedown') {
    document.addEventListener('mousemove', this.mouseMoveListener);
    document.addEventListener('mouseup', this.mouseUpListener);
    // }
  }

  private mouseMove(shift: number, e: MouseEvent): void {
    let newPos = this.calcnewPos(shift, e);
    const edge: number = this.getEdge();
    newPos = this.checknewPos(newPos);
    const data = { newPos, edge };
    this.broadcast('handlerMove', data);
  }

  private mouseUp(): void {
    document.removeEventListener('mouseup', this.mouseUpListener);
    document.removeEventListener('mousemove', this.mouseMoveListener);
  }

  private getEdge(): number {
    const edge: number = this.trackView.getLength() - this.handlerView.getLength();
    return edge;
  }

  public setHandlerPos(data: { value: number, limits: { min: number, max: number } }): void {
    const handlerPos = this.getEdge() * ((data.value - data.limits.min) / (data.limits.max - data.limits.min));
    this.handlerView.setPos(handlerPos);
  }

  public setValueNotePos(): void {
    let valueNotePos: number;
    if (this.isVertical()) {
      valueNotePos = parseInt(getComputedStyle(this.handlerView.$handler).bottom, 10) + parseInt(getComputedStyle(this.handlerView.$handler).height, 10) / 2;
    } else {
      valueNotePos = parseInt(getComputedStyle(this.handlerView.$handler).left, 10) + parseInt(getComputedStyle(this.handlerView.$handler).width, 10) / 2;
    }
    this.valueNoteView.setPos(valueNotePos);
  }

  public setBarLength(): void {
    this.barView.setLength(this.handlerView.$handler);
  }

  private checknewPos(newPos: number): number {
    const edge = this.getEdge();
    let newPosCopy = newPos;
    if (newPos < 0) {
      newPosCopy = 0;
    } else if (newPos > edge) {
      newPosCopy = edge;
    }
    return newPosCopy;
  }

  private calcShift(e: MouseEvent): number {
    let shift: number;
    if (this.isVertical()) {
      shift = e.clientY - this.handlerView.$handler.getBoundingClientRect().bottom;
    } else {
      shift = e.clientX - this.handlerView.$handler.getBoundingClientRect().left;
    }
    return Math.abs(shift);
  }

  private isVertical(): boolean {
    if (this.$adslider.classList.contains('adslider_vertical')) {
      return true;
    }
    return false;
  }

  private calcnewPos(shift: number, e: MouseEvent): number {
    let newPos;
    if (this.isVertical()) {
      newPos = this.trackView.$track.getBoundingClientRect().bottom - e.clientY - shift;
    } else {
      newPos = e.clientX - shift - this.trackView.$track.getBoundingClientRect().left;
    }
    return newPos;
  }
}
