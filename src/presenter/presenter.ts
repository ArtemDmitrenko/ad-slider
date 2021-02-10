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

  public updateView(): void {
    this.view.updateView(this.model.options);
  }

  private addObservers(): void {
    // Observer: When position of handler is changing - curValue in Model is updating
    this.view.addObserver('handlerMove', this.model.setValueFromHandlerPos.bind(this.model));

    // Observer: When curValue in Model is changing - value of valueNote is updating
    this.model.addObserver('setValueOfNote', this.view.valueNoteView.setValue.bind(this.view.valueNoteView));

    // Observer: When curValue in Model is changing - position of handler is updating
    this.model.addObserver('setHandlerPos', this.view.setHandlerPos.bind(this.view));

    // Observer: When curValue in Model is changing - position of valueNote is updating
    this.model.addObserver('setValueNotePos', this.view.setValueNotePos.bind(this.view));

    // Observer: When curValue in Model is changing - width of bar is updating
    this.model.addObserver('setBarWidth', this.view.setBarLength.bind(this.view));


  }
}
