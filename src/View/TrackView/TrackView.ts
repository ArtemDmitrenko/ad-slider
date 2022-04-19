import EventObserver from '../../EventObserver/EventObserver';
import EventTypes from '../../EventObserver/eventTypes';
import { IConfig } from '../../Model/Model';
import BarView from '../BarView/BarView';
import HandlerView from '../HandlerView/HandlerView';
import ScaleView from '../ScaleView/ScaleView';
import ValueNoteView from '../ValueNoteView/ValueNoteView';

class TrackView extends EventObserver {
  public track!: HTMLElement;

  private barView!: BarView;

  private scaleView!: ScaleView;

  private handlerView!: HandlerView;

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

  public getLength(): number {
    return this.track.classList.contains('adslider__track_direction_vertical') ? parseInt(getComputedStyle(this.track).height, 10) : parseInt(getComputedStyle(this.track).width, 10);
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
    this.handlerView.setVerticalView(verticalView);
  }

  public setBarLengthForDouble(options: {
    valueFrom: number;
    valueTo: number;
    handler: HTMLElement;
  }): void {
    this.barView.setLengthForDouble(options);
  }

  public setBarLength(handler: HTMLElement): void {
    this.barView.setLength(handler);
  }

  public drawScale(options: IConfig, handler: HTMLElement): void {
    this.scaleView.drawScale(options, handler);
  }

  private render(parent: HTMLElement): void {
    this.track = document.createElement('div');
    this.track.classList.add('adslider__track');
    this.barView = new BarView(this.track);
    this.scaleView = new ScaleView(this.track);

    this.handlerView = new HandlerView(this.track);
    this.handlerViewFrom = new HandlerView(this.track);
    this.handlerView.addClassToValueNoteElement('adslider__note_type_to');
    this.handlerViewFrom.addClassToValueNoteElement('adslider__handler_type_from');
    this.handlerViewFrom.handler.classList.add('adslider__handler_type_from');

    parent.append(this.track);
  }

  private addListeners(): void {
    this.track.addEventListener('mousedown', this.handleTrackMouseDown);
  }

  private handleTrackMouseDown = (event: MouseEvent): void => {
    this.broadcast(EventTypes.HANDLER_MOUSEDOWN_EVENT, event);
  }

  private addObservers(): void {
    this.handlerView.addObserver(EventTypes.HANDLER_MOUSEDOWN_EVENT, this.handleMouseDown);
    this.handlerView.addObserver(EventTypes.HANDLER_MOUSEMOVE_EVENT, this.mouseMove);
    if (this.handlerViewFrom) {
      this.handlerViewFrom.addObserver(EventTypes.HANDLER_MOUSEDOWN_EVENT, this.handleMouseDown);
      this.handlerViewFrom.addObserver(EventTypes.HANDLER_MOUSEMOVE_EVENT, this.mouseMove);
    }
    this.addObserver(EventTypes.HANDLER_MOUSEDOWN_EVENT, this.handleChangePos);

    this.handlerView.addObserver(EventTypes.CALC_VALUE_NOTE_POSITION, this.handleCalcValueNotePos);
    this.handlerView.addObserver(EventTypes.SET_VALUE_NOTE_POS, this.handleSetValueNotePos);
    this.handlerView.addObserver(EventTypes.SET_BAR, this.handleSetBar);
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
    const isFromValueChanging = this.leadHandler.handler.classList.contains('adslider__handler_type_from');
    const options = {
      relPosition, isFromValueChanging,
    };
    this.broadcast(EventTypes.CHANGE_POSITION, options);
  }

  private findLeadHandler(e: MouseEvent, handler: HandlerView): void {
    const isValueDecrease = this.isVertical()
      ? e.clientY > this.mousedownClientY : e.clientX < this.mousedownClientX;
    const isValueIncrease = this.isVertical()
      ? e.clientY < this.mousedownClientY : e.clientX > this.mousedownClientX;
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

  private calcNewPos(shift: number, e: MouseEvent): number {
    return this.isVertical()
      ? this.track.getBoundingClientRect().bottom - e.clientY - shift
      : e.clientX - shift - this.track.getBoundingClientRect().left;
  }

  private getEdge(handler: HandlerView): number {
    return this.getLength() - handler.getLength();
  }

  private checkNewPos(newPos: number): number {
    const edge = this.getEdge(this.handlerView);
    if (newPos < 0) {
      return 0;
    }
    if (newPos > edge) {
      return edge;
    }
    return newPos;
  }

  private handleSetValueNotePos = () => {
    this.handlerView.setValuePos();
  }

  private handleCalcValueNotePos = (handler: HTMLElement) => {
    this.handlerView.calcValuePos(handler);
  }

  private handleSetBar = (data: {
    handler: HTMLElement,
    vertical: boolean,
    double: boolean
  }): void => {
    if (!data.double) {
      this.setBarLength(data.handler);
    } else if (this.handlerViewFrom) {
      const options = {
        valueFrom: this.handlerViewFrom.getPos(),
        valueTo: this.handlerView.getPos(),
        handler: data.handler,
      };
      this.setBarLengthForDouble(options);
    }
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
    this.handlerView.calcPos({
      edge: this.getEdge(this.handlerView),
      value: to,
      limits,
    });
    this.handlerView.setPos(double);
    this.handlerView.setValue(to);
    this.handlerView.showValueNote(showValueNote);
    this.drawScale(options, this.handlerView.handler);
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
    edge: number,
    value: number | null | undefined,
    limits: { min: number; max: number },
  }): void {
    this.handlerView.calcPos(options);
  }

