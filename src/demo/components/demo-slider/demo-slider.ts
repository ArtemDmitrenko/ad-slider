import { IConfig } from '../../../model/model';

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

  private $curValueOnSlider!: HTMLElement;

  private options!: IConfig;

  constructor(parent: HTMLElement, options: IConfig) {
    this.$parent = parent;
    this.options = options;
    this.initPlugin();
    this.findInputs();
    this.findOptions();
    this.updatePanel();
    this.addListeners();
    this.updateInputFromTo();
  }

  private initPlugin(): void {
    $('.js-demo-slider__adslider', this.$parent).adslider(this.options);
  }

  private findInputs(): void {
    if (this.$parent) {
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
      this.$curValueOnSlider = this.$parent.querySelector(
        '.adslider__value',
      ) as HTMLElement;
    }
  }

  private findOptions(): void {
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
          this.$inputTo.value = String(this.options.to);
        }
      }
    }
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
    this.$inputFrom.addEventListener(
      'change',
      this.handleInputChange.bind(this),
    );
    this.$inputTo.addEventListener('change', this.handleInputChange.bind(this));
    this.$curValueOnSlider.addEventListener(
      'DOMSubtreeModified',
      this.updateCurInput.bind(this),
    );
    this.$inputDouble.addEventListener(
      'change',
      this.updateInputFromTo.bind(this),
    );
  }

  private updateCurInput(): void {
    this.$inputCurValue.value = this.$curValueOnSlider.textContent as string;
  }

  private updateInputFromTo(): void {
    if (this.$inputDouble.checked) {
      const $noteFrom = this.$parent.querySelector('.adslider__note_type_from');
      let $valueFrom: HTMLElement | null;
      if ($noteFrom) {
        $valueFrom = $noteFrom.querySelector('.adslider__value');
        this.updateFromInputAndAddEventListener($valueFrom);
      }
      const $noteTo = this.$parent.querySelector('.adslider__note');
      let $valueTo: HTMLElement | null;
      if ($noteTo) {
        $valueTo = $noteTo.querySelector('.adslider__value');
        this.updateToInputAndAddEventListener($valueTo);
      }
      this.$inputCurValue.style.visibility = 'hidden';
      this.$inputFrom.style.visibility = 'visible';
      this.$inputTo.style.visibility = 'visible';
    } else {
      this.$inputCurValue.style.visibility = 'visible';
      this.$inputFrom.style.visibility = 'hidden';
      this.$inputTo.style.visibility = 'hidden';
    }
  }

  private updateFromInputAndAddEventListener(el: HTMLElement | null) {
    if (el) {
      this.updateFromInput(el);
      el.addEventListener(
        'DOMSubtreeModified',
        this.updateFromInput.bind(this, el),
      );
    }
  }

  private updateToInputAndAddEventListener(el: HTMLElement | null) {
    if (el) {
      this.updateToInput(el);
      el.addEventListener(
        'DOMSubtreeModified',
        this.updateToInput.bind(this, el),
      );
    }
  }

  private updateFromInput($valueFrom: HTMLElement): void {
    this.$inputFrom.value = $valueFrom.textContent as string;
  }

  private updateToInput($valueTo: HTMLElement): void {
    this.$inputTo.value = $valueTo.textContent as string;
  }
}

export default DemoSlider;
