import { Config, Model } from '../model/model';
import View from '../view/view';

export default class Presenter {
  private model: Model;

  private view: View;

  constructor(container: HTMLElement, options: Config) {
    this.model = new Model(options);
    this.view = new View(container);
    this.updateView();
    this.addObservers();
  }

  public updateView(): void {
    this.view.updateView(this.model.options);
    this.updateObservers();
  }

  private addObservers(): void {
    // When position of handler is changing - curValue in Model is updating
    this.view.addObserver('handlerMove', this.model.setValueFromHandlerPos.bind(this.model));

    // When curVal in Model is changing - pos of handler is calc and then updating
    this.model.addObserver('calcHandlerPos', this.view.handlerView.calcPos.bind(this.view.handlerView));
    this.model.addObserver('setHandlerPos', this.view.handlerView.setPos.bind(this.view.handlerView));
    if (this.view.handlerViewFrom) {
      this.model.addObserver('calcHandlerPosForDouble', this.view.handlerViewFrom.calcPos.bind(this.view.handlerViewFrom));
      this.model.addObserver('setHandlerPosForDouble', this.view.handlerViewFrom.setPos.bind(this.view.handlerViewFrom));
    }

    // When curVal in Model is changing - position of valueNote is calculating and then updating
    this.model.addObserver('calcValueNotePos', this.view.valueNoteView.calcPos.bind(this.view.valueNoteView));
    this.model.addObserver('setValueNotePos', this.view.valueNoteView.setPos.bind(this.view.valueNoteView));
    this.model.addObserver('setOneNote', this.view.setViewOfOneNote.bind(this.view));
    if (this.view.valueNoteViewFrom) {
      this.model.addObserver('calcValueNotePosForDouble', this.view.valueNoteViewFrom.calcPos.bind(this.view.valueNoteViewFrom));
      this.model.addObserver('setValueNotePosForDouble', this.view.valueNoteViewFrom.setPos.bind(this.view.valueNoteViewFrom));
    }

    // When curValue in Model is changing - value of valueNote is updating
    this.model.addObserver('setValueOfNote', this.view.valueNoteView.setValue.bind(this.view.valueNoteView));
    if (this.view.valueNoteViewFrom) {
      this.model.addObserver('setValueOfNoteForDouble', this.view.valueNoteViewFrom.setValue.bind(this.view.valueNoteViewFrom));
    }

    // When curValue in Model is changing - width of bar is updating
    this.model.addObserver('setBarWidth', this.view.barView.setLength.bind(this.view.barView));
    if (this.view.valueNoteViewFrom) {
      this.model.addObserver('setBarWidthForDouble', this.view.barView.setLengthForDouble.bind(this.view.barView));
    }
  }

  private updateObservers(): void {
    if (this.view.handlerViewFrom) {
      this.model.addObserver('calcHandlerPosForDouble', this.view.handlerViewFrom.calcPos.bind(this.view.handlerViewFrom));
      this.model.addObserver('setHandlerPosForDouble', this.view.handlerViewFrom.setPos.bind(this.view.handlerViewFrom));
      this.model.addObserver('calcValueNotePosForDouble', this.view.valueNoteViewFrom.calcPos.bind(this.view.valueNoteViewFrom));
      this.model.addObserver('setValueNotePosForDouble', this.view.valueNoteViewFrom.setPos.bind(this.view.valueNoteViewFrom));
      this.model.addObserver('setValueOfNoteForDouble', this.view.valueNoteViewFrom.setValue.bind(this.view.valueNoteViewFrom));
      this.model.addObserver('setBarWidthForDouble', this.view.barView.setLengthForDouble.bind(this.view.barView));
    }
  }
}
