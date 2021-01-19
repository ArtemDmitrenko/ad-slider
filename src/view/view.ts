// import { Config } from '../model/model';
import HandlerView from './handlerView/handlerView';
import TrackView from './trackView/trackView';
import ValueNoteView from './valueNoteView/valueNoteView';
import EventObserver from '../eventObserver/eventObserver';
// import { Config } from '../model/model';

export default class View extends EventObserver {
  public $el!: HTMLElement | null;

  public handlerView!: HandlerView;

  private trackView!: TrackView;

  public valueNoteView!: ValueNoteView;

  private $adslider!: HTMLElement;

  constructor(container: HTMLElement) {
    super();
    this.render(container);
  }

  public render(container: HTMLElement): void {
    this.$el = container;
    this.$adslider = document.createElement('div');
    this.$adslider.classList.add('adslider');
    this.$el.append(this.$adslider);

    this.trackView = new TrackView(this.$adslider);
    this.handlerView = new HandlerView(this.trackView.$track);
    this.valueNoteView = new ValueNoteView(this.$adslider);

    this.addListeners();
  }

  static calcHandlerPos(value: number, limits: { min: number, max: number }, rightEdge: number): number {
    const handlerPos = rightEdge * ((value - limits.min) / (limits.max - limits.min));
    return handlerPos;
  }

  static calcValueNotePos(handler: HTMLElement): number {
    const valueNotePos: number = parseInt(getComputedStyle(handler).left, 10) + parseInt(getComputedStyle(handler).width, 10) / 2;
    return valueNotePos;
  }

  public getRightEdge(): number {
    const rightEdge = this.trackView.getLength() - this.handlerView.getWidth();
    return rightEdge;
  }

  private addListeners(): void {
    this.handlerView.$handler.addEventListener('mousedown', this.moveHandler.bind(this));
  }

  private moveHandler(event: MouseEvent): void {
    event.preventDefault();
    const shiftX: number = event.clientX - this.handlerView.$handler.getBoundingClientRect().left;
    const mouseMove = (e: MouseEvent): void => {
      let newLeft = e.clientX - shiftX - this.trackView.$track.getBoundingClientRect().left;
      const rightEdge = this.getRightEdge();
      if (newLeft < 0) {
        newLeft = 0;
      } else if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }
      this.handlerView.setPos(newLeft);
      this.valueNoteView.setPos(View.calcValueNotePos(this.handlerView.$handler));
      const data = { newLeft, rightEdge };
      this.broadcast('handlerMove', data);
    };
    function mouseUp() {
      document.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('mousemove', mouseMove);
    }
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  }
}
