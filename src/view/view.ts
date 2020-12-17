import {Config} from '../model/model';
import HandlerView from './handlerView/handlerView';
import TrackView from './trackView/trackView';
import ValueNoteView from './valueNoteView/valueNoteView';
import EventObserver from '../eventObserver/eventObserver';

export default class View extends EventObserver {
  private $el: HTMLElement | null;
  private handlerView: HandlerView;
  private trackView: TrackView;
  public valueNoteView: ValueNoteView;
  private $adslider: HTMLElement;
  private options: Config;

  constructor(selector: string) {
    super();

    this.render(selector);

    // this.valueNote._alignRelHandler(this.handler._getHandlerWidth());
    // this.handler._setMovePosition(this.track.$track);

    // When position of handler is changing - valueNote is changing position too
    // this.handler.eventMousemove.addObserver(this.valueNote._setPosition.bind(this.valueNote));
  }

  private render(selector: string) {
    this.$el = document.querySelector(selector);
    if (!this.$el) {
      throw new Error('You do not have this selector in your DOM')
    }
    this.$adslider = document.createElement('div');
    this.$adslider.classList.add('adslider');
    this.$el.append(this.$adslider);

    this.trackView = new TrackView(this.$adslider);
    this.handlerView = new HandlerView(this.trackView.$track);
    this.valueNoteView = new ValueNoteView(this.$adslider);

  }
  public getRightEdge() {
    const rightEdge = this.trackView.getLength() - this.handlerView.getHandlerWidth();
    return rightEdge; 
  }
  public setPosition(value: number, limits: {min: number, max: number}, rightEdge: number): void {
    const handlerPos = rightEdge * (value - limits.min) / (limits.max - limits.min);
    this.handlerView.$handler.style.left = handlerPos + 'px';
    this.valueNoteView.$note.style.left = handlerPos + this.handlerView.getHandlerWidth() / 2 + 'px';
    this.valueNoteView.setValue(value);
  }


}