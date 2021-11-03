import HandlerView from './handlerView/handlerView';
import TrackView from './trackView/trackView';
import ValueNoteView from './valueNoteView/valueNoteView';
import BarView from './barView/barView';
import ScaleView from './scaleView/scaleView';
import EventObserver from '../eventObserver/eventObserver';

class View extends EventObserver {
  public $el!: HTMLElement | null;

  public handlerView!: HandlerView;

  public handlerViewFrom?: HandlerView;

  public valueNoteViewFrom?: ValueNoteView;

  public valueNoteViewTo!: ValueNoteView;

  public valueNoteViewCommon?: ValueNoteView;

  public trackView!: TrackView;

  public valueNoteView!: ValueNoteView;

  public barView!: BarView;

  public scaleView!: ScaleView;

  public $adslider!: HTMLElement;

  private handlerShift!: number;

  constructor(container: HTMLElement) {
    super();
    this.render(container);
    this.addObservers();
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
    this.handlerViewFrom.$handler.classList.add('adslider__handler_type_from');
    this.valueNoteViewFrom = new ValueNoteView(this.$adslider);
    this.valueNoteViewFrom.$note.classList.add('adslider__note_type_from');
    this.valueNoteView.$note.classList.add('adslider__note_type_to');
  }

  public updateView(options: {
    vertical: boolean;
    curValue: number;
    limits: { max: number; min: number };
    showValueNote: boolean;
    double: boolean;
    from: number;
    to: number;
    step: number;
  }): void {
    this.setVerticalViewForSingle(options.vertical);
    this.handlerView.calcPos({
      edge: this.getEdge(this.handlerView),
      value: options.curValue,
      limits: options.limits,
    });
    this.handlerView.setPos(options.double);
    this.valueNoteView.setValue(options.curValue);
    this.valueNoteView.showValueNote(options.showValueNote);
    this.scaleView.drawScale(options, this.handlerView.$handler);
    if (options.double) {
      this.updateViewForDouble(
        options.vertical,
        options.from,
        options.to,
        options.limits,
        options.showValueNote,
      );
    } else if (this.handlerViewFrom) {
      this.deleteHandlerFrom();
    }
  }

  private deleteHandlerFrom(): void {
    if (this.handlerViewFrom && this.valueNoteViewFrom) {
      this.handlerViewFrom.$handler.remove();
      this.valueNoteViewFrom.$note.remove();
      delete this.handlerViewFrom;
      delete this.valueNoteViewFrom;
    }
  }

  private updateViewForDouble(
    vertical: boolean,
    from: number,
    to: number,
    limits: { max: number; min: number },
    showValueNote: boolean,
  ): void {
    if (!this.handlerViewFrom) {
      this.renderHandlerFrom();
    }
    this.updateObservers();
    this.setVerticalViewForDouble(vertical);
    if (this.handlerViewFrom && this.valueNoteViewFrom) {
      this.handlerViewFrom.calcPos({
        edge: this.getEdge(this.handlerViewFrom),
        value: from,
        limits,
      });
      this.handlerViewFrom.setPos(true);
      this.valueNoteViewFrom.calcPos(this.handlerViewFrom.$handler);
      this.valueNoteViewFrom.setPos();
      this.valueNoteViewFrom.setValue(from);
      this.valueNoteViewFrom.showValueNote(showValueNote);
      this.barView.setLengthForDouble({
        valueFrom: this.handlerViewFrom.getPos(),
        valueTo: this.handlerView.getPos(),
        handler: this.handlerView.$handler,
      });
    }
    this.setViewOfOneNote();
  }

  private renderHandlerFrom(): void {
    this.handlerViewFrom = new HandlerView(this.trackView.$track);
    this.handlerViewFrom.$handler.classList.add('adslider__handler_type_from');
    this.valueNoteViewFrom = new ValueNoteView(this.$adslider);
    this.valueNoteViewFrom.$note.classList.add('adslider__note_type_from');
    this.handlerViewFrom.addObserver('handlerMousedownEvent', this.handleMouseDown);
    this.handlerViewFrom.addObserver('handlerMousemoveEvent', this.mouseMove);
  }

  private handleChangePos = (e: MouseEvent): void => {
    if (this.isDouble()) {
      if (
        this.handlerView.$handler.classList.contains(
          'adslider__handler_direction_horizontal',
        )
      ) {
        this.changeHandlerPosForDoubleHorizontal(e);
      } else {
        this.changeHandlerPosForDoubleVertical(e);
      }
    } else {
      const data = {
        shift: this.handlerView.getLength() / 2,
        e,
        handler: this.handlerView,
      };
      this.mouseMove(data);
    }
  }

