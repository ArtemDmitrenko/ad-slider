import { IConfig, Model } from '../Model/Model';
import View from '../View/View';
import EventTypes from '../EventObserver/eventTypes';

class Presenter {
  private model: Model;

  private view: View;

  constructor(container: HTMLElement, options: IConfig) {
    this.model = new Model(options);
    this.view = new View(container);
    this.updateView();
    this.addObservers();
  }

  public updateView(): void {
    this.view.updateView(this.model.options);
  }

  public validateModel(options: IConfig): void {
    this.model.init(options);
  }

  public getModelOptions(): IConfig {
    return this.model.getOptions();
  }

  private addObservers(): void {
    this.view.addObserver(EventTypes.CHANGE_POSITION, this.handleCalcValue);
    this.model.addObserver(EventTypes.CALC_POSITION, this.handleCalcPos);
    this.model.addObserver(EventTypes.SET_POSITION, this.handleSetPos);
  }

  private handleCalcValue = (data: {
    relPosition: number,
    isFromValueChanging: boolean
  }) => {
    this.model.setValueFromHandlerPos(data);
  }

  private handleCalcPos = (options: {
    value: number,
    limits: { min: number; max: number },
    isFromValueChanging: boolean
  }) => {
    this.view.calcPos(options);
  }

  private handleSetPos = (options: {
    isDouble: boolean,
    isFromValueChanging: boolean,
    showValueNote: boolean
  }) => {
    this.view.setPos(options);
  }
}

export default Presenter;
