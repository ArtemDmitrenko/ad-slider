import { Model } from '../model/model';
import View from '../view/view';

export default class Presenter {
  private model: Model;

  private view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;

    this.updateView();
    this.addObservers();
  }

  private updateView(): void {
    this.view.updateView(this.model.options);
  }

  private addObservers(): void {
    // Observer: When position of handler is changing - defValue in Model is updating
    this.view.addObserver('handlerMove', this.model.setValueFromHandlerPos.bind(this.model));
    // Observer: When defValue in Model is changing - value in valueNote is updating
    this.model.addObserver('handlerMove', this.view.valueNoteView.setValue.bind(this.view.valueNoteView));
  }
}
