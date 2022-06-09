import TrackView from './TrackView/TrackView';
import EventObserver from '../EventObserver/EventObserver';
import EventTypes from '../EventObserver/eventTypes';

type ChangePosDataType = {
  relPosition: number;
  isFromValueChanging: boolean
};

type Events = {
  [EventTypes.CHANGE_POSITION]: ChangePosDataType
}

class View extends EventObserver<Events> {
  private el!: HTMLElement | null;

  private trackView!: TrackView;

  private adslider!: HTMLElement;

  constructor(container: HTMLElement) {
    super();
    this.render(container);
    this.addObservers();
  }

  public updateView(options: {
    isVertical: boolean;
    limits: { max: number; min: number };
    hasValueNote: boolean;
    isDouble: boolean;
    from?: number | null;
    to: number;
    step: number;
  }): void {
    const { isVertical } = options;
    this.setVerticalViewForSingle(isVertical);
    this.trackView.updateTrackView(options);
  }

  public calcPos(options: {
    value: number,
    limits: { min: number; max: number },
    isFromValueChanging: boolean,
  }): void {
    this.trackView.calcHandlerPos(options);
  }

  public setPos(options: {
    isFromValueChanging: boolean,
    hasValueNote: boolean,
  }): void {
    this.trackView.setHandlerPos(options);
  }

  private render(container: HTMLElement): void {
    this.el = container;
    this.adslider = document.createElement('div');
    this.adslider.classList.add('adslider');
    this.el.append(this.adslider);
    this.trackView = new TrackView(this.adslider);
  }

  private setVerticalViewForSingle(isVertical: boolean): void {
    if (isVertical) {
      this.adslider.classList.remove('adslider_direction_horizontal');
      this.adslider.classList.add('adslider_direction_vertical');
    } else {
      this.adslider.classList.remove('adslider_direction_vertical');
      this.adslider.classList.add('adslider_direction_horizontal');
    }
  }

  private addObservers(): void {
    this.trackView.addObserver(EventTypes.CHANGE_POSITION, this.handleHandlerChangePosition);
  }

  private handleHandlerChangePosition = (data: {
    relPosition: number,
    isFromValueChanging: boolean
  }): void => {
    this.broadcast(EventTypes.CHANGE_POSITION, data);
  }
}

export default View;
