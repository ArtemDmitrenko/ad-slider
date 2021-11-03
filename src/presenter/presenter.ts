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
  }

  private addObservers(): void {
    this.view.addObserver('changePos', this.handleCalcValue);
    this.model.addObserver('calcPos', this.handleCalcPos);
    this.model.addObserver('setPos', this.handleSetPos);
  }

  private handleCalcValue = (data: {
    relPosition: number,
    isHandlerFrom: boolean
  }) => {
    this.model.setValueFromHandlerPos(data);
  }

  private handleCalcPos = (options: {
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
