export default class Model {
  constructor(options) {
    this.range = (options.range) ? options.range : { min: 0, max: 100 };
    this.defValue = (options.defValue) ? options.defValue : 50;
  }
  get value() {
    return this.defValue;
  }
  set value(value) {
    this.defValue = value;
    observer.broadcast();
  }
}