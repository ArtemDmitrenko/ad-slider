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

  private $inputCurValue!: HTMLInputElement;

  private $inputMinValue!: HTMLInputElement;

  private $inputMaxValue!: HTMLInputElement;

  private $inputShowValue!: HTMLInputElement;

  private $inputStep!: HTMLInputElement;

  private $inputVertical!: HTMLInputElement;

  private $inputDouble!: HTMLInputElement;

  private $inputFrom!: HTMLInputElement;

  private $inputTo!: HTMLInputElement;

  private initOptions!: Config;

  private options!: Config;

  private $adslider!: HTMLElement | null;

  constructor(parent: HTMLElement, initOptions: Config) {
    this.$parent = parent;
    this.initOptions = initOptions;
    this.initPlugin();
    this.findDOMElements();
    this.getSliderOptions();
    this.updatePanel();
    this.addListeners();
  }

  private initPlugin(): void {
    $('.js-demo-slider__adslider', this.$parent).adslider(this.initOptions);
  }

  private findDOMElements(): void {
    this.$adslider = this.$parent.querySelector('.js-demo-slider__adslider');
    this.$inputCurValue = this.$parent.querySelector(
      '.js-demo-slider__current-value',
    ) as HTMLInputElement;
    this.$inputMinValue = this.$parent.querySelector(
      '.js-demo-slider__minimum-value',
    ) as HTMLInputElement;
    this.$inputMaxValue = this.$parent.querySelector(
      '.js-demo-slider__maximum-value',
    ) as HTMLInputElement;
    this.$inputShowValue = this.$parent.querySelector(
      '.js-demo-slider__note-value',
    ) as HTMLInputElement;
    this.$inputStep = this.$parent.querySelector(
      '.js-demo-slider__step',
    ) as HTMLInputElement;
    this.$inputVertical = this.$parent.querySelector(
      '.js-demo-slider__vertical-view',
    ) as HTMLInputElement;
    this.$inputDouble = this.$parent.querySelector(
      '.js-demo-slider__double',
    ) as HTMLInputElement;
    this.$inputFrom = this.$parent.querySelector(
      '.js-demo-slider__from',
    ) as HTMLInputElement;
    this.$inputTo = this.$parent.querySelector(
      '.js-demo-slider__to',
    ) as HTMLInputElement;
  }

  private getSliderOptions(): void {
    this.options = $('.js-demo-slider__adslider', this.$parent).adslider(
      'getOptions',
    );
  }

  private updatePanel() {
    if (this.$inputCurValue) {
      this.$inputCurValue.value = String(this.options.curValue);
    }
    if (this.$inputMinValue) {
      this.$inputMinValue.value = String(this.options.limits.min);
    }
    if (this.$inputMaxValue) {
      this.$inputMaxValue.value = String(this.options.limits.max);
    }
    if (this.$inputStep) {
      this.$inputStep.value = String(this.options.step);
    }
    if (this.options.showValueNote) {
      if (this.$inputShowValue) {
        this.$inputShowValue.setAttribute('checked', 'checked');
      }
    }
    if (this.options.vertical) {
      if (this.$inputVertical) {
        this.$inputVertical.setAttribute('checked', 'checked');
      }
    }
    if (this.options.double) {
      if (this.$inputDouble) {
        this.$inputDouble.setAttribute('checked', 'checked');
        if (this.$inputFrom && this.$inputTo) {
          this.$inputFrom.value = String(this.options.from);
          this.$inputTo.value = String(this.options.curValue);
        }
      }
    }
    this.setInputsForDouble();
  }

  private handleInputChange(): void {
    this.options.curValue = Number(this.$inputCurValue.value);
    this.options.limits.min = Number(this.$inputMinValue.value);
    this.options.limits.max = Number(this.$inputMaxValue.value);
    this.options.step = Number(this.$inputStep.value);
    this.options.showValueNote = this.$inputShowValue.checked;
    this.options.vertical = this.$inputVertical.checked;
    this.options.double = this.$inputDouble.checked;
    this.options.from = Number(this.$inputFrom.value);
    this.options.to = Number(this.$inputTo.value);
    $('.js-demo-slider__adslider', this.$parent).adslider(
      'update',
      this.options,
    );
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

  private setInputsForDouble(): void {
    if (this.$inputDouble.checked) {
      this.$inputCurValue.style.visibility = 'hidden';
      this.$inputFrom.style.visibility = 'visible';
      this.$inputTo.style.visibility = 'visible';
    } else {
      this.$inputCurValue.style.visibility = 'visible';
      this.$inputFrom.style.visibility = 'hidden';
      this.$inputTo.style.visibility = 'hidden';
    }
  }
}

export default DemoSlider;
