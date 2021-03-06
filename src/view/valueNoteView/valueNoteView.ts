export default class ValueNoteView {
  public $note!: HTMLElement;

  public $value!: HTMLElement;

  public valueNotePos!: number;

  constructor(parent: HTMLElement) {
    this.render(parent);
  }

  private render(parent: HTMLElement): void {
    this.$note = document.createElement('div');
    this.$value = document.createElement('p');
    this.$note.classList.add('adslider__note');
    this.$value.classList.add('adslider__value');
    this.$note.append(this.$value);
    parent.append(this.$note);
  }

  public setValue(value: number): void {
    this.$value.textContent = String(value);
  }

  public setValueForTwo(valueFrom: number, valueTo: number): void {
    const valFrom = String(valueFrom);
    const valTo = String(valueTo);
    this.$value.textContent = `${valFrom} - ${valTo}`;
  }

  public showValueNote(data: boolean): void {
    if (data === true) {
      this.$note.classList.remove('adslider__note_hide');
      this.$note.classList.add('adslider__note_show');
    } else {
      this.$note.classList.remove('adslider__note_show');
      this.$note.classList.add('adslider__note_hide');
    }
  }

  public calcPos(handler: HTMLElement): void {
    if (this.isVertical()) {
      const handlerBottomPos: string = getComputedStyle(handler).bottom;
      const handlerHeight: string = getComputedStyle(handler).height;
      this.valueNotePos = parseInt(handlerBottomPos, 10) + parseInt(handlerHeight, 10) / 2;
    } else {
      const handlerLeftPos: string = getComputedStyle(handler).left;
      const handlerWidth: string = getComputedStyle(handler).width;
      this.valueNotePos = parseInt(handlerLeftPos, 10) + parseInt(handlerWidth, 10) / 2;
    }
  }

  public setPos(): void {
    if (this.$note.classList.contains('adslider__note_vertical')) {
      this.$note.style.left = '';
      this.$note.style.bottom = `${this.valueNotePos}px`;
    } else {
      this.$note.style.bottom = '';
      this.$note.style.left = `${this.valueNotePos}px`;
    }
  }

  public setVerticalView(verticalView: boolean): void {
    if (verticalView) {
      this.$note.classList.remove('adslider__note_horizontal');
      this.$note.classList.add('adslider__note_vertical');
    } else {
      this.$note.classList.remove('adslider__note_vertical');
      this.$note.classList.add('adslider__note_horizontal');
    }
  }

  public getSize(): number {
    let size: number;
    if (this.$note.classList.contains('adslider__note_vertical')) {
      size = parseInt(getComputedStyle(this.$note).height, 10);
    } else {
      size = parseInt(getComputedStyle(this.$note).width, 10);
    }
    return size;
  }

  public getPos(): number {
    let pos: number;
    if (this.$note.classList.contains('adslider__note_vertical')) {
      pos = parseInt(getComputedStyle(this.$note).bottom, 10);
    } else {
      pos = parseInt(getComputedStyle(this.$note).left, 10);
    }
    return pos;
  }

  public getValue(): number {
    const value: number = parseInt(this.$value.textContent, 10);
    return value;
  }

  private isVertical(): boolean {
    if (this.$note.classList.contains('adslider__note_vertical')) {
      return true;
    }
    return false;
  }
}
