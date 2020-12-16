import EventObserver from '../eventObserver/eventObserver';

export interface Config {
  limits?: {
    min: number
    max: number
  }
  curValue?: number;
  showValueNote?: boolean;
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
    this.limits = (options.limits) ? options.limits : { min: 0, max: 100 };
    this.curValue = (options.curValue) ? options.curValue : 50;
    this.showValueNote = (typeof options.showValueNote === 'boolean') ? options.showValueNote : true;
  }
  setValue(value: number): void {
    if (typeof value !== 'number') {
      throw new Error('Value must be a number');
    } else if (value < this.limits.min || value > this.limits.max) {
      throw new Error('Value must be in range of min and max limits');
    }
    this.curValue = value;
    // this.eventUpdateValue.broadcast(this.defValue);
  }
  setLimits(values: {
    min: number 
    max: number
  }) {
    if (typeof values !== 'object') {
      throw new Error('Limits must be object');
    } else if (values.min >= values.max) {
      throw new Error('Min can not be more than Max');
    }
    this.limits = { min: values.min, max: values.max };
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
