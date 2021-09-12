import HandlerView from './handlerView/handlerView';
import TrackView from './trackView/trackView';
import ValueNoteView from './valueNoteView/valueNoteView';
import BarView from './barView/barView';
import ScaleView from './scaleView/scaleView';
import EventObserver from '../eventObserver/eventObserver';

class View extends EventObserver {
  public $el!: HTMLElement | null;

  public handlerView!: HandlerView;

  public handlerViewFrom!: HandlerView;

  public valueNoteViewFrom!: ValueNoteView;

  public valueNoteViewTo!: ValueNoteView;

  public valueNoteViewCommon!: ValueNoteView;

  public trackView!: TrackView;

  public valueNoteView!: ValueNoteView;

  public barView!: BarView;

  public scaleView!: ScaleView;

  private $adslider!: HTMLElement;

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
    this.handlerViewFrom.$handler.classList.add('adslider__handler_from');
    this.valueNoteViewFrom = new ValueNoteView(this.$adslider);
    this.valueNoteViewFrom.$note.classList.add('adslider__note_from');
    this.valueNoteView.$note.classList.add('adslider__note_to');
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
    this.handlerView.setPos();
    this.valueNoteView.calcPos(this.handlerView.$handler);
    this.valueNoteView.setPos();
    this.valueNoteView.setValue(options.curValue);
    this.valueNoteView.showValueNote(options.showValueNote);
    this.scaleView.drawScale(options, this.handlerView.$handler);
    if (options.double) {
      this.updateViewForDouble(
        options.vertical,
        options.from,
        options.to,
        options.curValue,
        options.limits,
        options.showValueNote,
      );
    } else {
      if (this.handlerViewFrom) {
        this.deleteHandlerFrom();
      }
      this.barView.setLength(this.handlerView.$handler);
    }
  }

  private deleteHandlerFrom(): void {
    this.handlerViewFrom.$handler.remove();
    this.valueNoteViewFrom.$note.remove();
    delete this.handlerViewFrom;
    delete this.valueNoteViewFrom;
  }

  private updateViewForDouble(
    vertical: boolean,
    from: number,
    to: number,
    curValue: number,
    limits: { max: number; min: number },
    showValueNote: boolean,
  ): void {
    if (!this.handlerViewFrom) {
      this.renderHandlerFrom();
    }
    this.setVerticalViewForDouble(vertical);
    this.handlerViewFrom.calcPos({
      edge: this.getEdge(this.handlerViewFrom),
      value: from,
      limits,
    });
    this.handlerViewFrom.setPos();
    this.valueNoteViewFrom.calcPos(this.handlerViewFrom.$handler);
    this.valueNoteViewFrom.setPos();
    this.valueNoteViewFrom.setValue(from);
    this.valueNoteViewFrom.showValueNote(showValueNote);
    this.barView.setLengthForDouble({
      edge: this.getEdge(this.handlerViewFrom),
      valueFrom: from,
      valueTo: curValue,
      limits,
      handler: this.handlerView.$handler,
    });
    const data = { valueFrom: from, valueTo: to };
    this.setViewOfOneNote(data);
  }

  private renderHandlerFrom(): void {
    this.handlerViewFrom = new HandlerView(this.trackView.$track);
    this.handlerViewFrom.$handler.classList.add('adslider__handler_from');
    this.valueNoteViewFrom = new ValueNoteView(this.$adslider);
    this.valueNoteViewFrom.$note.classList.add('adslider__note_from');
    this.handlerViewFrom.addObserver(
      'handlerMousedownEvent',
      this.moveHandler.bind(this),
    );
    this.handlerViewFrom.addObserver(
      'handlerMousemoveEvent',
      this.mouseMove.bind(this),
    );
  }

  private changeHandlerPos(e: MouseEvent): void {
    if (this.isDouble()) {
      if (
        this.handlerView.$handler.classList.contains(
          'adslider__handler_horizontal',
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

  private changeHandlerPosForDoubleHorizontal(e: MouseEvent): void {
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

  private moveHandler(data: { event: MouseEvent; handler: HTMLElement }): void {
    this.calcShift(data.event, data.handler);
  }

  private mouseMove(data: {
    shift: number;
    e: MouseEvent;
    handler: HandlerView;
  }): void {
    let newPos;
    if (data.e.type === 'mousedown') {
      newPos = this.calcNewPos(data.shift, data.e);
    } else {
      newPos = this.calcNewPos(this.handlerShift, data.e);
    }
    const edge: number = this.getEdge(data.handler);
    newPos = this.checkNewPos(newPos);
    const options = { newPos, edge, handler: data.handler.$handler };
    this.broadcast('handlerMove', options);
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
    return this.$adslider.classList.contains('adslider_vertical');
  }

  private isDouble(): boolean {
    if (this.handlerViewFrom) {
      return true;
    }
    return false;
  }

  private calcNewPos(shift: number, e: MouseEvent): number {
    return this.isVertical()
      ? this.trackView.$track.getBoundingClientRect().bottom - e.clientY - shift
      : e.clientX - shift - this.trackView.$track.getBoundingClientRect().left;
  }

  public setViewOfOneNote(options: {
    valueFrom: number;
    valueTo: number;
  }): void {
    if (this.isSmallDistanceBetweenNotes()) {
      this.makeCommonNoteView(options.valueFrom, options.valueTo);
    } else if (this.valueNoteViewCommon) {
      this.removeValueNotesFromAndTo();
    }
  }

  private isSmallDistanceBetweenNotes(): boolean {
    const distBetweenNotes: number = this.valueNoteView.getPos() - this.valueNoteViewFrom.getPos();
    if (distBetweenNotes < this.valueNoteView.getSize() + 3) {
      return true;
    }
    return false;
  }

  private makeCommonNoteView(valueFrom: number, valueTo: number): void {
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
    delete this.valueNoteViewCommon;
  }

  private addObservers(): void {
    this.handlerView.addObserver(
      'handlerMousedownEvent',
      this.moveHandler.bind(this),
    );
    this.handlerViewFrom.addObserver(
      'handlerMousedownEvent',
      this.moveHandler.bind(this),
    );
    this.handlerView.addObserver(
      'handlerMousemoveEvent',
      this.mouseMove.bind(this),
    );
    this.handlerViewFrom.addObserver(
      'handlerMousemoveEvent',
      this.mouseMove.bind(this),
    );
    this.trackView.addObserver(
      'handlerMousedownEvent',
      this.changeHandlerPos.bind(this),
    );
    this.barView.addObserver(
      'handlerMousedownEvent',
      this.changeHandlerPos.bind(this),
    );
    this.scaleView.addObserver(
      'handlerMousedownEvent',
      this.changeHandlerPos.bind(this),
    );
  }
}

export default View;