  private changeHandlerPosForDoubleVertical(e: MouseEvent): void {
    if (this.handlerViewFrom) {
      const handlerFromPos = this.handlerViewFrom.$handler.getBoundingClientRect().top;
      const handlerToPos = this.handlerView.$handler.getBoundingClientRect().top;
      const oddToFrom: number = handlerToPos - handlerFromPos;
      const middlePos = oddToFrom / 2 + handlerFromPos + this.handlerView.getLength() / 2;
      if (e.clientY >= middlePos) {
        const data = {
          shift: this.handlerViewFrom.getLength() / 2,
          e,
          handler: this.handlerViewFrom,
        };
        this.mouseMove(data);
      } else {
        const data = {
          shift: this.handlerView.getLength() / 2,
          e,
          handler: this.handlerView,
        };
        this.mouseMove(data);
      }
    }
  }

  private changeHandlerPosForDoubleHorizontal(e: MouseEvent): void {
    if (this.handlerViewFrom) {
      const handlerFromPos = this.handlerViewFrom.$handler.getBoundingClientRect().left;
      const handlerToPos = this.handlerView.$handler.getBoundingClientRect().left;
      const oddToFrom: number = handlerToPos - handlerFromPos;
      const middlePos = oddToFrom / 2 + handlerFromPos + this.handlerView.getLength() / 2;
      if (e.clientX <= middlePos) {
        const data = {
          shift: this.handlerViewFrom.getLength() / 2,
          e,
          handler: this.handlerViewFrom,
        };
        this.mouseMove(data);
      } else {
        const data = {
          shift: this.handlerView.getLength() / 2,
          e,
          handler: this.handlerView,
        };
        this.mouseMove(data);
      }
    }
  }

  private setVerticalViewForSingle(vertical: boolean): void {
    if (vertical) {
      this.$adslider.classList.remove('adslider_direction_horizontal');
      this.$adslider.classList.add('adslider_direction_vertical');
    } else {
      this.$adslider.classList.remove('adslider_direction_vertical');
      this.$adslider.classList.add('adslider_direction_horizontal');
    }
    this.trackView.setVerticalView(vertical);
    this.handlerView.setVerticalView(vertical);
    this.valueNoteView.setVerticalView(vertical);
    this.barView.setVerticalView(vertical);
  }

  private setVerticalViewForDouble(vertical: boolean): void {
    if (this.handlerViewFrom && this.valueNoteViewFrom) {
      this.handlerViewFrom.setVerticalView(vertical);
      this.valueNoteViewFrom.setVerticalView(vertical);
    }
  }

  private handleMouseDown = (data: { event: MouseEvent; handler: HTMLElement }): void => {
    this.calcShift(data.event, data.handler);
  }

  private mouseMove = (data: {
    shift: number,
    e: MouseEvent,
    handler: HandlerView
  }): void => {
    let newPos;
    if (data.e.type === 'mousedown') {
      newPos = this.calcNewPos(data.shift, data.e);
    } else {
      newPos = this.calcNewPos(this.handlerShift, data.e);
    }
    const edge: number = this.getEdge(data.handler);
    newPos = this.checkNewPos(newPos);
    const isFrom = data.handler.$handler.classList.contains('adslider__handler_type_from');
    const relPosition = newPos / edge;
    const options = {
      relPosition, isFrom,
    };
    this.broadcast('changePos', options);
  }

  private getEdge(handler: HandlerView): number {
    return this.trackView.getLength() - handler.getLength();
  }

  private checkNewPos(newPos: number): number {
    const edge = this.getEdge(this.handlerView);
    let newPosCopy = newPos;
    if (newPos < 0) {
      newPosCopy = 0;
    } else if (newPos > edge) {
      newPosCopy = edge;
    }
    return newPosCopy;
  }

  private calcShift(e: MouseEvent, handler: HTMLElement): void {
    const shift = this.isVertical()
      ? e.clientY - handler.getBoundingClientRect().bottom
      : e.clientX - handler.getBoundingClientRect().left;
    this.handlerShift = Math.abs(shift);
  }

  private isVertical(): boolean {
    return this.$adslider.classList.contains('adslider_direction_vertical');
  }

  private isDouble(): boolean {
    return (!!this.handlerViewFrom);
  }

  private calcNewPos(shift: number, e: MouseEvent): number {
    return this.isVertical()
      ? this.trackView.$track.getBoundingClientRect().bottom - e.clientY - shift
      : e.clientX - shift - this.trackView.$track.getBoundingClientRect().left;
  }

  public setViewOfOneNote(): void {
    if (this.isSmallDistanceBetweenNotes()) {
      this.makeCommonNoteView();
    } else if (this.valueNoteViewCommon) {
      this.removeValueNotesFromAndTo();
    }
  }

  private isSmallDistanceBetweenNotes(): boolean {
    if (this.valueNoteViewFrom) {
      const distAmongNotes: number = this.valueNoteView.getPos() - this.valueNoteViewFrom.getPos();
      return distAmongNotes < this.valueNoteView.getSize();
    }
    return false;
  }

  private makeCommonNoteView(): void {
    if (this.valueNoteViewFrom) {
      this.valueNoteViewFrom.showValueNote(false);
    }
    this.valueNoteView.showValueNote(false);
    if (this.valueNoteViewCommon) {
      this.updateCommonNoteView();
    } else {
      this.valueNoteViewCommon = new ValueNoteView(this.$adslider);
      this.valueNoteViewCommon.$note.classList.add('adslider__note_common');
      this.valueNoteViewCommon.setVerticalView(this.isVertical());
      this.updateCommonNoteView();
    }
  }

