import EventObserver from '../../EventObserver/EventObserver';
import EventTypes from '../../EventObserver/eventTypes';
import ValueNoteView from '../ValueNoteView/ValueNoteView';

class HandlerView extends EventObserver {
  public handler!: HTMLElement;

  private parent!: HTMLElement;

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

  public getPos(isVertical: boolean): number {
    return isVertical
      ? parseInt(getComputedStyle(this.handler).bottom, 10)
      : parseInt(getComputedStyle(this.handler).left, 10);
  }

  public calcPos(options: {
    edge: number;
    value: number | null | undefined;
    limits: { min: number; max: number };
  }): void {
    const {
      edge,
      value,
      limits: { min, max },
    } = options;
    if (value !== null && value !== undefined) {
      const oddValMin: number = value - min;
      const oddMaxMin: number = max - min;
      this.handlerPos = edge * (oddValMin / oddMaxMin);
    }
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

  public setValueForNote(value: number | null | undefined): void {
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

  public addClassToValueNoteElement(className: string): void {
    this.valueNoteView.addClassToNoteElement(className);
  }

  public deleteInstance(): void {
    this.handler.remove();
    this.valueNoteView.noteElement.remove();
  }

  private render(parent: HTMLElement): void {
    this.parent = parent;
    this.handler = document.createElement('div');
    this.handler.classList.add('adslider__handler');
    this.parent.append(this.handler);
    this.valueNoteView = new ValueNoteView(parent);
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
    this.bindMousemove();
  };

  private bindMousemove(): void {
    document.addEventListener('mousemove', this.handleHandlerMouseMove);
    document.addEventListener('mouseup', this.handleHandlerMouseUp);
  }

  private handleHandlerMouseMove = (e: MouseEvent) => {
    const { clientX, clientY, type } = e;
    const data = {
      shift: null,
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
