import { Config } from '../model/model';
import HandlerView from './handlerView/handlerView';
import TrackView from './trackView/trackView';
import ValueNoteView from './valueNoteView/valueNoteView';
import EventObserver from '../eventObserver/eventObserver';

export default class View extends EventObserver {
  private $el!: HTMLElement | null;

  private handlerView!: HandlerView;

  private trackView!: TrackView;

  public valueNoteView!: ValueNoteView;

  private $adslider!: HTMLElement;

  private options!: Config;

  constructor(selector: string) {
    super();
    this.render(selector);
  }

  private render(selector: string) {
    this.$el = document.querySelector(selector);
    if (!this.$el) {
      throw new Error('You do not have this selector in your DOM');
    }
    this.$adslider = document.createElement('div');
    this.$adslider.classList.add('adslider');
    this.$el.append(this.$adslider);

    this.trackView = new TrackView(this.$adslider);
    this.handlerView = new HandlerView(this.trackView.$track);
    this.valueNoteView = new ValueNoteView(this.$adslider);

    this.addListeners();
  }

  public getRightEdge(): number {
    const rightEdge = this.trackView.getLength() - this.handlerView.getHandlerWidth();
    return rightEdge;
  }

  public calcPosAndValue(value: number, limits: { min: number, max: number }, rightEdge: number): void {
    const handlerPos = rightEdge * ((value - limits.min) / (limits.max - limits.min));
    this.setHandlerPos(handlerPos);
    this.valueNoteView.setValue(value);
  }

  private calNewLeft(e: MouseEvent, shiftX: number): number {
    let newLeft: number = e.clientX - shiftX - this.trackView.$track.getBoundingClientRect().left;
    const rightEdge = this.getRightEdge();
    if (newLeft < 0) {
      newLeft = 0;
    } else if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }
    return newLeft;
  }

  private setHandlerPos(value: number): void {
    this.handlerView.$handler.style.left = `${value}px`;
    this.valueNoteView.$note.style.left = `${value + this.handlerView.getHandlerWidth() / 2}px`;
  }

  private addListeners(): void {
    this.handlerView.$handler.addEventListener('mousedown', this.moveHandler.bind(this));
    // document.addEventListener('dragstart', View.dragstart);
  }

  static dragstart(): boolean {
    return false;
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
      console.log(newLeft);
      console.log(this);
      this.handlerView.$handler.style.left = `${newLeft}px`;
      this.valueNoteView.$note.style.left = `${newLeft + this.handlerView.getHandlerWidth() / 2}px`;
    };
    function mouseUp() {
      document.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('mousemove', mouseMove);
    }
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  }

  // private setMovePosition(): void {
  //   this.handlerView.$handler.addEventListener('mousedown', (e) => {
  //     e.preventDefault();
  //     const shiftX = e.clientX - this.handlerView.$handler.getBoundingClientRect().left;
  //     const mouseMove = (e: MouseEvent) => {
  //       let newLeft = e.clientX - shiftX - this.trackView.$track.getBoundingClientRect().left;
  //       const rightEdge = this.getRightEdge();
  //       if (newLeft < 0) {
  //         newLeft = 0;
  //       } else if (newLeft > rightEdge) {
  //         newLeft = rightEdge;
  //       }
  //       this.handlerView.$handler.style.left = `${newLeft}px`;
  //       this.valueNoteView.$note.style.left = `${newLeft + this.handlerView.getHandlerWidth() / 2}px`;

  //       const data = { newLeft, rightEdge };
  //       this.broadcast(data);
  //     };

  //     function mouseUp() {
  //       document.removeEventListener('mouseup', mouseUp);
  //       document.removeEventListener('mousemove', mouseMove);
  //     }
  //     document.addEventListener('mousemove', mouseMove);
  //     document.addEventListener('mouseup', mouseUp);
  //   });
  //   document.addEventListener('dragstart', () => false);
  // }
}
