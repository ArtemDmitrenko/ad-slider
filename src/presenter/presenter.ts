import { Model } from '../model/model';
import View from '../view/view';

export default class Presenter {
  private model: Model;

  private view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;

    this.view.setHandlerPosAndValue(this.model.curValue, this.model.limits, this.view.getRightEdge());
    this.view.valueNoteView.showValueNote(this.model.showValueNote);

    // Observer: When position of handler is changing - defValue in Model is updating
    this.view.addObserver(this.model.setValueFromHandlerPos.bind(this.model));

    // Observer: When defValue in Model is changing - value in valueNote is updating
    this.model.addObserver(this.view.valueNoteView.setValue.bind(this.view.valueNoteView));
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
