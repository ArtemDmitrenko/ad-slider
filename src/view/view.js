import EventObserver from '../eventObserver/eventObserver';

import HandlerView from './handlerView/handlerView';
import TrackView from './trackView/trackView';
import valueNoteView from './valueNoteView/valueNoteView';

export default class View {
  constructor(selector) {
    this.$el = document.querySelector(selector);

    this.render();
  }

  render() {
    this.$adslider = document.createElement('div');
    this.$adslider.classList.add('adslider');
    this.$el.append(this.$adslider);
    const track = new TrackView(this.$adslider);
    const handler = new HandlerView(track.$track);
    const valueNote = new valueNoteView(this.$adslider);
  }
}