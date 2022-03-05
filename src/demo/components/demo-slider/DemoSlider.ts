import Input from '../input/Input';
import Checkbox from '../checkbox/Checkbox';

type Config = {
  limits: {
    min: number;
    max: number;
  };
  curValue: number;
  showValueNote: boolean;
  step: number;
  vertical?: boolean;
  double?: boolean;
  from?: number;
  to?: number;
}

class DemoSlider {
  private inputsArray: HTMLInputElement[] = [];

  private parent: HTMLElement;

  private currentValueInstance!: Input;

  private minValueInstance!: Input;

  private maxValueInstance!: Input;

  private noteValueInstance!: Checkbox;

  private stepInstance!: Input;

  private verticalInstance!: Checkbox;

  private doubleInstance!: Checkbox;

  private fromInstance!: Input;

  private toInstance!: Input;

  private initOptions!: Config;

  private options!: Config;

  private adslider!: HTMLElement | null;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.init();
    this.setInitOptionsForSlider();
    this.initPlugin();
    this.getSliderOptions();
    this.updatePanel();
    this.addListeners();
  }

  private init(): void {
    this.adslider = this.parent.querySelector('.js-demo-slider__adslider');
    const minValueElement = this.parent.querySelector('.js-demo-slider__minimum-value');
    const maxValueElement = this.parent.querySelector('.js-demo-slider__maximum-value');
    const currentValueElement = this.parent.querySelector('.js-demo-slider__current-value');
    const stepElement = this.parent.querySelector('.js-demo-slider__step');
    const fromElement = this.parent.querySelector('.js-demo-slider__from');
    const toElement = this.parent.querySelector('.js-demo-slider__to');
    const noteValueElement = this.parent.querySelector('.js-demo-slider__note-value');
    const verticalElement = this.parent.querySelector('.js-demo-slider__vertical-view');
    const doubleElement = this.parent.querySelector('.js-demo-slider__double');
    if (minValueElement) {
      this.minValueInstance = new Input(minValueElement);
      this.inputsArray.push(this.minValueInstance.getInputElement());
    }
    if (maxValueElement) {
      this.maxValueInstance = new Input(maxValueElement);
      this.inputsArray.push(this.maxValueInstance.getInputElement());
    }
    if (currentValueElement) {
      this.currentValueInstance = new Input(currentValueElement);
      this.inputsArray.push(this.currentValueInstance.getInputElement());
    }
    if (stepElement) {
      this.stepInstance = new Input(stepElement);
      this.inputsArray.push(this.stepInstance.getInputElement());
    }
    if (fromElement) {
      this.fromInstance = new Input(fromElement);
      this.inputsArray.push(this.fromInstance.getInputElement());
    }
    if (toElement) {
      this.toInstance = new Input(toElement);
      this.inputsArray.push(this.toInstance.getInputElement());
    }
    if (noteValueElement) {
      this.noteValueInstance = new Checkbox(noteValueElement);
      this.inputsArray.push(this.noteValueInstance.getCheckboxElement());
    }
    if (verticalElement) {
      this.verticalInstance = new Checkbox(verticalElement);
      this.inputsArray.push(this.verticalInstance.getCheckboxElement());
    }
    if (doubleElement) {
      this.doubleInstance = new Checkbox(doubleElement);
      this.inputsArray.push(this.doubleInstance.getCheckboxElement());
    }
  }

  private setInitOptionsForSlider(): void {
    this.initOptions = {
      limits: {
        min: this.minValueInstance.getValue(),
        max: this.maxValueInstance.getValue(),
      },
      curValue: this.currentValueInstance.getValue(),
      showValueNote: this.noteValueInstance.isChecked(),
      step: this.stepInstance.getValue(),
      vertical: this.verticalInstance.isChecked(),
      double: this.doubleInstance.isChecked(),
      from: this.fromInstance.getValue(),
      to: this.toInstance.getValue(),
    };
  }

  private initPlugin(): void {
    $('.js-demo-slider__adslider', this.parent).adslider(this.initOptions);
  }

  private getSliderOptions(): void {
    this.options = $('.js-demo-slider__adslider', this.parent).adslider(
      'getOptions',
    );
  }

  private updatePanel() {
    const {
      curValue,
      limits: { min, max },
      step,
      from,
      showValueNote,
      vertical,
      double,
    } = this.options;
    this.currentValueInstance.setValue(curValue);
    this.minValueInstance.setValue(min);
    this.maxValueInstance.setValue(max);
    this.stepInstance.setValue(step);
    if (showValueNote) {
      this.noteValueInstance.setChecked();
    }
    if (vertical) {
      this.verticalInstance.setChecked();
    }
    if (double) {
      this.doubleInstance.setChecked();
      if (from) {
        this.fromInstance.setValue(from);
      }
      this.toInstance.setValue(curValue);
    }
    this.setInputsForDouble();
  }

  private addListeners(): void {
    this.inputsArray.forEach((item) => {
      item.addEventListener(
        'change',
        this.handleInputChange.bind(this),
      );
    });
    if (this.adslider) {
      this.adslider.addEventListener(
        'mousemove',
        this.updatePanel.bind(this),
      );
      this.adslider.addEventListener(
        'click',
        this.updatePanel.bind(this),
      );
    }
  }

  private handleInputChange(): void {
    this.options = {
      curValue: this.currentValueInstance.getValue(),
      limits: {
        min: this.minValueInstance.getValue(),
        max: this.maxValueInstance.getValue(),
      },
      step: this.stepInstance.getValue(),
      showValueNote: this.noteValueInstance.isChecked(),
      vertical: this.verticalInstance.isChecked(),
      double: this.doubleInstance.isChecked(),
      from: this.fromInstance.getValue(),
      to: this.toInstance.getValue(),
    };
    $('.js-demo-slider__adslider', this.parent).adslider(
      'update',
      this.options,
    );
    this.updatePanel();
  }

  private setInputsForDouble(): void {
    if (this.doubleInstance.isChecked()) {
      this.currentValueInstance.hideInput();
      this.fromInstance.showInput();
      this.toInstance.showInput();
    } else {
      this.currentValueInstance.showInput();
      this.fromInstance.hideInput();
      this.toInstance.hideInput();
    }
  }
}

export default DemoSlider;
