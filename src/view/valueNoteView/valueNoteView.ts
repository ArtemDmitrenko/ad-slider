export default class ValueNoteView {
  public $note!: HTMLElement;

  public $value!: HTMLElement;

  private valueNotePos: number;

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
      this.valueNotePos = parseInt(getComputedStyle(handler).bottom, 10) + parseInt(getComputedStyle(handler).height, 10) / 2;
    } else {
      this.valueNotePos = parseInt(getComputedStyle(handler).left, 10) + parseInt(getComputedStyle(handler).width, 10) / 2;
    }
  }

  public setPos(): void {
    if (this.$note.classList.contains('adslider__note_vertical')) {
      this.$note.style.bottom = `${this.valueNotePos}px`;
    } else {
      this.$note.style.left = `${this.valueNotePos}px`;
    }
  }

  public setVerticalView(verticalView: boolean): void {
    if (verticalView) {
      this.$note.classList.add('adslider__note_vertical');
    } else {
      this.$note.classList.add('adslider__note_horizontal');
    }
  }

  private isVertical(): boolean {
    if (this.$note.classList.contains('adslider__note_vertical')) {
      return true;
    }
    return false;
  }
}
