import EventObserver from '../../EventObserver/EventObserver';
import EventTypes from '../../EventObserver/eventTypes';
import ValueNoteView from '../ValueNoteView/ValueNoteView';

type MouseDownDataType = {
  eventProps: { clientX: number; clientY: number };
  handler: HTMLElement
}

type MouseMoveDataType = {
  shift?: number,
  eventProps: { clientX: number; clientY: number; type: string };
  // eslint-disable-next-line no-use-before-define
  handler: HandlerView;
};

type Events = {
  [EventTypes.HANDLER_MOUSEDOWN_EVENT]: MouseDownDataType;
  [EventTypes.HANDLER_MOUSEMOVE_EVENT]: MouseMoveDataType
}

class HandlerView extends EventObserver<Events> {
  private handler!: HTMLElement;

  private handlerPos!: number;

  private valueNoteView!: ValueNoteView;

  constructor(parent: HTMLElement) {
    super();
    this.render(parent);
  }

  public getLength(isVertical: boolean): number {
    return isVertical
      ? parseInt(getComputedStyle(this.handler).height, 10)
      : parseInt(getComputedStyle(this.handler).width, 10);
  }

  public getHandler(): HTMLElement {
    return this.handler;
  }

  public getPos(isVertical: boolean): number {
    return isVertical
      ? parseInt(getComputedStyle(this.handler).bottom, 10)
      : parseInt(getComputedStyle(this.handler).left, 10);
  }

  public calcPos(options: {
    edge: number;
    value: number;
    limits: { min: number; max: number };
  }): void {
    const {
      edge,
      value,
      limits: { min, max },
    } = options;
    const oddValMin: number = value - min;
    const oddMaxMin: number = max - min;
    this.handlerPos = edge * (oddValMin / oddMaxMin);
  }

  public setPos(isVertical: boolean): void {
    if (isVertical) {
      this.handler.style.left = '';
      this.handler.style.bottom = `${this.handlerPos}px`;
    } else {
      this.handler.style.bottom = '';
      this.handler.style.left = `${this.handlerPos}px`;
    }
    this.setValueNotePos(isVertical);
  }

  public setValueForNote(value: number): void {
    this.valueNoteView.setValue(value);
  }

  public showValueNote(isValueShown: boolean): void {
    this.valueNoteView.showValueNote(isValueShown);
  }

  public setValueNotePos(isVertical: boolean): void {
    const options = {
      handlerBottomPos: getComputedStyle(this.handler).bottom,
      handlerHeight: getComputedStyle(this.handler).height,
      handlerLeftPos: getComputedStyle(this.handler).left,
      handlerWidth: getComputedStyle(this.handler).width,
      isVertical,
    };
    const valueNoteViewPos = this.valueNoteView.calcPos(options);
    this.valueNoteView.setPos(valueNoteViewPos, isVertical);
  }

  public getValueNotePos(isVertical: boolean): number {
    return this.valueNoteView.getPos(isVertical);
  }

  public getValueNoteSize(isVertical: boolean): number {
    return this.valueNoteView.getSize(isVertical);
  }

  public getValueOfNote(): number {
    return this.valueNoteView.getValue();
  }

  public deleteInstance(): void {
    this.handler.remove();
    this.valueNoteView.removeNoteElement();
  }

  private render(parent: HTMLElement): void {
    this.handler = document.createElement('div');
    this.handler.classList.add('adslider__handler');
    parent.append(this.handler);
    this.valueNoteView = new ValueNoteView(parent, false);
    this.handler.addEventListener('mousedown', this.handleHandlerMouseDown);
  }

  private handleHandlerMouseDown = (event: MouseEvent): void => {
    const { clientX, clientY } = event;
    event.preventDefault();
    event.stopPropagation();
    const data = {
      eventProps: { clientX, clientY },
      handler: this.handler,
    };
    this.broadcast(EventTypes.HANDLER_MOUSEDOWN_EVENT, data);
    this.bindMouseMove();
  };

  private bindMouseMove(): void {
    document.addEventListener('mousemove', this.handleHandlerMouseMove);
    document.addEventListener('mouseup', this.handleHandlerMouseUp);
  }

  private handleHandlerMouseMove = (e: MouseEvent) => {
    const { clientX, clientY, type } = e;
    const data = {
      eventProps: { clientX, clientY, type },
      handler: this,
    };
    this.broadcast(EventTypes.HANDLER_MOUSEMOVE_EVENT, data);
  }

  private handleHandlerMouseUp = () => {
    document.removeEventListener('mouseup', this.handleHandlerMouseUp);
    document.removeEventListener('mousemove', this.handleHandlerMouseMove);
  }
}

export default HandlerView;
