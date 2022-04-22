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

  private isHandlerTo!: boolean;

  private isHandlerFrom!: boolean;

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
    this.handlerViewTo.calcPos({
      edge: this.getEdge(this.handlerViewTo),
      value: to,
      limits,
    });
    this.handlerViewTo.setPos(double);
    this.handlerViewTo.setValueForNote(to);
    this.handlerViewTo.showValueNote(showValueNote);
    this.scaleView.drawScale(options, this.handlerViewTo.handler);
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
    showValueNote: boolean
  }): void {
    const { isDouble, isFromValueChanging, showValueNote } = options;
    if (isFromValueChanging && this.handlerViewFrom) {
      this.handlerViewFrom.setPos(isDouble);
    } else {
      this.handlerViewTo.setPos(isDouble);
    }
    this.setViewOfOneNote(showValueNote);
  }

  public getLength(): number {
    return this.isVertical()
      ? parseInt(getComputedStyle(this.track).height, 10)
      : parseInt(getComputedStyle(this.track).width, 10);
  }

  public setVerticalView(verticalView: boolean): void {
    if (verticalView) {
      this.track.classList.remove('adslider__track_direction_horizontal');
      this.track.classList.add('adslider__track_direction_vertical');
    } else {
      this.track.classList.remove('adslider__track_direction_vertical');
      this.track.classList.add('adslider__track_direction_horizontal');
    }
    this.barView.setVerticalView(verticalView);
    this.handlerViewTo.setVerticalView(verticalView);
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
    const shift = this.isVertical()
      ? e.clientY - handler.getBoundingClientRect().bottom
      : e.clientX - handler.getBoundingClientRect().left;
    this.handlerShift = Math.abs(shift);
  }

  private areHandlersInOnePlace(): boolean {
    if (this.handlerViewFrom) {
      if (this.isVertical()) {
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
    this.isHandlerFrom = false;
    this.isHandlerTo = false;
    this.mousedownClientY = event.clientY;
    this.mousedownClientX = event.clientX;
  }

  private isVertical(): boolean {
    return this.track.classList.contains('adslider__track_direction_vertical');
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
    const isValueDecrease = this.isVertical()
      ? e.clientY > this.mousedownClientY
      : e.clientX < this.mousedownClientX;
    const isValueIncrease = this.isVertical()
      ? e.clientY < this.mousedownClientY
      : e.clientX > this.mousedownClientX;
    if (isValueIncrease) {
      const isHandlerFromLeader = !this.isHandlerTo && this.isHandlerFrom;
      if (isHandlerFromLeader && this.handlerViewFrom) {
        this.leadHandler = this.handlerViewFrom;
      } else {
        this.leadHandler = this.handlerViewTo;
        this.isHandlerTo = true;
        this.isHandlerFrom = false;
      }
    } else if (isValueDecrease) {
      if (this.isHandlerTo && !this.isHandlerFrom) {
        this.leadHandler = this.handlerViewTo;
      } else if (this.handlerViewFrom) {
        this.leadHandler = this.handlerViewFrom;
        this.isHandlerFrom = true;
        this.isHandlerTo = false;
      }
    } else {
      this.leadHandler = handler;
    }
  }

  private calcNewPos(shift: number, e: MouseEvent): number {
    return this.isVertical()
      ? this.track.getBoundingClientRect().bottom - e.clientY - shift
      : e.clientX - shift - this.track.getBoundingClientRect().left;
  }

  private getEdge(handler: HandlerView): number {
    return this.getLength() - handler.getLength();
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
    if (!data.double) {
      this.barView.setLength(data.handler);
    } else if (this.handlerViewFrom) {
      const options = {
        valueFrom: this.handlerViewFrom.getPos(),
        valueTo: this.handlerViewTo.getPos(),
        handler: data.handler,
      };
      this.barView.setLengthForDouble(options);
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
    if (this.handlerViewFrom) {
      this.handlerViewFrom.calcPos({
        edge: this.getEdge(this.handlerViewFrom),
        value: from,
        limits,
      });
      this.handlerViewFrom.setPos(true);
      this.handlerViewFrom.setValueForNote(from);
      this.handlerViewFrom.showValueNote(showValueNote);
      this.barView.setLengthForDouble({
        valueFrom: this.handlerViewFrom.getPos(),
        valueTo: this.handlerViewTo.getPos(),
        handler: this.handlerViewTo.handler,
      });
    }
    this.setViewOfOneNote(showValueNote);
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

  private setVerticalViewForDouble(vertical: boolean): void {
    if (this.handlerViewFrom) {
      this.handlerViewFrom.setVerticalView(vertical);
    }
  }

  private setViewOfOneNote(showValueNote: boolean): void {
    if (this.isSmallDistanceBetweenNotes()) {
      this.makeCommonNoteView();
      this.showCommonValueNote(showValueNote);
    } else if (this.valueNoteViewCommon) {
      this.removeCommonNoteView();
      this.handlerViewTo.showValueNote(showValueNote);
      if (this.handlerViewFrom) {
        this.handlerViewFrom.showValueNote(showValueNote);
      }
    }
  }

  private isSmallDistanceBetweenNotes(): boolean {
    if (this.handlerViewFrom) {
      const distAmongNotes: number = this.handlerViewTo.getValueNotePos()
        - this.handlerViewFrom.getValueNotePos();
      return distAmongNotes < this.handlerViewTo.getValueNoteSize();
    }
    return false;
  }

  private makeCommonNoteView(): void {
    if (this.handlerViewFrom) {
      this.handlerViewFrom.showValueNote(false);
    }
    this.handlerViewTo.showValueNote(false);
    if (this.valueNoteViewCommon) {
      this.updateCommonNoteView();
    } else {
      this.valueNoteViewCommon = new ValueNoteView(this.track);
      this.valueNoteViewCommon.noteElement.classList.add('adslider__note_common');
      this.valueNoteViewCommon.setVerticalView(this.isVertical());
      this.updateCommonNoteView();
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

  private updateCommonNoteView(): void {
    if (this.handlerViewFrom && this.valueNoteViewCommon) {
      const valueTo = this.handlerViewTo.getValueOfNote();
      const valueFrom = this.handlerViewFrom.getValueOfNote();
      this.valueNoteViewCommon.setValueForTwo(valueFrom, valueTo);
      const leftEdgeOfHandlerFrom = this.handlerViewFrom.getPos();
      const rightEdgeOfHandlerTo = this.handlerViewTo.getPos() + this.handlerViewTo.getLength();
      const distAmongEdgesOfHandlers = rightEdgeOfHandlerTo - leftEdgeOfHandlerFrom;
      this.valueNoteViewCommon.setPos(leftEdgeOfHandlerFrom + distAmongEdgesOfHandlers / 2);
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
      if (
        this.handlerViewTo.handler.classList.contains(
          'adslider__handler_direction_horizontal',
        )
      ) {
        this.changeHandlerPosForDoubleHorizontal(e);
      } else {
        this.changeHandlerPosForDoubleVertical(e);
      }
    } else {
      const data = {
        shift: this.handlerViewTo.getLength() / 2,
        e,
        handler: this.handlerViewTo,
      };
      this.mouseMove(data);
    }
  }

  private changeHandlerPosForDoubleVertical(e: MouseEvent): void {
    if (this.handlerViewFrom) {
      const handlerFromPos = this.handlerViewFrom.handler.getBoundingClientRect().top;
      const handlerToPos = this.handlerViewTo.handler.getBoundingClientRect().top;
      const oddToFrom: number = handlerToPos - handlerFromPos;
      const middlePos = oddToFrom / 2 + handlerFromPos + this.handlerViewTo.getLength() / 2;
      if (e.clientY >= middlePos) {
        const data = {
          shift: this.handlerViewFrom.getLength() / 2,
          e,
          handler: this.handlerViewFrom,
        };
        this.mouseMove(data);
      } else {
        const data = {
          shift: this.handlerViewTo.getLength() / 2,
          e,
          handler: this.handlerViewTo,
        };
        this.mouseMove(data);
      }
    }
  }

  private checkIfHandlersInOnePlace(event: MouseEvent): void {
    if (this.areHandlersInOnePlace()) {
      this.setProperties(event);
    } else {
      this.areHandlersInOnePoint = false;
    }
  }

  private changeHandlerPosForDoubleHorizontal(e: MouseEvent): void {
    if (this.handlerViewFrom) {
      const handlerFromPos = this.handlerViewFrom.handler.getBoundingClientRect().left;
      const handlerToPos = this.handlerViewTo.handler.getBoundingClientRect().left;
      const oddToFrom: number = handlerToPos - handlerFromPos;
      const middlePos = oddToFrom / 2 + handlerFromPos + this.handlerViewTo.getLength() / 2;
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
          shift: this.handlerViewTo.getLength() / 2,
          e,
          handler: this.handlerViewTo,
        };
        this.mouseMove(data);
      }
    }
  }

  private isDouble(): boolean {
    return (!!this.handlerViewFrom);
  }
}

export default TrackView;
