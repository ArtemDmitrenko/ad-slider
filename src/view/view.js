import HandlerView from './handlerView/handlerView';
import TrackView from './trackView/trackView';
import valueNoteView from './valueNoteView/valueNoteView';

export default class View {
  constructor(selector) {
    this.$el = document.querySelector(selector);
    this._render();

    this.track = new TrackView(this.$adslider);
    this.handler = new HandlerView(this.track.$track);
    this.valueNote = new valueNoteView(this.$adslider);

    this.valueNote._alignRelHandler(this.handler._getHandlerWidth());
    this.handler._setPosition(this.track.$track);
    this._addEventMousemove();

  }

  _render() {
    this.$adslider = document.createElement('div');
    this.$adslider.classList.add('adslider');
    this.$el.append(this.$adslider);
  }
  _addEventMousemove() {
    this.handler.eventMousemove.addObserver(this.valueNote._setPosition.bind(this.valueNote));
  }

}