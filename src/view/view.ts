import HandlerView from './handlerView/handlerView';
import TrackView from './trackView/trackView';
import ValueNoteView from './valueNoteView/valueNoteView';
import EventObserver from '../eventObserver/eventObserver';

export default class View extends EventObserver {
  private $el: HTMLElement | null;
  private handlerView: HandlerView;
  private trackView: TrackView;
  private valueNoteView: ValueNoteView;
  private $adslider: HTMLElement;

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
    this.valueNoteView.$note.style.left = this.handlerView.getHandlerWidth() / 2 + 'px';
  }



  // getRightEdge() {
  //   this.rightEdge = this.track.$track.offsetWidth - this.handler.$handler.offsetWidth;
  //   return this.rightEdge;
  // }
}