import EventObserver from '../eventObserver/eventObserver';

export default class Model {
  constructor(options) {
    this.limits = (options.limits) ? options.limits : { min: 0, max: 100 };
    this.defValue = (options.defValue) ? options.defValue : 50;
    // this.showValueNote = (options.showValueNote) ? options.showValueNote : true;
  }
  setValue(value) {
    this.defValue = value;
    this.updateValue = new EventObserver();
    this.updateValue.broadcast(this.defValue);
  }
  setLimits(values) {
    if (typeof values !== 'object') {
      throw new Error('It must be object');
    } else if (values.min >= values.max) {
      throw new Error('Min can not be more than Max');
    }
    this.limits = { min: values.min, max: values.max };
    this.updateLimits = new EventObserver();
    this.updateLimits.broadcast(this.limits);
  }
  getvalue() {
    return this.defValue;
  }
}

// const model = new Model({ defValue: 70 });

// model.setValue(60);

// console.log(model.limits)
// model.setLimits({ min: 50, max: 100 });
// console.log(model.limits)