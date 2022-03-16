class Checkbox {
  private parent: Element;

  private checkboxElement!: HTMLInputElement;

  constructor(parent: Element, callback: Function) {
    this.parent = parent;
    this.init(callback);
  }

  private init(callback: Function): void {
    this.checkboxElement = this.parent.querySelector('.js-checkbox__value') as HTMLInputElement;
    this.checkboxElement.addEventListener('change', this.handleInputChange.bind(this, callback));
  }

  private handleInputChange = (callback: Function): void => {
    callback();
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
