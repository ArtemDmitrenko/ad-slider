import EventObserver from '../../eventObserver/eventObserver';

export default class TrackView extends EventObserver {
  public $track!: HTMLElement;

  constructor($parent: HTMLElement) {
    super();
    this.render($parent);
    this.addListeners();
  }

  private render($parent: HTMLElement): void {
    this.$track = document.createElement('div');
    this.$track.classList.add('adslider__track');
    $parent.append(this.$track);
  }

  private addListeners(): void {
    this.$track.addEventListener('mousedown', this.changeHandlerPos.bind(this));
  }

  private changeHandlerPos(event: MouseEvent): void {
    this.broadcast('handlerMousedownEvent', event);
  }

  public getLength(): number {
    return this.$track.classList.contains('adslider__track_vertical') ? parseInt(getComputedStyle(this.$track).height, 10) : parseInt(getComputedStyle(this.$track).width, 10);
  }

  public setVerticalView(verticalView: boolean): void {
    if (verticalView) {
      this.$track.classList.remove('adslider__track_horizontal');
      this.$track.classList.add('adslider__track_vertical');
    } else {
      this.$track.classList.remove('adslider__track_vertical');
      this.$track.classList.add('adslider__track_horizontal');
    }
  }
}
