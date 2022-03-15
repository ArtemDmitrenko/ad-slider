class Input {
  private parent: Element;

  private inputElement!: HTMLInputElement;

  constructor(parent: Element) {
    this.parent = parent;
    this.init();
  }

  private init(): void {
    this.inputElement = this.parent.querySelector('.js-input__value') as HTMLInputElement;
  }

  public getInputElement(): HTMLInputElement {
    return this.inputElement;
  }

  public getValue(): number | null {
    if (this.inputElement.value === '') {
      return null;
    }
    return Number(this.inputElement.value);
  }

  public setValue(value: number | null | undefined): void {
    if (typeof value === 'number') {
      this.inputElement.value = String(value);
    } else {
      this.inputElement.value = '';
    }
  }

  public hideInput(): void {
    this.inputElement.classList.add('input__value_hidden');
  }

  public showInput(): void {
    this.inputElement.classList.remove('input__value_hidden');
  }
}

export default Input;
