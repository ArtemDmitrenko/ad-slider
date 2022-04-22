import EventObserver from '../../EventObserver/EventObserver';
import EventTypes from '../../EventObserver/eventTypes';
import ValueNoteView from '../ValueNoteView/ValueNoteView';

class HandlerView extends EventObserver {
  public handler!: HTMLElement;

  private parent!: HTMLElement;

  private handlerPos!: number;

  private valueNoteView!: ValueNoteView;

  private handleMouseMove!: (e: MouseEvent) => void;

  private handleMouseUp!: (e: MouseEvent) => void;

  constructor(parent: HTMLElement) {
    super();
    this.render(parent);
    this.handleMouseMove = this.mouseMove.bind(this);
    this.handleMouseUp = this.mouseUp.bind(this);
  }

  public getLength(): number {
    return this.isVertical()
      ? parseInt(getComputedStyle(this.handler).height, 10)
      : parseInt(getComputedStyle(this.handler).width, 10);
  }

  public getPos(): number {
    return this.isVertical()
      ? parseInt(getComputedStyle(this.handler).bottom, 10)
      : parseInt(getComputedStyle(this.handler).left, 10);
  }

  public calcPos(options: {
    edge: number,
    value: number | null | undefined,
    limits: { min: number; max: number },
  }): void {
    const { edge, value, limits: { min, max } } = options;
    if (value !== null && value !== undefined) {
      const oddValMin: number = value - min;
      const oddMaxMin: number = max - min;
      this.handlerPos = edge * (oddValMin / oddMaxMin);
    }
  }

  public setPos(isDouble: boolean): void {
    if (this.isVertical()) {
      this.handler.style.left = '';
      this.handler.style.bottom = `${this.handlerPos}px`;
    } else {
      this.handler.style.bottom = '';
      this.handler.style.left = `${this.handlerPos}px`;
    }
    this.setValueNotePos();
    const data = { handler: this.handler, vertical: this.isVertical(), double: isDouble };
    this.broadcast(EventTypes.SET_BAR, data);
  }

  public setVerticalView(verticalView: boolean): void {
    if (verticalView) {
      this.handler.classList.remove('adslider__handler_direction_horizontal');
      this.handler.classList.add('adslider__handler_direction_vertical');
    } else {
      this.handler.classList.remove('adslider__handler_direction_vertical');
      this.handler.classList.add('adslider__handler_direction_horizontal');
    }
    this.valueNoteView.setVerticalView(verticalView);
  }

  public setValueForNote(value: number | null | undefined): void {
    this.valueNoteView.setValue(value);
  }

  public showValueNote(isValueShown: boolean): void {
    this.valueNoteView.showValueNote(isValueShown);
  }

  public setValueNotePos(): void {
    const options = {
      handlerBottomPos: getComputedStyle(this.handler).bottom,
      handlerHeight: getComputedStyle(this.handler).height,
      handlerLeftPos: getComputedStyle(this.handler).left,
      handlerWidth: getComputedStyle(this.handler).width,
    };
    const valueNoteViewPos = this.valueNoteView.calcPos(options);
    this.valueNoteView.setPos(valueNoteViewPos);
  }

  public getValueNotePos(): number {
    return this.valueNoteView.getPos();
  }

  public getValueNoteSize(): number {
    return this.valueNoteView.getSize();
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

  private isVertical(): boolean {
    return this.handler.classList.contains('adslider__handler_direction_vertical');
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
    event.preventDefault();
    event.stopPropagation();
    const data = { event, handler: this.handler };
    this.broadcast(EventTypes.HANDLER_MOUSEDOWN_EVENT, data);
    this.bindMousemove(event);
  }

  private bindMousemove(event: MouseEvent): void {
    if (event.type === 'mousedown') {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    }
  }

  private mouseMove(e: MouseEvent): void {
    const data = { shift: null, e, handler: this };
    this.broadcast(EventTypes.HANDLER_MOUSEMOVE_EVENT, data);
  }

  private mouseUp(): void {
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
  }
}

export default HandlerView;
