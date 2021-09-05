import { Config } from '../model/model';

export default class DemoPage {
  private selector: string;

  private $container!: HTMLElement;

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

  private options!: Config;

  constructor(selector: string) {
    this.selector = selector;
    this.findInputs();
    this.findOptions();
    this.updatePanel();
    this.addListeners();
    this.updateInputFromTo();
  }

  private findInputs(): void {
    this.$container = document.querySelector(this.selector) as HTMLElement;
    if (this.$container) {
      this.$inputCurValue = this.$container.querySelector('.panel__curValue') as HTMLInputElement;
      this.$inputMinValue = this.$container.querySelector('.panel__minValue') as HTMLInputElement;
      this.$inputMaxValue = this.$container.querySelector('.panel__maxValue') as HTMLInputElement;
      this.$inputShowValue = this.$container.querySelector('.panel__showNoteValue') as HTMLInputElement;
      this.$inputStep = this.$container.querySelector('.panel__step') as HTMLInputElement;
      this.$inputVertical = this.$container.querySelector('.panel__verticalView') as HTMLInputElement;
      this.$inputDouble = this.$container.querySelector('.panel__double') as HTMLInputElement;
      this.$inputFrom = this.$container.querySelector('.panel__from') as HTMLInputElement;
      this.$inputTo = this.$container.querySelector('.panel__to') as HTMLInputElement;
      this.$curValueOnSlider = this.$container.querySelector('.adslider__value') as HTMLElement;
    }
  }

  private findOptions(): void {
    this.options = $(this.selector).adslider('getOptions');
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
    if (this.$inputShowValue.checked) {
      this.options.showValueNote = true;
    } else {
      this.options.showValueNote = false;
    }
    if (this.$inputVertical.checked) {
      this.options.vertical = true;
    } else {
      this.options.vertical = false;
    }
    if (this.$inputDouble.checked) {
      this.options.double = true;
    } else {
      this.options.double = false;
    }
    this.options.from = Number(this.$inputFrom.value);
    this.options.to = Number(this.$inputTo.value);
    $(this.selector).adslider('update', this.options);
  }

  private addListeners(): void {
    this.$inputCurValue.addEventListener('change', this.handleInputChange.bind(this));
    this.$inputMinValue.addEventListener('change', this.handleInputChange.bind(this));
    this.$inputMaxValue.addEventListener('change', this.handleInputChange.bind(this));
    this.$inputShowValue.addEventListener('change', this.handleInputChange.bind(this));
    this.$inputStep.addEventListener('change', this.handleInputChange.bind(this));
    this.$inputVertical.addEventListener('change', this.handleInputChange.bind(this));
    this.$inputDouble.addEventListener('change', this.handleInputChange.bind(this));
    this.$inputFrom.addEventListener('change', this.handleInputChange.bind(this));
    this.$inputTo.addEventListener('change', this.handleInputChange.bind(this));
    this.$curValueOnSlider.addEventListener('DOMSubtreeModified', this.updateCurInput.bind(this));
    this.$inputDouble.addEventListener('change', this.updateInputFromTo.bind(this));
  }

  private updateCurInput(): void {
    this.$inputCurValue.value = this.$curValueOnSlider.textContent as string;
  }

  private updateInputFromTo(): void {
    if (this.$inputDouble.checked) {
      const $noteFrom = this.$container.querySelector('.adslider__note_from') as HTMLElement;
      const $valueFrom = $noteFrom.querySelector('.adslider__value') as HTMLElement;
      const $noteTo = this.$container.querySelector('.adslider__note') as HTMLElement;
      const $valueTo = $noteTo.querySelector('.adslider__value') as HTMLElement;
      this.updateFromInput($valueFrom);
      this.updateToInput($valueTo);
      this.$inputCurValue.style.visibility = 'hidden';
      this.$inputFrom.style.visibility = 'visible';
      this.$inputTo.style.visibility = 'visible';
      $valueFrom.addEventListener('DOMSubtreeModified', this.updateFromInput.bind(this, $valueFrom));
      $valueTo.addEventListener('DOMSubtreeModified', this.updateToInput.bind(this, $valueTo));
    } else {
      this.$inputCurValue.style.visibility = 'visible';
      this.$inputFrom.style.visibility = 'hidden';
      this.$inputTo.style.visibility = 'hidden';
    }
  }

  private updateFromInput($valueFrom: HTMLElement): void {
    this.$inputFrom.value = $valueFrom.textContent as string;
  }

  private updateToInput($valueTo: HTMLElement): void {
    this.$inputTo.value = $valueTo.textContent as string;
  }
}
