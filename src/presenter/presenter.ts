import { Config, Model } from '../model/model';
import View from '../view/view';

class Presenter {
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
    this.view.addObserver('changePos', this.handleCalcAndSetValue);

    // When curVal in Model is changing - pos of handler is calc and then updating
    this.model.addObserver('calcPos', this.handleCalcPos);
    this.model.addObserver('setPos', this.handleSetPos);






    // When curValue in Model is changing - value of valueNote is updating


    this.model.addObserver('setValue', this.view.valueNoteView.setValue.bind(this.view.valueNoteView));
    if (this.view.valueNoteViewFrom) {
      this.model.addObserver('setValueOfNoteForFrom', this.view.valueNoteViewFrom.setValue.bind(this.view.valueNoteViewFrom));
    }
  }

  private updateObservers(): void {
    if (this.view.handlerViewFrom && this.view.valueNoteViewFrom) {
      this.model.addObserver('calcHandlerPosForFrom', this.view.handlerViewFrom.calcPos.bind(this.view.handlerViewFrom));
      this.model.addObserver('setHandlerPosForFrom', this.view.handlerViewFrom.setPos.bind(this.view.handlerViewFrom));
      this.model.addObserver('setValueOfNoteForFrom', this.view.valueNoteViewFrom.setValue.bind(this.view.valueNoteViewFrom));
    }
  }

  private handleCalcAndSetValue = (data: {
    newPos: number,
    edge: number,
    isHandlerFrom: boolean
  }) => {
    this.model.setValueFromHandlerPos(data);
  }

  private handleCalcPos = (options: {
    edge: number,
    value: number,
    limits: { min: number; max: number },
    isHandlerFrom: boolean
  }) => {
    this.view.calcPos(options);
  }

  private handleSetPos = (options: {
    isDouble: boolean,
    isHandlerFrom: boolean
  }) => {
    this.view.setPos(options);
  }
}

export default Presenter;
