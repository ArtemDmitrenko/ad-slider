import EventObserver from '../../EventObserver/EventObserver';
import EventTypes from '../../EventObserver/eventTypes';
import { IConfig } from '../../Model/Model';
import BarView from '../BarView/BarView';
import ScaleView from '../ScaleView/ScaleView';

class TrackView extends EventObserver {
  public track!: HTMLElement;

  private barView!: BarView;

  private scaleView!: ScaleView;

  constructor(parent: HTMLElement) {
    super();
    this.render(parent);
    this.addListeners();
  }

  public getLength(): number {
    return this.track.classList.contains('adslider__track_direction_vertical') ? parseInt(getComputedStyle(this.track).height, 10) : parseInt(getComputedStyle(this.track).width, 10);
  }

  public setVerticalView(verticalView: boolean): void {
    if (verticalView) {
      this.track.classList.remove('adslider__track_direction_horizontal');
      this.track.classList.add('adslider__track_direction_vertical');
    } else {
      this.track.classList.remove('adslider__track_direction_vertical');
      this.track.classList.add('adslider__track_direction_horizontal');
    }
    this.barView.setVerticalView(verticalView);
  }

  public setBarLengthForDouble(options: {
    valueFrom: number;
    valueTo: number;
    handler: HTMLElement;
  }): void {
    this.barView.setLengthForDouble(options);
  }

  public setBarLength(handler: HTMLElement): void {
    this.barView.setLength(handler);
  }

  public drawScale(options: IConfig, handler: HTMLElement): void {
    this.scaleView.drawScale(options, handler);
  }

  private render(parent: HTMLElement): void {
    this.track = document.createElement('div');
    this.track.classList.add('adslider__track');
    this.barView = new BarView(this.track);
    this.scaleView = new ScaleView(this.track);
    parent.append(this.track);
  }

  private addListeners(): void {
    this.track.addEventListener('mousedown', this.handleTrackMouseDown);
  }

  private handleTrackMouseDown = (event: MouseEvent): void => {
    this.broadcast(EventTypes.HANDLER_MOUSEDOWN_EVENT, event);
  }
}

export default TrackView;
