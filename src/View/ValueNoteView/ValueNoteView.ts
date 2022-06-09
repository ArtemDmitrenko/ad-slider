class ValueNoteView {
  public noteElement!: HTMLElement;

  private valueElement!: HTMLElement;

  constructor(parent: HTMLElement, isCommonValueNote: boolean) {
    this.render(parent, isCommonValueNote);
  }

  public setValue(value: number): void {
    this.valueElement.textContent = String(value);
  }

  public getValue(): number {
    return Number(this.valueElement.textContent);
  }

  public setValueForTwo(valueFrom: number, valueTo: number): void {
    const valFrom = String(valueFrom);
    const valTo = String(valueTo);
    this.valueElement.textContent = `${valFrom} - ${valTo}`;
  }

  public showValueNote(hasValueNote: boolean): void {
    if (hasValueNote) {
      this.noteElement.classList.remove('adslider__note_hide');
      this.noteElement.classList.add('adslider__note_show');
    } else {
      this.noteElement.classList.remove('adslider__note_show');
      this.noteElement.classList.add('adslider__note_hide');
    }
  }

  public calcPos(options: {
    handlerPos: string,
    handlerSize: number,
  }): number {
    const { handlerPos, handlerSize } = options;
    return parseInt(handlerPos, 10) + handlerSize / 2;
  }

  public setPos(value: number, isVertical: boolean): void {
    if (isVertical) {
      this.noteElement.style.left = '';
      this.noteElement.style.bottom = `${value}px`;
    } else {
      this.noteElement.style.bottom = '';
      this.noteElement.style.left = `${value}px`;
    }
  }

  public getSize(isVertical: boolean): number {
    return isVertical
      ? parseInt(getComputedStyle(this.noteElement).height, 10)
      : parseInt(getComputedStyle(this.noteElement).width, 10);
  }

  public getPos(isVertical: boolean): number {
    return isVertical
      ? parseInt(getComputedStyle(this.noteElement).bottom, 10)
      : parseInt(getComputedStyle(this.noteElement).left, 10);
  }

  public removeNoteElement(): void {
    this.noteElement.remove();
  }

  private render(parent: HTMLElement, isCommonValueNote: boolean): void {
    this.noteElement = document.createElement('div');
    this.valueElement = document.createElement('p');
    this.noteElement.classList.add('adslider__note');
    if (isCommonValueNote) {
      this.noteElement.classList.add('adslider__note_common');
    }
    this.valueElement.classList.add('adslider__value');
    this.noteElement.append(this.valueElement);
    parent.append(this.noteElement);
  }
}

export default ValueNoteView;
