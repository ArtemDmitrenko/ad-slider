import HandlerView from './HandlerView/HandlerView';
import TrackView from './TrackView/TrackView';
import ValueNoteView from './ValueNoteView/ValueNoteView';
import EventObserver from '../EventObserver/EventObserver';
import EventTypes from '../EventObserver/eventTypes';

class View extends EventObserver {
  private el!: HTMLElement | null;

  private handlerView!: HandlerView;

  private handlerViewFrom?: HandlerView;

  private valueNoteViewFrom?: ValueNoteView;

  private valueNoteViewCommon?: ValueNoteView;

  private trackView!: TrackView;

  private valueNoteView!: ValueNoteView;

  private adslider!: HTMLElement;

  private handlerShift!: number;

  private areHandlersInOnePoint!: boolean;

  private mousedownClientX!: number;

  private mousedownClientY!: number;

  private leadHandler!: HandlerView;

  private isHandlerTo!: boolean;

  private isHandlerFrom!: boolean;

  constructor(container: HTMLElement) {
    super();
    this.render(container);
    this.addObservers();
  }

  public updateView(options: {
    vertical: boolean;
    limits: { max: number; min: number };
    showValueNote: boolean;
    double: boolean;
    from?: number | null;
    to: number;
    step: number;
  }): void {
    const {
      vertical, limits, showValueNote, double, from, to,
    } = options;
    this.setVerticalViewForSingle(vertical);
    this.handlerView.calcPos({
      edge: this.getEdge(this.handlerView),
      value: to,
      limits,
    });
    this.handlerView.setPos(double);
    this.valueNoteView.setValue(to);
    this.valueNoteView.showValueNote(showValueNote);
    this.trackView.drawScale(options, this.handlerView.handler);
    if (double) {
      this.updateViewForDouble(
        vertical,
        from,
        limits,
        showValueNote,
      );
    } else if (this.handlerViewFrom) {
      this.deleteHandlerFrom();
      this.deleteValueNoteViewCommon();
    }
  }

  public calcPos(options: {
    value: number,
    limits: { min: number; max: number },
    isFrom: boolean,
  }): void {
    const { value, limits, isFrom } = options;
    if (this.handlerViewFrom && this.valueNoteViewFrom) {
      const data = {
        edge: this.getEdge(this.handlerViewFrom),
        value,
        limits,
      };
      if (isFrom) {
        this.handlerViewFrom.calcPos(data);
        this.valueNoteViewFrom.setValue(value);
      } else {
        this.handlerView.calcPos(data);
        this.valueNoteView.setValue(value);
      }
    } else {
      const data = {
        edge: this.getEdge(this.handlerView),
        value,
        limits,
      };
      this.handlerView.calcPos(data);
      this.valueNoteView.setValue(value);
    }
  }

  public setPos(options: {
    isDouble: boolean,
    isFrom: boolean,
    showValueNote: boolean
  }): void {
    const { isDouble, isFrom, showValueNote } = options;
    if (this.handlerViewFrom) {
      if (isFrom) {
        this.handlerViewFrom.setPos(isDouble);
      } else {
        this.handlerView.setPos(isDouble);
      }
      this.setViewOfOneNote(showValueNote);
    } else {
      this.handlerView.setPos(isDouble);
    }
  }

  private render(container: HTMLElement): void {
    this.el = container;
    this.adslider = document.createElement('div');
    this.adslider.classList.add('adslider');
    this.el.append(this.adslider);

    this.trackView = new TrackView(this.adslider);
    this.handlerView = new HandlerView(this.trackView.track);
    this.valueNoteView = new ValueNoteView(this.adslider);

    this.handlerViewFrom = new HandlerView(this.trackView.track);
    this.handlerViewFrom.handler.classList.add('adslider__handler_type_from');
    this.valueNoteViewFrom = new ValueNoteView(this.adslider);
    this.valueNoteViewFrom.note.classList.add('adslider__note_type_from');
    this.valueNoteView.note.classList.add('adslider__note_type_to');
  }

  private deleteHandlerFrom(): void {
    if (this.handlerViewFrom && this.valueNoteViewFrom) {
      this.handlerViewFrom.handler.remove();
      this.valueNoteViewFrom.note.remove();
      delete this.handlerViewFrom;
      delete this.valueNoteViewFrom;
    }
  }

  private deleteValueNoteViewCommon(): void {
    if (this.valueNoteViewCommon) {
      this.valueNoteViewCommon.note.remove();
      delete this.valueNoteViewCommon;
    }
  }

