import EventObserver from '../../eventObserver/eventObserver';

class HandlerView extends EventObserver {
  public $handler!: HTMLElement;

  private $parent!: HTMLElement;

  private handlerPos!: number;

  private handleMouseMove!: (e: MouseEvent) => void;

  private handleMouseUp!: (e: MouseEvent) => void;

  constructor($parent: HTMLElement) {
    super();
    this.render($parent);
  }

  private render($parent: HTMLElement): void {
    this.$parent = $parent;
    this.$handler = document.createElement('div');
    this.$handler.classList.add('adslider__handler');
    this.$parent.append(this.$handler);
    this.$handler.addEventListener('mousedown', this.handleHandlerMouseDown.bind(this));
  }

  private handleHandlerMouseDown(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const data = { event, handler: this.$handler };
    this.broadcast('handlerMousedownEvent', data);
    this.bindMousemove(event);
  }

  private bindMousemove(event: MouseEvent): void {
    this.handleMouseMove = this.mouseMove.bind(this);
    this.handleMouseUp = this.mouseUp.bind(this);
    if (event.type === 'mousedown') {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    }
  }

  private mouseMove(e: MouseEvent): void {
    const data = { shift: null, e, handler: this };
    this.broadcast('handlerMousemoveEvent', data);
  }

  private mouseUp(): void {
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  public getLength(): number {
    return this.isVertical()
      ? parseInt(getComputedStyle(this.$handler).height, 10)
      : parseInt(getComputedStyle(this.$handler).width, 10);
  }

  public getPos(): number {
    return this.isVertical()
      ? parseInt(getComputedStyle(this.$handler).bottom, 10)
      : parseInt(getComputedStyle(this.$handler).left, 10);
  }

  public calcPos(options: {
    edge: number;
    value: number;
    limits: { min: number; max: number };
  }): void {
    const oddValMin: number = options.value - options.limits.min;
    const oddMaxMin: number = options.limits.max - options.limits.min;
    this.handlerPos = options.edge * (oddValMin / oddMaxMin);
  }

  public setPos(isDouble: boolean): void {
    if (this.isVertical()) {
      this.$handler.style.left = '';
      this.$handler.style.bottom = `${this.handlerPos}px`;
    } else {
      this.$handler.style.bottom = '';
      this.$handler.style.left = `${this.handlerPos}px`;
    }
    this.broadcast('calcValueNotePos', this.$handler);
    this.broadcast('setValueNotePos');
    const data = { $handler: this.$handler, vertical: this.isVertical(), double: isDouble };
    this.broadcast('setBar', data);
  }

  public setVerticalView(verticalView: boolean): void {
    if (verticalView) {
      this.$handler.classList.remove('adslider__handler_direction_horizontal');
      this.$handler.classList.add('adslider__handler_direction_vertical');
    } else {
      this.$handler.classList.remove('adslider__handler_direction_vertical');
      this.$handler.classList.add('adslider__handler_direction_horizontal');
    }
  }

  private isVertical(): boolean {
    return this.$handler.classList.contains('adslider__handler_direction_vertical');
  }
}

export default HandlerView;
