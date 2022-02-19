class Checkbox {
  private $parent: HTMLElement;

  private $checkboxElement!: HTMLInputElement;

  constructor($parent: HTMLElement) {
    this.$parent = $parent;
    this.init();
  }

  private init(): void {
    this.$checkboxElement = this.$parent.querySelector('.js-checkbox__value') as HTMLInputElement;
  }

  public getCheckboxElement(): HTMLInputElement {
    return this.$checkboxElement;
  }

  public isChecked(): boolean {
    return this.$checkboxElement.checked;
  }

  public setChecked(): void {
    this.$checkboxElement.checked = true;
  }
}

export default Checkbox;