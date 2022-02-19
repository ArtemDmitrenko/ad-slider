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
  private $parent: HTMLElement;

  private currentValueInstance!: Input;

  private $inputCurValueContainer!: HTMLElement;

  private $inputCurValue!: HTMLInputElement;

  private minValueInstance!: Input;

  private $inputMinValueContainer!: HTMLElement;

  private $inputMinValue!: HTMLInputElement;

  private maxValueInstance!: Input;

  private $inputMaxValueContainer!: HTMLElement;

  private $inputMaxValue!: HTMLInputElement;

  private noteValueInstance!: Checkbox;

  private $inputShowValueContainer!: HTMLElement;

  private $inputShowValue!: HTMLInputElement;

  private stepInstance!: Input;

  private $inputStepContainer!: HTMLElement;

  private $inputStep!: HTMLInputElement;

  private verticalInstance!: Checkbox;

  private $inputVerticalContainer!: HTMLElement;

  private $inputVertical!: HTMLInputElement;

  private doubleInstance!: Checkbox;

  private $inputDoubleContainer!: HTMLElement;

  private $inputDouble!: HTMLInputElement;

  private fromInstance!: Input;

  private $inputFromContainer!: HTMLElement;

  private $inputFrom!: HTMLInputElement;

  private toInstance!: Input;

  private $inputToContainer!: HTMLElement;

  private $inputTo!: HTMLInputElement;

  private initOptions!: Config;

  private options!: Config;

  private $adslider!: HTMLElement | null;

  constructor(parent: HTMLElement) {
    this.$parent = parent;
    this.findContainers();
    this.initElements();
    this.findInputs();
    this.setInitOptionsForSlider();
    this.initPlugin();
    this.getSliderOptions();
    this.updatePanel();
    this.addListeners();
  }

  private findContainers(): void {
    this.$adslider = this.$parent.querySelector('.js-demo-slider__adslider');
    this.$inputCurValueContainer = this.$parent.querySelector(
      '.js-demo-slider__current-value',
    ) as HTMLElement;
    this.$inputMinValueContainer = this.$parent.querySelector(
      '.js-demo-slider__minimum-value',
    ) as HTMLElement;
    this.$inputMaxValueContainer = this.$parent.querySelector(
      '.js-demo-slider__maximum-value',
    ) as HTMLElement;
    this.$inputShowValueContainer = this.$parent.querySelector(
      '.js-demo-slider__note-value',
    ) as HTMLElement;
    this.$inputStepContainer = this.$parent.querySelector(
      '.js-demo-slider__step',
    ) as HTMLElement;
    this.$inputVerticalContainer = this.$parent.querySelector(
      '.js-demo-slider__vertical-view',
    ) as HTMLElement;
    this.$inputDoubleContainer = this.$parent.querySelector(
      '.js-demo-slider__double',
    ) as HTMLElement;
    this.$inputFromContainer = this.$parent.querySelector(
      '.js-demo-slider__from',
    ) as HTMLElement;
    this.$inputToContainer = this.$parent.querySelector(
      '.js-demo-slider__to',
    ) as HTMLElement;
  }

  private initElements(): void {
    this.currentValueInstance = new Input(this.$inputCurValueContainer);
    this.minValueInstance = new Input(this.$inputMinValueContainer);
    this.maxValueInstance = new Input(this.$inputMaxValueContainer);
    this.noteValueInstance = new Checkbox(this.$inputShowValueContainer);
    this.stepInstance = new Input(this.$inputStepContainer);
    this.verticalInstance = new Checkbox(this.$inputVerticalContainer);
    this.doubleInstance = new Checkbox(this.$inputDoubleContainer);
    this.fromInstance = new Input(this.$inputFromContainer);
    this.toInstance = new Input(this.$inputToContainer);
  }

  private findInputs(): void {
    this.$inputCurValue = this.currentValueInstance.getInputElement();
    this.$inputMinValue = this.minValueInstance.getInputElement();
    this.$inputMaxValue = this.maxValueInstance.getInputElement();
    this.$inputShowValue = this.noteValueInstance.getCheckboxElement();
    this.$inputStep = this.stepInstance.getInputElement();
    this.$inputVertical = this.verticalInstance.getCheckboxElement();
    this.$inputDouble = this.doubleInstance.getCheckboxElement();
    this.$inputFrom = this.fromInstance.getInputElement();
    this.$inputTo = this.toInstance.getInputElement();
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
    $('.js-demo-slider__adslider', this.$parent).adslider(this.initOptions);
  }

  private getSliderOptions(): void {
    this.options = $('.js-demo-slider__adslider', this.$parent).adslider(
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
    this.$inputCurValue.addEventListener(
      'change',
      this.handleInputChange.bind(this),
    );
    this.$inputMinValue.addEventListener(
      'change',
      this.handleInputChange.bind(this),
    );
    this.$inputMaxValue.addEventListener(
      'change',
      this.handleInputChange.bind(this),
    );
    this.$inputShowValue.addEventListener(
      'change',
      this.handleInputChange.bind(this),
    );
    this.$inputStep.addEventListener(
      'change',
      this.handleInputChange.bind(this),
    );
    this.$inputVertical.addEventListener(
      'change',
      this.handleInputChange.bind(this),
    );
    this.$inputDouble.addEventListener(
      'change',
      this.handleInputChange.bind(this),
    );
    this.$inputDouble.addEventListener(
      'change',
      this.updatePanel.bind(this),
    );
    this.$inputFrom.addEventListener(
      'change',
      this.handleInputChange.bind(this),
    );
    this.$inputTo.addEventListener('change', this.handleInputChange.bind(this));
    if (this.$adslider) {
      this.$adslider.addEventListener(
        'mousemove',
        this.updatePanel.bind(this),
      );
      this.$adslider.addEventListener(
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
    $('.js-demo-slider__adslider', this.$parent).adslider(
      'update',
      this.options,
    );
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
