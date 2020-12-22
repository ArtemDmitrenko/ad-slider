import EventObserver from '../eventObserver/eventObserver';

export interface Config {
  limits: {
    min: number,
    max: number
  }
  curValue: number;
  showValueNote: boolean;
}

export class Model extends EventObserver {
  public limits: {
    min: number
    max: number
  }

  public curValue: number;

  public showValueNote: boolean;

  constructor(options: Config) {
    super();
    this.limits = options.limits;
    this.curValue = options.curValue;
    this.showValueNote = true;
    this.init(options);
  }

  private setLimits(limits: { min: number, max: number }): void {
    if (limits.min >= limits.max) {
      throw new Error('Min can not be the same or more than Max');
    }
    this.limits = { min: limits.min, max: limits.max };
  }

  private setValue(value: number): void {
    if (value < this.limits.min || value > this.limits.max) {
      throw new Error('Value must be in range of min and max limits');
    }
    this.curValue = value;
  }

  private setShowValueNote(value: boolean): void {
    this.showValueNote = value;
  }

  private init(options: Config) {
    this.setLimits(options.limits);
    this.setValue(options.curValue);
    this.setShowValueNote(options.showValueNote);
  }

  public setValueFromHandlerPos(data: { newLeft: number, rightEdge: number }): void {
    const odds = this.limits.max - this.limits.min;
    const value = Math.round(this.limits.min + odds * (data.newLeft / data.rightEdge));
    this.setValue(value);
    this.broadcast(this.curValue);
  }
}

// constructor(options) {
//   this.limits = (options.limits) ? options.limits : { min: 0, max: 100 };
//   this.defValue = (options.defValue) ? options.defValue : 50;
//   this.showValueNote = (typeof options.showValueNote === 'boolean') ? options.showValueNote : true;

//   // Event to update value on handler when defvalue in Model is changed
//   this.eventUpdateValue = new EventObserver();

//   this.setValue(this.defValue);
//   this.setLimits(this.limits);

// }
//   getValueFromHandlerPos(data) {
//     this.defValue = Math.round(this.limits.min + (this.limits.max - this.limits.min) * (parseInt(data.newLeft, 10) / data.rightEdge));
//     this.eventUpdateValue.broadcast(this.defValue);
//   }
//   getHandlerPosFromValue(rightEdge) {
//     const newLeft = Math.round(rightEdge * (this.defValue - this.limits.min) / (this.limits.max - this.limits.min));
//     return newLeft;
//   }
