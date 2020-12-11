import EventObserver from '../eventObserver/eventObserver';

export default class Model {
  constructor(options) {
      this.limits = (options.limits) ? options.limits : { min: 0, max: 100 };
      this.defValue = (options.defValue) ? options.defValue : 50;
      // this.showValueNote = (options.showValueNote) ? options.showValueNote : true;

      // Event to update value on handler when defvalue in Model is changed
      this.eventUpdateValue = new EventObserver();

    }
    // setValue(value) {
    //   this.defValue = value;
    //   this.eventUpdateValue.broadcast(this.defValue);
    // }

  // setLimits(limits) {
  //   if (typeof values !== 'object') {
  //     throw new Error('It must be object');
  //   } else if (limits.min >= limits.max) {
  //     throw new Error('Min can not be more than Max');
  //   }
  //   this.limits = { min: limits.min, max: limits.max };
  // }
  getValueFromHandlerPos(data) {
    this.defValue = Math.round(this.limits.min + (this.limits.max - this.limits.min) * (parseInt(data.newLeft, 10) / data.rightEdge));
    this.eventUpdateValue.broadcast(this.defValue);
  }



}