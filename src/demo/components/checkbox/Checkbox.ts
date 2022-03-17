class Checkbox {
  private parent: Element;

  private checkboxElement!: HTMLInputElement;

  constructor(parent: Element, handleOnChange: Function) {
    this.parent = parent;
    this.init(handleOnChange);
  }

  private init(handleOnChange: Function): void {
    this.checkboxElement = this.parent.querySelector('.js-checkbox__value') as HTMLInputElement;
    this.checkboxElement.addEventListener('change', handleOnChange.bind(this));
  }

  public getCheckboxElement(): HTMLInputElement {
    return this.checkboxElement;
  }

  public isChecked(): boolean {
    return this.checkboxElement.checked;
  }

  public setChecked(): void {
    this.checkboxElement.checked = true;
  }
}

export default Checkbox;
