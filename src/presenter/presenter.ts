import { Model } from '../model/model';
import View from '../view/view';

export default class Presenter {
  private model: Model;

  private view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.render();

    // Observer: When position of handler is changing - defValue in Model is updating
    this.view.addObserver('handlerMove', this.model.setValueFromHandlerPos.bind(this.model));

    // Observer: When defValue in Model is changing - value in valueNote is updating
    this.model.addObserver('handlerMove', this.view.valueNoteView.setValue.bind(this.view.valueNoteView));
  }

  private render(): void {
    const handlerPos: number = View.calcHandlerPos(this.model.curValue, this.model.limits, this.view.getRightEdge());
    this.view.handlerView.setPos(handlerPos);
    const valueNotePos: number = View.calcValueNotePos(this.view.handlerView.$handler);
    this.view.valueNoteView.setPos(valueNotePos);
    this.view.valueNoteView.setValue(this.model.curValue);
    this.view.valueNoteView.showValueNote(this.model.showValueNote);
  }

}
