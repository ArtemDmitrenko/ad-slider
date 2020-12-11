import EventObserver from '../eventObserver/eventObserver';

export default class Presenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // When position of handler is changing - defValue in Model is updating
    this.view.handler.eventMousemove.addObserver(this.model.getValueFromHandlerPos.bind(this.model));
    // When defValue in Model is changing - value in valueNote is updating
    this.model.eventUpdateValue.addObserver(this.view.valueNote._setValue.bind(this.view.valueNote));

  }

}