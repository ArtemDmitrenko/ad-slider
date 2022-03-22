import Input from '../input/Input';
import Checkbox from '../checkbox/Checkbox';

type Config = {
  limits: {
    min: number | null;
    max: number | null;
  };
  showValueNote: boolean;
  step: number | null;
  vertical: boolean;
  double: boolean;
  from?: number | null;
  to: number | null;
  onChange?: (data: Config) => void;
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

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.init();
    this.setInitOptionsForSlider();
    this.initPlugin();
    this.getSliderOptions();
    this.updatePanel();
  }

  private init(): void {
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
      this.minValueInstance = new Input(minValueElement, this.handleInputChange);
      this.inputsArray.push(this.minValueInstance.getInputElement());
    }
    if (maxValueElement) {
      this.maxValueInstance = new Input(maxValueElement, this.handleInputChange);
      this.inputsArray.push(this.maxValueInstance.getInputElement());
    }
    if (currentValueElement) {
      this.currentValueInstance = new Input(currentValueElement, this.handleInputChange);
      this.inputsArray.push(this.currentValueInstance.getInputElement());
    }
    if (stepElement) {
      this.stepInstance = new Input(stepElement, this.handleInputChange);
      this.inputsArray.push(this.stepInstance.getInputElement());
    }
    if (fromElement) {
      this.fromInstance = new Input(fromElement, this.handleInputChange);
      this.inputsArray.push(this.fromInstance.getInputElement());
    }
    if (toElement) {
      this.toInstance = new Input(toElement, this.handleInputChange);
      this.inputsArray.push(this.toInstance.getInputElement());
    }
    if (noteValueElement) {
      this.noteValueInstance = new Checkbox(noteValueElement, this.handleInputChange);
      this.inputsArray.push(this.noteValueInstance.getCheckboxElement());
    }
    if (verticalElement) {
      this.verticalInstance = new Checkbox(verticalElement, this.handleInputChange);
      this.inputsArray.push(this.verticalInstance.getCheckboxElement());
    }
    if (doubleElement) {
      this.doubleInstance = new Checkbox(doubleElement, this.handleInputChange);
      this.inputsArray.push(this.doubleInstance.getCheckboxElement());
    }
  }

  private setInitOptionsForSlider(): void {
    this.initOptions = {
      limits: {
        min: this.minValueInstance.getValue(),
        max: this.maxValueInstance.getValue(),
      },
      showValueNote: this.noteValueInstance.isChecked(),
      step: this.stepInstance.getValue(),
      vertical: this.verticalInstance.isChecked(),
      double: this.doubleInstance.isChecked(),
      from: this.fromInstance.getValue(),
      to: this.toInstance.getValue(),
      onChange: this.handleOnChange,
    };
  }

  private handleOnChange = () => {
    this.updatePanel();
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
    this.getSliderOptions();
    const {
      limits: { min, max },
      step,
      from,
      to,
      showValueNote,
      vertical,
      double,
    } = this.options;
    this.toInstance.setValue(to);
    this.currentValueInstance.setValue(to);
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
    }
    this.fromInstance.setValue(from);
    this.setInputsForDouble();
  }

  private handleInputChange = (): void => {
    this.options = {
      limits: {
        min: this.minValueInstance.getValue(),
        max: this.maxValueInstance.getValue(),
      },
      step: this.stepInstance.getValue(),
      showValueNote: this.noteValueInstance.isChecked(),
      vertical: this.verticalInstance.isChecked(),
      double: this.doubleInstance.isChecked(),
      from: this.fromInstance.getValue(),
      to: this.doubleInstance.isChecked() ? this.toInstance.getValue() : this.currentValueInstance.getValue(),
      onChange: this.options.onChange,
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
