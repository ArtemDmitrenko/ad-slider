import EventObserver from '../../eventObserver/eventObserver';

export default class HandlerView extends EventObserver {
  public $handler!: HTMLElement;

  private $parent!: HTMLElement;

  private handlerPos!: number;

  private mouseMoveListener!: (e:MouseEvent) => void;

  private mouseUpListener!: (e:MouseEvent) => void;

  constructor($parent: HTMLElement) {
    super();
    this.render($parent);
  }

  private render($parent: HTMLElement): void {
    this.$parent = $parent;
    this.$handler = document.createElement('div');
    this.$handler.classList.add('adslider__handler');
    this.$parent.append(this.$handler);
    this.$handler.addEventListener('mousedown', this.moveHandler.bind(this));
  }

  private moveHandler(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const data = { event, handler: this.$handler };
    this.broadcast('handlerMousedownEvent', data);
    this.bindMousemove(event);
  }

  private bindMousemove(event: MouseEvent): void {
    this.mouseMoveListener = this.mouseMove.bind(this);
    this.mouseUpListener = this.mouseUp.bind(this);
    if (event.type === 'mousedown') {
      document.addEventListener('mousemove', this.mouseMoveListener);
      document.addEventListener('mouseup', this.mouseUpListener);
    }
  }

  private mouseMove(e: MouseEvent): void {
    const data = { shift: null, e, handler: this };
    this.broadcast('handlerMousemoveEvent', data);
  }

  private mouseUp(): void {
    document.removeEventListener('mouseup', this.mouseUpListener);
    document.removeEventListener('mousemove', this.mouseMoveListener);
  }

  public getLength(): number {
    let length: number;
    if (this.isVertical()) {
      length = parseInt(getComputedStyle(this.$handler).height, 10);
    } else {
      length = parseInt(getComputedStyle(this.$handler).width, 10);
    }
    return length;
  }

  public getPos(): number {
    if (this.isVertical()) {
      return parseInt(getComputedStyle(this.$handler).bottom, 10);
    }
    return parseInt(getComputedStyle(this.$handler).left, 10);
  }

  public calcPos(options: {
    edge: number,
    value: number,
    limits: { min: number, max: number }
  }): void {
    const oddValMin: number = options.value - options.limits.min;
    const oddMaxMin: number = options.limits.max - options.limits.min;
    this.handlerPos = options.edge * (oddValMin / oddMaxMin);
  }

  public setPos(): void {
    if (this.isVertical()) {
      this.$handler.style.left = '';
      this.$handler.style.bottom = `${this.handlerPos}px`;
    } else {
      this.$handler.style.bottom = '';
      this.$handler.style.left = `${this.handlerPos}px`;
    }
  }

  public setVerticalView(verticalView: boolean): void {
    if (verticalView) {
      this.$handler.classList.remove('adslider__handler_horizontal');
      this.$handler.classList.add('adslider__handler_vertical');
    } else {
      this.$handler.classList.remove('adslider__handler_vertical');
      this.$handler.classList.add('adslider__handler_horizontal');
    }
  }

  private isVertical(): boolean {
    if (this.$handler.classList.contains('adslider__handler_vertical')) {
      return true;
    }
    return false;
  }
}