  private updateViewForDouble(
    vertical: boolean,
    from: number | null | undefined,
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
      this.valueNoteViewFrom.calcPos(this.handlerViewFrom.handler);
      this.valueNoteViewFrom.setPos();
      this.valueNoteViewFrom.setValue(from);
      this.valueNoteViewFrom.showValueNote(showValueNote);
      this.trackView.setBarLengthForDouble({
        valueFrom: this.handlerViewFrom.getPos(),
        valueTo: this.handlerView.getPos(),
        handler: this.handlerView.handler,
      });
    }
    this.setViewOfOneNote(showValueNote);
  }

  private renderHandlerFrom(): void {
    this.handlerViewFrom = new HandlerView(this.trackView.track);
    this.handlerViewFrom.handler.classList.add('adslider__handler_type_from');
    this.valueNoteViewFrom = new ValueNoteView(this.adslider);
    this.valueNoteViewFrom.note.classList.add('adslider__note_type_from');
    this.handlerViewFrom.addObserver(EventTypes.HANDLER_MOUSEDOWN_EVENT, this.handleMouseDown);
    this.handlerViewFrom.addObserver(EventTypes.HANDLER_MOUSEMOVE_EVENT, this.mouseMove);
  }

  private handleChangePos = (e: MouseEvent): void => {
    if (this.isDouble()) {
      if (
        this.handlerView.handler.classList.contains(
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
      const handlerFromPos = this.handlerViewFrom.handler.getBoundingClientRect().top;
      const handlerToPos = this.handlerView.handler.getBoundingClientRect().top;
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
      const handlerFromPos = this.handlerViewFrom.handler.getBoundingClientRect().left;
      const handlerToPos = this.handlerView.handler.getBoundingClientRect().left;
      const oddToFrom: number = handlerToPos - handlerFromPos;
      const middlePos = oddToFrom / 2 + handlerFromPos + this.handlerView.getLength() / 2;
      this.checkIfHandlersInOnePlace(e);
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
      this.adslider.classList.remove('adslider_direction_horizontal');
      this.adslider.classList.add('adslider_direction_vertical');
    } else {
      this.adslider.classList.remove('adslider_direction_vertical');
      this.adslider.classList.add('adslider_direction_horizontal');
    }
    this.trackView.setVerticalView(vertical);
    this.handlerView.setVerticalView(vertical);
    this.valueNoteView.setVerticalView(vertical);
  }

  private setVerticalViewForDouble(vertical: boolean): void {
    if (this.handlerViewFrom && this.valueNoteViewFrom) {
      this.handlerViewFrom.setVerticalView(vertical);
      this.valueNoteViewFrom.setVerticalView(vertical);
    }
  }

  private checkIfHandlersInOnePlace(event: MouseEvent): void {
    if (this.handlerViewFrom) {
      if (this.isVertical()) {
        if (this.handlerView.handler.style.bottom === this.handlerViewFrom.handler.style.bottom) {
          this.areHandlersInOnePoint = true;
          this.mousedownClientY = event.clientY;
          this.isHandlerFrom = false;
          this.isHandlerTo = false;
        } else {
          this.areHandlersInOnePoint = false;
        }
      } else if (this.handlerView.handler.style.left === this.handlerViewFrom.handler.style.left) {
        this.areHandlersInOnePoint = true;
        this.mousedownClientX = event.clientX;
        this.isHandlerFrom = false;
        this.isHandlerTo = false;
      } else {
        this.areHandlersInOnePoint = false;
      }
    } else {
      this.areHandlersInOnePoint = false;
    }
  }

  private handleMouseDown = (data: { event: MouseEvent; handler: HTMLElement }): void => {
    const { event, handler } = data;
    this.calcShift(event, handler);
    this.checkIfHandlersInOnePlace(event);
  }

  private mouseMove = (data: {
    shift: number,
    e: MouseEvent,
    handler: HandlerView
  }): void => {
    const { shift, e, handler } = data;
    if (this.areHandlersInOnePoint) {
      this.findLeadHandler(e, handler);
    } else {
      this.leadHandler = handler;
    }
    let newPos;
    if (e.type === 'mousedown') {
      newPos = this.calcNewPos(shift, e);
    } else {
      newPos = this.calcNewPos(this.handlerShift, e);
    }
    const edge: number = this.getEdge(this.leadHandler);
    newPos = this.checkNewPos(newPos);
    const isFrom = this.leadHandler.handler.classList.contains('adslider__handler_type_from');
    const relPosition = newPos / edge;
    const options = {
      relPosition, isFrom,
    };
    this.broadcast(EventTypes.CHANGE_POSITION, options);
  }

  private findLeadHandler(e: MouseEvent, handler: HandlerView): void {
    let isValueDecrease;
    let isValueIncrease;
    if (this.isVertical()) {
      isValueIncrease = e.clientY < this.mousedownClientY;
      isValueDecrease = e.clientY > this.mousedownClientY;
    } else {
      isValueIncrease = e.clientX > this.mousedownClientX;
      isValueDecrease = e.clientX < this.mousedownClientX;
    }
    if (isValueIncrease) {
      const isHandlerFromLeader = !this.isHandlerTo && this.isHandlerFrom;
      if (isHandlerFromLeader && this.handlerViewFrom) {
        this.leadHandler = this.handlerViewFrom;
      } else {
        this.leadHandler = this.handlerView;
        this.isHandlerTo = true;
        this.isHandlerFrom = false;
      }
    } else if (isValueDecrease) {
      if (this.isHandlerTo && !this.isHandlerFrom) {
        this.leadHandler = this.handlerView;
      } else if (this.handlerViewFrom) {
        this.leadHandler = this.handlerViewFrom;
        this.isHandlerFrom = true;
        this.isHandlerTo = false;
      }
    } else {
      this.leadHandler = handler;
    }
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
    return this.adslider.classList.contains('adslider_direction_vertical');
  }

  private isDouble(): boolean {
    return (!!this.handlerViewFrom);
  }

  private calcNewPos(shift: number, e: MouseEvent): number {
    return this.isVertical()
      ? this.trackView.track.getBoundingClientRect().bottom - e.clientY - shift
      : e.clientX - shift - this.trackView.track.getBoundingClientRect().left;
  }

  private setViewOfOneNote(showValueNote: boolean): void {
    if (this.isSmallDistanceBetweenNotes()) {
      this.makeCommonNoteView();
      this.showCommonValueNote(showValueNote);
    } else if (this.valueNoteViewCommon) {
      this.removeCommonNoteView();
      this.valueNoteView.showValueNote(showValueNote);
      if (this.valueNoteViewFrom) {
        this.valueNoteViewFrom.showValueNote(showValueNote);
      }
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
      this.valueNoteViewCommon = new ValueNoteView(this.adslider);
      this.valueNoteViewCommon.note.classList.add('adslider__note_common');
      this.valueNoteViewCommon.setVerticalView(this.isVertical());
      this.updateCommonNoteView();
    }
  }

  private showCommonValueNote(data: boolean): void {
    if (data && this.valueNoteViewCommon) {
      this.valueNoteViewCommon.note.classList.remove('adslider__note_hide');
      this.valueNoteViewCommon.note.classList.add('adslider__note_show');
    } else if (this.valueNoteViewCommon) {
      this.valueNoteViewCommon.note.classList.remove('adslider__note_show');
      this.valueNoteViewCommon.note.classList.add('adslider__note_hide');
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

  private removeCommonNoteView(): void {
    if (this.valueNoteViewFrom && this.valueNoteViewCommon) {
      this.valueNoteView.showValueNote(true);
      this.valueNoteViewFrom.showValueNote(true);
      this.valueNoteViewCommon.note.remove();
      delete this.valueNoteViewCommon;
    }
  }

  private handleSetBar = (data: {
    handler: HTMLElement,
    vertical: boolean,
    double: boolean
  }): void => {
    if (!data.double) {
      this.trackView.setBarLength(data.handler);
    } else if (this.handlerViewFrom) {
      const options = {
        valueFrom: this.handlerViewFrom.getPos(),
        valueTo: this.handlerView.getPos(),
        handler: data.handler,
      };
      this.trackView.setBarLengthForDouble(options);
    }
  }

  private addObservers(): void {
    this.handlerView.addObserver(EventTypes.HANDLER_MOUSEDOWN_EVENT, this.handleMouseDown);
    this.handlerView.addObserver(EventTypes.HANDLER_MOUSEMOVE_EVENT, this.mouseMove);
    if (this.handlerViewFrom) {
      this.handlerViewFrom.addObserver(EventTypes.HANDLER_MOUSEDOWN_EVENT, this.handleMouseDown);
      this.handlerViewFrom.addObserver(EventTypes.HANDLER_MOUSEMOVE_EVENT, this.mouseMove);
    }
    this.trackView.addObserver(EventTypes.HANDLER_MOUSEDOWN_EVENT, this.handleChangePos);
    // this.barView.addObserver(EventTypes.HANDLER_MOUSEDOWN_EVENT, this.handleChangePos);
    // this.scaleView.addObserver(EventTypes.HANDLER_MOUSEDOWN_EVENT, this.handleChangePos);
    this.handlerView.addObserver(EventTypes.CALC_VALUE_NOTE_POSITION, this.handleCalcValueNotePos);
    this.handlerView.addObserver(EventTypes.SET_VALUE_NOTE_POS, this.handleSetValueNotePos);
    this.handlerView.addObserver(EventTypes.SET_BAR, this.handleSetBar);
  }

  private updateObservers(): void {
    if (this.handlerViewFrom && this.valueNoteViewFrom) {
      if (!Object.prototype.hasOwnProperty.call(this.handlerViewFrom.observers, EventTypes.CALC_VALUE_NOTE_POSITION)) {
        this.handlerViewFrom.addObserver(EventTypes.CALC_VALUE_NOTE_POSITION, this.handleCalcValueNoteFromPos);
        this.handlerViewFrom.addObserver(EventTypes.SET_VALUE_NOTE_POS, this.handleSetValueNoteFromPos);
        this.handlerViewFrom.addObserver(EventTypes.SET_BAR, this.handleSetBar);
      }
    }
  }

  private handleSetValueNoteFromPos = () => {
    if (this.valueNoteViewFrom) {
      this.valueNoteViewFrom.setPos();
    }
  }

  private handleCalcValueNoteFromPos = (handler: HTMLElement) => {
    if (this.valueNoteViewFrom) {
      this.valueNoteViewFrom.calcPos(handler);
    }
  }

  private handleSetValueNotePos = () => {
    this.valueNoteView.setPos();
  }

  private handleCalcValueNotePos = (handler: HTMLElement) => {
    this.valueNoteView.calcPos(handler);
  }
}

export default View;
