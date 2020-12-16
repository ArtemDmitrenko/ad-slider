// import EventObserver from '../eventObserver/eventObserver';

export default class Presenter {
  // constructor(model, view) {
  //   this.model = model;
  //   this.view = view;

  //   // When position of handler is changing - defValue in Model is updating
  //   this.view.handler.eventMousemove.addObserver(this.model.getValueFromHandlerPos.bind(this.model));
  //   // When defValue in Model is changing - value in valueNote is updating
  //   this.model.eventUpdateValue.addObserver(this.view.valueNote._setValue.bind(this.view.valueNote));

  //   this.setInitial();
  // }

  // setInitial() {
  //   const rightEdge = this.view.getRightEdge();
  //   const newLeft = this.model.getHandlerPosFromValue(rightEdge);
  //   this.view.handler._setPosition(newLeft);
  //   this.view.valueNote._setValue(this.model.defValue);
  //   const handlerWidth = this.view.handler._getHandlerWidth();
  //   this.view.valueNote._setPosition({ newLeft, handlerWidth });
  //   this.view.valueNote.showValueNote(this.model.showValueNote);
  // }


}