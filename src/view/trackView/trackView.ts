export default class TrackView {
  public $track!: HTMLElement;

  constructor($parent: HTMLElement) {
    this.render($parent);
  }

  private render($parent: HTMLElement): void {
    this.$track = document.createElement('div');
    this.$track.classList.add('adslider__track');
    $parent.append(this.$track);
  }

  public getWidth(): number {
    const width: number = parseInt(getComputedStyle(this.$track).width, 10);
    return width;
  }
}
