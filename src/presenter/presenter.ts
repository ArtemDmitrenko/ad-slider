import {Model} from '../model/model';
import View from '../view/view';

export default class Presenter {
  private model: Model
  private view: View
  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;

    this.view.setPosition(this.model.curValue, this.model.limits, this.view.getRightEdge());
    this.view.valueNoteView.showValueNote(this.model.showValueNote)

    // // When position of handler is changing - defValue in Model is updating
    // this.view.handler.eventMousemove.addObserver(this.model.getValueFromHandlerPos.bind(this.model));
    // // When defValue in Model is changing - value in valueNote is updating
    // this.model.eventUpdateValue.addObserver(this.view.valueNote._setValue.bind(this.view.valueNote));
  }


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