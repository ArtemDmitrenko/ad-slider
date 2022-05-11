import EventObserver from '../../EventObserver/EventObserver';
import EventTypes from '../../EventObserver/eventTypes';
import BarView from '../BarView/BarView';
import HandlerView from '../HandlerView/HandlerView';
import ScaleView from '../ScaleView/ScaleView';
import ValueNoteView from '../ValueNoteView/ValueNoteView';

class TrackView extends EventObserver {
  public track!: HTMLElement;

  private barView!: BarView;

  private scaleView!: ScaleView;

  private handlerViewTo!: HandlerView;

  private handlerViewFrom?: HandlerView;

  private valueNoteViewCommon?: ValueNoteView;

  private handlerShift!: number;

  private areHandlersInOnePoint!: boolean;

  private mousedownClientX!: number;

  private mousedownClientY!: number;

  private leadHandler!: HandlerView;

  private isVertical!: boolean;

  constructor(parent: HTMLElement) {
    super();
    this.render(parent);
    this.addListeners();
    this.addObservers();
  }

  public updateTrackView(options: {
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
    this.isVertical = vertical;
    this.handlerViewTo.calcPos({
      edge: this.getEdge(this.handlerViewTo),
      value: to,
      limits,
    });
    this.handlerViewTo.setPos(double, vertical);
    this.handlerViewTo.setValueForNote(to);
    this.handlerViewTo.showValueNote(showValueNote);
    this.scaleView.drawScale(options, this.handlerViewTo.handler);
    if (double) {
      this.updateViewForDouble(
        from,
        limits,
        showValueNote,
      );
    } else if (this.handlerViewFrom) {
      this.deleteHandlerFrom();
      this.deleteValueNoteViewCommon();
    }
  }

  public calcHandlerPos(options: {
    value: number,
    limits: { min: number; max: number },
    isFromValueChanging: boolean,
  }): void {
    const { value, limits, isFromValueChanging } = options;
    const data = {
      edge: isFromValueChanging && this.handlerViewFrom
        ? this.getEdge(this.handlerViewFrom)
        : this.getEdge(this.handlerViewTo),
      value,
      limits,
    };
    if (isFromValueChanging && this.handlerViewFrom) {
      this.handlerViewFrom.calcPos(data);
      this.handlerViewFrom.setValueForNote(value);
    } else {
      this.handlerViewTo.calcPos(data);
      this.handlerViewTo.setValueForNote(value);
    }
  }

  public setHandlerPos(options: {
    isDouble: boolean,
    isFromValueChanging: boolean,
    showValueNote: boolean,
  }): void {
    const { isDouble, isFromValueChanging, showValueNote } = options;
    if (isFromValueChanging && this.handlerViewFrom) {
      this.handlerViewFrom.setPos(isDouble, this.isVertical);
    } else {
      this.handlerViewTo.setPos(isDouble, this.isVertical);
    }
    this.setViewOfOneNote(showValueNote, this.isVertical);
  }

  private getLength(): number {
    return this.isVertical
      ? parseInt(getComputedStyle(this.track).height, 10)
      : parseInt(getComputedStyle(this.track).width, 10);
  }

  private render(parent: HTMLElement): void {
    this.track = document.createElement('div');
    this.track.classList.add('adslider__track');
    this.barView = new BarView(this.track);
    this.scaleView = new ScaleView(this.track);
    this.handlerViewTo = new HandlerView(this.track);
    this.handlerViewFrom = new HandlerView(this.track);
    parent.append(this.track);
  }

  private addListeners(): void {
    this.track.addEventListener('mousedown', this.handleTrackMouseDown);
  }

  private handleTrackMouseDown = (event: MouseEvent): void => {
    this.broadcast(EventTypes.HANDLER_MOUSEDOWN_EVENT, event);
  }

  private addObservers(): void {
    this.handlerViewTo.addObserver(EventTypes.HANDLER_MOUSEDOWN_EVENT, this.handleMouseDown);
    this.handlerViewTo.addObserver(EventTypes.HANDLER_MOUSEMOVE_EVENT, this.mouseMove);
    if (this.handlerViewFrom) {
      this.handlerViewFrom.addObserver(EventTypes.HANDLER_MOUSEDOWN_EVENT, this.handleMouseDown);
      this.handlerViewFrom.addObserver(EventTypes.HANDLER_MOUSEMOVE_EVENT, this.mouseMove);
    }
    this.handlerViewTo.addObserver(EventTypes.SET_BAR, this.handleSetBar);
    this.addObserver(EventTypes.HANDLER_MOUSEDOWN_EVENT, this.handleChangePos);
  }

  private handleMouseDown = (data: { event: MouseEvent; handler: HTMLElement }): void => {
    const { event, handler } = data;
    this.calcShift(event, handler);
    this.checkIfHandlersInOnePlace(event);
  }

  private calcShift(e: MouseEvent, handler: HTMLElement): void {
    const shift = this.isVertical
      ? e.clientY - handler.getBoundingClientRect().bottom
      : e.clientX - handler.getBoundingClientRect().left;
    this.handlerShift = Math.abs(shift);
  }

  private areHandlersInOnePlace(): boolean {
    if (this.handlerViewFrom) {
      if (this.isVertical) {
        return this.handlerViewTo.handler.style.bottom
          === this.handlerViewFrom.handler.style.bottom;
      }
      return this.handlerViewTo.handler.style.left
        === this.handlerViewFrom.handler.style.left;
    }
    return false;
  }

  private setProperties(event: MouseEvent): void {
    this.areHandlersInOnePoint = true;
    this.mousedownClientY = event.clientY;
    this.mousedownClientX = event.clientX;
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
    const newPos = e.type === 'mousedown' ? this.calcNewPos(shift, e) : this.calcNewPos(this.handlerShift, e);
    const edge: number = this.getEdge(this.leadHandler);
    const checkedNewPos = this.checkNewPos(newPos);
    const relPosition = checkedNewPos / edge;
    const isFromValueChanging = this.leadHandler === this.handlerViewFrom;
    const options = {
      relPosition, isFromValueChanging,
    };
    this.broadcast(EventTypes.CHANGE_POSITION, options);
  }

  private findLeadHandler(e: MouseEvent, handler: HandlerView): void {
    const isValueDecrease = this.isVertical
      ? e.clientY > this.mousedownClientY
      : e.clientX < this.mousedownClientX;
    const isValueIncrease = this.isVertical
      ? e.clientY < this.mousedownClientY
      : e.clientX > this.mousedownClientX;
    if (isValueIncrease) {
      this.leadHandler = this.handlerViewTo;
    } else if (isValueDecrease && this.handlerViewFrom) {
      this.leadHandler = this.handlerViewFrom;
    } else {
      this.leadHandler = handler;
    }
  }

  private calcNewPos(shift: number, e: MouseEvent): number {
    return this.isVertical
      ? this.track.getBoundingClientRect().bottom - e.clientY - shift
      : e.clientX - shift - this.track.getBoundingClientRect().left;
  }

  private getEdge(handler: HandlerView): number {
    return this.getLength() - handler.getLength(this.isVertical);
  }

  private checkNewPos(newPos: number): number {
    const edge = this.getEdge(this.handlerViewTo);
    if (newPos < 0) {
      return 0;
    }
    if (newPos > edge) {
      return edge;
    }
    return newPos;
  }

  private handleSetBar = (data: {
    handler: HTMLElement,
    vertical: boolean,
    double: boolean
  }): void => {
    const { handler, vertical, double } = data;
    if (!double) {
      this.barView.setLength(handler, vertical);
    } else if (this.handlerViewFrom) {
      const options = {
        valueFrom: this.handlerViewFrom.getPos(this.isVertical),
        valueTo: this.handlerViewTo.getPos(this.isVertical),
        handler,
        vertical: this.isVertical,
      };
      this.barView.setLengthForDouble(options);
    }
  }

  private updateViewForDouble(
    from: number | null | undefined,
    limits: { max: number; min: number },
    showValueNote: boolean,
  ): void {
    if (!this.handlerViewFrom) {
      this.renderHandlerFrom();
    }
    this.updateObservers();
    if (this.handlerViewFrom) {
      this.handlerViewFrom.calcPos({
        edge: this.getEdge(this.handlerViewFrom),
        value: from,
        limits,
      });
      this.handlerViewFrom.setPos(true, this.isVertical);
      this.handlerViewFrom.setValueForNote(from);
      this.handlerViewFrom.showValueNote(showValueNote);
      this.barView.setLengthForDouble({
        valueFrom: this.handlerViewFrom.getPos(this.isVertical),
        valueTo: this.handlerViewTo.getPos(this.isVertical),
        handler: this.handlerViewTo.handler,
        vertical: this.isVertical,
      });
    }
    this.setViewOfOneNote(showValueNote, this.isVertical);
  }

  private renderHandlerFrom(): void {
    this.handlerViewFrom = new HandlerView(this.track);
    this.handlerViewFrom.addObserver(EventTypes.HANDLER_MOUSEDOWN_EVENT, this.handleMouseDown);
    this.handlerViewFrom.addObserver(EventTypes.HANDLER_MOUSEMOVE_EVENT, this.mouseMove);
  }

  private updateObservers(): void {
    if (this.handlerViewFrom) {
      if (!Object.prototype.hasOwnProperty.call(
        this.handlerViewFrom.observers, EventTypes.SET_BAR,
      )) {
        this.handlerViewFrom.addObserver(EventTypes.SET_BAR, this.handleSetBar);
      }
    }
  }

  private deleteHandlerFrom(): void {
    if (this.handlerViewFrom) {
      this.handlerViewFrom.deleteInstance();
      delete this.handlerViewFrom;
    }
  }

  private deleteValueNoteViewCommon(): void {
    if (this.valueNoteViewCommon) {
      this.valueNoteViewCommon.noteElement.remove();
      delete this.valueNoteViewCommon;
    }
  }

  private setViewOfOneNote(showValueNote: boolean, vertical: boolean): void {
    if (this.isSmallDistanceBetweenNotes(vertical)) {
      this.makeCommonNoteView(vertical);
      this.showCommonValueNote(showValueNote);
    } else if (this.valueNoteViewCommon) {
      this.removeCommonNoteView();
      this.handlerViewTo.showValueNote(showValueNote);
      if (this.handlerViewFrom) {
        this.handlerViewFrom.showValueNote(showValueNote);
      }
    }
  }

  private isSmallDistanceBetweenNotes(vertical: boolean): boolean {
    if (this.handlerViewFrom) {
      const distAmongNotes: number = this.handlerViewTo.getValueNotePos(vertical)
        - this.handlerViewFrom.getValueNotePos(vertical);
      return distAmongNotes < this.handlerViewTo.getValueNoteSize(vertical);
    }
    return false;
  }

  private makeCommonNoteView(vertical: boolean): void {
    if (this.handlerViewFrom) {
      this.handlerViewFrom.showValueNote(false);
    }
    this.handlerViewTo.showValueNote(false);
    if (this.valueNoteViewCommon) {
      this.updateCommonNoteView(vertical);
    } else {
      this.valueNoteViewCommon = new ValueNoteView(this.track);
      this.valueNoteViewCommon.noteElement.classList.add('adslider__note_common');
      this.updateCommonNoteView(vertical);
    }
  }

  private showCommonValueNote(data: boolean): void {
    if (data && this.valueNoteViewCommon) {
      this.valueNoteViewCommon.noteElement.classList.remove('adslider__note_hide');
      this.valueNoteViewCommon.noteElement.classList.add('adslider__note_show');
    } else if (this.valueNoteViewCommon) {
      this.valueNoteViewCommon.noteElement.classList.remove('adslider__note_show');
      this.valueNoteViewCommon.noteElement.classList.add('adslider__note_hide');
    }
  }

  private updateCommonNoteView(vertical: boolean): void {
    if (this.handlerViewFrom && this.valueNoteViewCommon) {
      const valueTo = this.handlerViewTo.getValueOfNote();
      const valueFrom = this.handlerViewFrom.getValueOfNote();
      this.valueNoteViewCommon.setValueForTwo(valueFrom, valueTo);
      const edgeOfHandlerFrom = this.handlerViewFrom.getPos(vertical);
      const edgeOfHandlerTo = this.handlerViewTo.getPos(vertical) + this.handlerViewTo.getLength(vertical);
      const distAmongEdgesOfHandlers = edgeOfHandlerTo - edgeOfHandlerFrom;
      this.valueNoteViewCommon.setPos(edgeOfHandlerFrom + distAmongEdgesOfHandlers / 2, vertical);
    }
  }

  private removeCommonNoteView(): void {
    if (this.handlerViewFrom && this.valueNoteViewCommon) {
      this.handlerViewTo.showValueNote(true);
      this.handlerViewFrom.showValueNote(true);
      this.valueNoteViewCommon.noteElement.remove();
      delete this.valueNoteViewCommon;
    }
  }

  private handleChangePos = (e: MouseEvent): void => {
    if (this.isDouble()) {
      this.changeHandlerPosForDouble(e);
    } else {
      const data = {
        shift: this.handlerViewTo.getLength(this.isVertical) / 2,
        e,
        handler: this.handlerViewTo,
      };
      this.mouseMove(data);
    }
  }

  private changeHandlerPosForDouble(e: MouseEvent): void {
    if (this.handlerViewFrom) {
      const handlerFromPos = this.isVertical
        ? this.handlerViewFrom.handler.getBoundingClientRect().top
        : this.handlerViewFrom.handler.getBoundingClientRect().left;
      const handlerToPos = this.isVertical
        ? this.handlerViewTo.handler.getBoundingClientRect().top
        : this.handlerViewTo.handler.getBoundingClientRect().left;
      const oddToFrom: number = handlerToPos - handlerFromPos;
      const middlePos = oddToFrom / 2 + handlerFromPos + this.handlerViewTo.getLength(this.isVertical) / 2;
      this.checkIfHandlersInOnePlace(e);
      const isHandlerFromChanging = e.clientX <= middlePos || e.clientY >= middlePos;
      const data = {
        shift: isHandlerFromChanging
          ? this.handlerViewFrom.getLength(this.isVertical) / 2
          : this.handlerViewTo.getLength(this.isVertical) / 2,
        e,
        handler: isHandlerFromChanging
          ? this.handlerViewFrom
          : this.handlerViewTo,
      };
      this.mouseMove(data);
    }
  }

  private checkIfHandlersInOnePlace(event: MouseEvent): void {
    if (this.areHandlersInOnePlace()) {
      this.setProperties(event);
    } else {
      this.areHandlersInOnePoint = false;
    }
  }

  private isDouble(): boolean {
    return (!!this.handlerViewFrom);
  }
}

export default TrackView;