  public calcHandlerPosFromView(options: {
    value: number,
    limits: { min: number; max: number },
    isFromValueChanging: boolean,
  }): void {
    const { value, limits, isFromValueChanging } = options;
    if (this.handlerViewFrom) {
      const data = {
        edge: this.getEdge(this.handlerViewFrom),
        value,
        limits,
      };
      if (isFromValueChanging) {
        this.handlerViewFrom.calcPos(data);
        this.handlerViewFrom.setValue(value);
      } else {
        this.handlerView.calcPos(data);
        this.handlerView.setValue(value);
      }
    } else {
      const data = {
        edge: this.getEdge(this.handlerView),
        value,
        limits,
      };
      this.handlerView.calcPos(data);
      this.handlerView.setValue(value);
    }
  }

  public setHandlerPosFromView(options: {
    isDouble: boolean,
    isFromValueChanging: boolean,
    showValueNote: boolean
  }): void {
    const { isDouble, isFromValueChanging, showValueNote } = options;
    if (this.handlerViewFrom) {
      if (isFromValueChanging) {
        this.handlerViewFrom.setPos(isDouble);
      } else {
        this.handlerView.setPos(isDouble);
      }
      this.setViewOfOneNote(showValueNote);
    } else {
      this.handlerView.setPos(isDouble);
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
      this.handlerViewFrom.calcValuePos(this.handlerViewFrom.handler);
      this.handlerViewFrom.setValuePos();
      this.handlerViewFrom.setValue(from);
      this.handlerViewFrom.showValueNote(showValueNote);
      this.setBarLengthForDouble({
        valueFrom: this.handlerViewFrom.getPos(),
        valueTo: this.handlerView.getPos(),
        handler: this.handlerView.handler,
      });
    }
    this.setViewOfOneNote(showValueNote);
  }

  private renderHandlerFrom(): void {
    this.handlerViewFrom = new HandlerView(this.track);
    this.handlerViewFrom.handler.classList.add('adslider__handler_type_from');
    this.handlerViewFrom.addClassToValueNoteElement('adslider__note_type_from');
    this.handlerViewFrom.addObserver(EventTypes.HANDLER_MOUSEDOWN_EVENT, this.handleMouseDown);
    this.handlerViewFrom.addObserver(EventTypes.HANDLER_MOUSEMOVE_EVENT, this.mouseMove);
  }

  private updateObservers(): void {
    if (this.handlerViewFrom && this.handlerViewFrom) {
      if (!Object.prototype.hasOwnProperty.call(this.handlerViewFrom.observers, EventTypes.CALC_VALUE_NOTE_POSITION)) {
        this.handlerViewFrom.addObserver(EventTypes.CALC_VALUE_NOTE_POSITION, this.handleCalcValueNoteFromPos);
        this.handlerViewFrom.addObserver(EventTypes.SET_VALUE_NOTE_POS, this.handleSetValueNoteFromPos);
        this.handlerViewFrom.addObserver(EventTypes.SET_BAR, this.handleSetBar);
      }
    }
  }

  private handleSetValueNoteFromPos = () => {
    if (this.handlerViewFrom) {
      this.handlerViewFrom.setValuePos();
    }
  }

  private handleCalcValueNoteFromPos = (handler: HTMLElement) => {
    if (this.handlerViewFrom) {
      this.handlerViewFrom.calcValuePos(handler);
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
      this.valueNoteViewCommon.note.remove();
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
      this.handlerView.showValueNote(showValueNote);
      if (this.handlerViewFrom) {
        this.handlerViewFrom.showValueNote(showValueNote);
      }
    }
  }

  private isSmallDistanceBetweenNotes(): boolean {
    if (this.handlerViewFrom) {
      const distAmongNotes: number = this.handlerView.getValueNotePos() - this.handlerViewFrom.getValueNotePos();
      return distAmongNotes < this.handlerView.getValueNoteSize();
    }
    return false;
  }

  private makeCommonNoteView(): void {
    if (this.handlerViewFrom) {
      this.handlerViewFrom.showValueNote(false);
    }
    this.handlerView.showValueNote(false);
    if (this.valueNoteViewCommon) {
      this.updateCommonNoteView();
    } else {
      this.valueNoteViewCommon = new ValueNoteView(this.track);
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
      const valueTo = this.handlerView.getValueOfNote();
      const valueFrom = this.handlerViewFrom.getValueOfNote();
      this.valueNoteViewCommon.setValueForTwo(valueFrom, valueTo);
      const leftEdgeOfHandlerFrom = this.handlerViewFrom.getPos();
      const rightEdgeOfHandlerTo = this.handlerView.getPos() + this.handlerView.getLength();
      const distAmongEdgesOfHandlers = rightEdgeOfHandlerTo - leftEdgeOfHandlerFrom;
      this.valueNoteViewCommon.valueNotePos = leftEdgeOfHandlerFrom + distAmongEdgesOfHandlers / 2;
      this.valueNoteViewCommon.setPos();
    }
  }

  private removeCommonNoteView(): void {
    if (this.handlerViewFrom && this.valueNoteViewCommon) {
      this.handlerView.showValueNote(true);
      this.handlerViewFrom.showValueNote(true);
      this.valueNoteViewCommon.note.remove();
      delete this.valueNoteViewCommon;
    }
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

  private isDouble(): boolean {
    return (!!this.handlerViewFrom);
  }
}

export default TrackView;