  private updateCommonNoteView(): void {
    if (this.handlerViewFrom && this.valueNoteViewCommon) {
      const valueTo = this.valueNoteView.getValue();
      let valueFrom: number;
      if (this.valueNoteViewFrom) {
        valueFrom = this.valueNoteViewFrom.getValue();
        this.valueNoteViewCommon.setValueForTwo(valueFrom, valueTo);
      }
      const leftEdgeOfHandlerFrom = this.handlerViewFrom.getPos();
      const rightEdgeOfHandlerTo = this.handlerView.getPos() + this.handlerView.getLength();
      const distAmongEdgesOfHandlers = rightEdgeOfHandlerTo - leftEdgeOfHandlerFrom;
      this.valueNoteViewCommon.valueNotePos = leftEdgeOfHandlerFrom + distAmongEdgesOfHandlers / 2;
      this.valueNoteViewCommon.setPos();
    }
  }

  private removeValueNotesFromAndTo(): void {
    if (this.valueNoteViewFrom && this.valueNoteViewCommon) {
      this.valueNoteView.showValueNote(true);
      this.valueNoteViewFrom.showValueNote(true);
      this.valueNoteViewCommon.$note.remove();
      delete this.valueNoteViewCommon;
    }
  }

  private handleSetBar = (data: { $handler: HTMLElement, vertical: boolean, double: boolean }): void => {
    if (!data.double) {
      this.barView.setLength(data);
    } else if (this.handlerViewFrom) {
      const options = {
        valueFrom: this.handlerViewFrom.getPos(),
        valueTo: this.handlerView.getPos(),
        handler: data.$handler,
      };
      this.barView.setLengthForDouble(options);
    }
  }

  private addObservers(): void {
    this.handlerView.addObserver('handlerMousedownEvent', this.handleMouseDown);
    this.handlerView.addObserver('handlerMousemoveEvent', this.mouseMove);
    if (this.handlerViewFrom) {
      this.handlerViewFrom.addObserver('handlerMousedownEvent', this.handleMouseDown);
      this.handlerViewFrom.addObserver('handlerMousemoveEvent', this.mouseMove);
    }
    this.trackView.addObserver('handlerMousedownEvent', this.handleChangePos);
    this.barView.addObserver('handlerMousedownEvent', this.handleChangePos);
    this.scaleView.addObserver('handlerMousedownEvent', this.handleChangePos);
    this.handlerView.addObserver('calcValueNotePos', this.handleCalcValueNotePos);
    this.handlerView.addObserver('setValueNotePos', this.handleSetValueNotePos);
    this.handlerView.addObserver('setBar', this.handleSetBar);
  }

  private updateObservers(): void {
    if (this.handlerViewFrom && this.valueNoteViewFrom) {
      this.handlerViewFrom.addObserver('calcValueNotePos', this.handleCalcValueNoteFromPos);
      this.handlerViewFrom.addObserver('setValueNotePos', this.handleSetValueNoteFromPos);
      this.handlerViewFrom.addObserver('setBar', this.handleSetBar);
    }
  }

  private handleSetValueNoteFromPos = () => {
    if (this.valueNoteViewFrom) this.valueNoteViewFrom.setPos();
  }

  private handleCalcValueNoteFromPos = (handler: HTMLElement) => {
    if (this.valueNoteViewFrom) this.valueNoteViewFrom.calcPos(handler);
  }

  private handleSetValueNotePos = () => {
    this.valueNoteView.setPos();
  }

  private handleCalcValueNotePos = (handler: HTMLElement) => {
    this.valueNoteView.calcPos(handler);
  }

  public calcPos(options: {
    value: number,
    limits: { min: number; max: number },
    isFrom: boolean,
  }): void {
    if (this.handlerViewFrom && this.valueNoteViewFrom) {
      const data = { edge: this.getEdge(this.handlerViewFrom), value: options.value, limits: options.limits };
      if (options.isFrom) {
        this.handlerViewFrom.calcPos(data);
        this.valueNoteViewFrom.setValue(options.value);
      } else {
        this.handlerView.calcPos(data);
        this.valueNoteView.setValue(options.value);
      }
    } else {
      const data = { edge: this.getEdge(this.handlerView), value: options.value, limits: options.limits };
      this.handlerView.calcPos(data);
      this.valueNoteView.setValue(options.value);
    }
  }

  public setPos(options: {
    isDouble: boolean,
    isFrom: boolean
  }): void {
    if (this.handlerViewFrom) {
      if (options.isFrom) {
        this.handlerViewFrom.setPos(options.isDouble);
      } else {
        this.handlerView.setPos(options.isDouble);
      }
      this.setViewOfOneNote();
    } else {
      this.handlerView.setPos(options.isDouble);
    }
  }
}

export default View;
