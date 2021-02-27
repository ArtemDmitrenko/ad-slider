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

  public handlerViewTo!: HandlerView;

  public handlerViewFrom!: HandlerView;

  public valueNoteViewFrom!: ValueNoteView;

  public valueNoteViewTo!: ValueNoteView;

  public valueNoteViewCommon!: ValueNoteView;

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
    this.addListeners();
  }

  private render(container: HTMLElement): void {
    this.$el = container;
    this.$adslider = document.createElement('div');
    this.$adslider.classList.add('adslider');
    this.$el.append(this.$adslider);

    this.trackView = new TrackView(this.$adslider);
    this.barView = new BarView(this.$adslider);
    this.scaleView = new ScaleView(this.$adslider);
    this.handlerView = new HandlerView(this.trackView.$track);
    this.valueNoteView = new ValueNoteView(this.$adslider);

    this.handlerViewFrom = new HandlerView(this.trackView.$track);
    this.handlerViewFrom.$handler.classList.add('adslider__handler_from');
    this.valueNoteViewFrom = new ValueNoteView(this.$adslider);
    this.valueNoteViewFrom.$note.classList.add('adslider__note_from');
    this.valueNoteView.$note.classList.add('adslider__note_to');

  }

  public updateView(options: Config): void {
    this.setVerticalViewForSingle(options.vertical);
    this.handlerView.calcPos({ edge: this.getEdge(this.handlerView), value: options.curValue, limits: options.limits });
    this.handlerView.setPos();
    this.valueNoteView.calcPos(this.handlerView.$handler);
    this.valueNoteView.setPos();
    this.valueNoteView.setValue(options.curValue);
    this.valueNoteView.showValueNote(options.showValueNote);
    this.scaleView.drawScale(options, this.handlerView.$handler);
    if (options.double) {
      if (!this.handlerViewFrom) {
        this.handlerViewFrom = new HandlerView(this.trackView.$track);
        this.handlerViewFrom.$handler.classList.add('adslider__handler_from');
        this.valueNoteViewFrom = new ValueNoteView(this.$adslider);
        this.valueNoteViewFrom.$note.classList.add('adslider__note_from');
        this.handlerViewFrom.$handler.addEventListener('mousedown', this.moveHandler.bind(this, this.handlerViewFrom));
      }
      this.setVerticalViewForDouble(options.vertical);
      this.handlerViewFrom.calcPos({ edge: this.getEdge(this.handlerViewFrom), value: options.from, limits: options.limits });
      this.handlerViewFrom.setPos();
      this.valueNoteViewFrom.calcPos(this.handlerViewFrom.$handler);
      this.valueNoteViewFrom.setPos();
      this.valueNoteViewFrom.setValue(options.from);
      this.valueNoteViewFrom.showValueNote(options.showValueNote);
      this.barView.setLengthForDouble({ edge: this.getEdge(this.handlerViewFrom), valueFrom: options.from, valueTo: options.curValue, limits: options.limits, handler: this.handlerView.$handler });
      const data = { valueFrom: options.from, valueTo: options.to };
      this.setViewOfOneNote(data);
    } else {
      if (this.handlerViewFrom) {
        this.handlerViewFrom.$handler.remove();
        this.valueNoteViewFrom.$note.remove();
        this.handlerViewFrom = null;
        this.valueNoteViewFrom = null;
      }
      this.barView.setLength(this.handlerView.$handler);
    }
  }

  private addListeners(): void {
    this.handlerView.$handler.addEventListener('mousedown', this.moveHandler.bind(this, this.handlerView));
    this.trackView.$track.addEventListener('mousedown', this.changeHandlerPos.bind(this));
    this.barView.$bar.addEventListener('mousedown', this.changeHandlerPos.bind(this));
    this.scaleView.$scale.addEventListener('mousedown', this.changeHandlerPos.bind(this));
    if (this.isDouble()) {
      this.handlerViewFrom.$handler.addEventListener('mousedown', this.moveHandler.bind(this, this.handlerViewFrom));
    }
  }

  private changeHandlerPos(e: MouseEvent) {
    if (this.isDouble()) {
      if (this.handlerView.$handler.classList.contains('adslider__handler_horizontal') {
        const handlerFromPos = this.handlerViewFrom.$handler.getBoundingClientRect().left;
        const handlerToPos = this.handlerView.$handler.getBoundingClientRect().left;
        const middlePos = (handlerToPos - handlerFromPos) / 2 + handlerFromPos + this.handlerView.getLength() / 2;
        if (e.clientX <= middlePos) {
          this.mouseMove(this.handlerViewFrom.getLength() / 2, this.handlerViewFrom, e);
        } else {
          this.mouseMove(this.handlerView.getLength() / 2, this.handlerView, e);
        }
      } else {
        const handlerFromPos = this.handlerViewFrom.$handler.getBoundingClientRect().top;
        const handlerToPos = this.handlerView.$handler.getBoundingClientRect().top;
        const middlePos = (handlerToPos - handlerFromPos) / 2 + handlerFromPos + this.handlerView.getLength() / 2;
        if (e.clientY >= middlePos) {
          this.mouseMove(this.handlerViewFrom.getLength() / 2, this.handlerViewFrom, e);
        } else {
          this.mouseMove(this.handlerView.getLength() / 2, this.handlerView, e);
        }
      }

    } else {
      this.mouseMove(this.handlerView.getLength() / 2, this.handlerView, e);
    }
  }

  private setVerticalViewForSingle(vertical: boolean): void {
    if (vertical) {
      this.$adslider.classList.remove('adslider_horizontal');
      this.$adslider.classList.add('adslider_vertical');
    } else {
      this.$adslider.classList.remove('adslider_vertical');
      this.$adslider.classList.add('adslider_horizontal');
    }
    this.trackView.setVerticalView(vertical);
    this.handlerView.setVerticalView(vertical);
    this.valueNoteView.setVerticalView(vertical);
    this.barView.setVerticalView(vertical);
  }

  private setVerticalViewForDouble(vertical: boolean): void {
    this.handlerViewFrom.setVerticalView(vertical);
    this.valueNoteViewFrom.setVerticalView(vertical);
  }

  private moveHandler(handler: HandlerView, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.bindMousemove(event, this.calcShift(event, handler.$handler), handler);
  }

  private bindMousemove(event: MouseEvent, shift: number, handler: HandlerView): void {
    this.mouseMoveListener = this.mouseMove.bind(this, shift, handler);
    this.mouseUpListener = this.mouseUp.bind(this);
    // if (event.type === 'mousedown') {
    document.addEventListener('mousemove', this.mouseMoveListener);
    document.addEventListener('mouseup', this.mouseUpListener);
    // }
  }

  private mouseMove(shift: number, handler: HandlerView, e: MouseEvent): void {
    let newPos = this.calcnewPos(shift, e);
    const edge: number = this.getEdge(handler);
    newPos = this.checknewPos(newPos);
    const data = { newPos, edge, handler: handler.$handler };
    this.broadcast('handlerMove', data);
  }

  private mouseUp(): void {
    document.removeEventListener('mouseup', this.mouseUpListener);
    document.removeEventListener('mousemove', this.mouseMoveListener);
  }

  private getEdge(handler: HandlerView): number {
    const edge: number = this.trackView.getLength() - handler.getLength();
    return edge;
  }

  private checknewPos(newPos: number): number {
    const edge = this.getEdge(this.handlerView);
    let newPosCopy = newPos;
    if (newPos < 0) {
      newPosCopy = 0;
    } else if (newPos > edge) {
      newPosCopy = edge;
    }
    return newPosCopy;
  }

  private calcShift(e: MouseEvent, handler: HTMLElement): number {
    let shift: number;
    if (this.isVertical()) {
      shift = e.clientY - handler.getBoundingClientRect().bottom;
    } else {
      shift = e.clientX - handler.getBoundingClientRect().left;
    }
    return Math.abs(shift);
  }

  private isVertical(): boolean {
    if (this.$adslider.classList.contains('adslider_vertical')) {
      return true;
    }
    return false;
  }

  private isDouble(): boolean {
    if (this.handlerViewFrom) {
      return true;
    } else {
      return false;
    }
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

  public setViewOfOneNote(options: any): void {
    if (this.isSmallDistanceBetweenNotes()) {
      this.makeCommonNoteView(options.valueFrom, options.valueTo);
    } else {
      if (this.valueNoteViewCommon) {
        this.removeValueNotesFromAndTo();
      }
    }
  }

  private isSmallDistanceBetweenNotes(): boolean {
    if (this.valueNoteView.getPos() - this.valueNoteViewFrom.getPos() < this.valueNoteView.getSize() + 3) {
      return true;
    }
    return false;
  }

  private makeCommonNoteView(valueFrom: number, valueTo: number) {
    this.valueNoteView.showValueNote(false);
    this.valueNoteViewFrom.showValueNote(false);
    if (this.valueNoteViewCommon) {
      this.updateCommonNoteView(valueFrom, valueTo);
    } else {
      this.valueNoteViewCommon = new ValueNoteView(this.$adslider);
      this.valueNoteViewCommon.$note.classList.add('adslider__note_common');
      this.valueNoteViewCommon.setVerticalView(this.isVertical());
      this.updateCommonNoteView(valueFrom, valueTo);
    }
  }

  private updateCommonNoteView(valueFrom: number, valueTo: number): void {
    this.valueNoteViewCommon.setValueForTwo(valueFrom, valueTo);
    const leftEdgeOfHandlerFrom = this.handlerViewFrom.getPos();
    const rightEdgeOfHandlerTo = this.handlerView.getPos() + this.handlerView.getLength();
    const distBetweenEdgesOfHandlers = rightEdgeOfHandlerTo - leftEdgeOfHandlerFrom;
    this.valueNoteViewCommon.valueNotePos = leftEdgeOfHandlerFrom + distBetweenEdgesOfHandlers / 2;
    this.valueNoteViewCommon.setPos();
  }


  private removeValueNotesFromAndTo(): void {
    this.valueNoteView.showValueNote(true);
    this.valueNoteViewFrom.showValueNote(true);
    this.valueNoteViewCommon.$note.remove();
    this.valueNoteViewCommon = null;
  }
}
