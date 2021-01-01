export default class ValueNoteView {
  public $note!: HTMLElement;

  public $value!: HTMLElement;

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

  public setPos(handler: HTMLElement): void {
    this.$note.style.left = `${parseInt(getComputedStyle(handler).left, 10) + handler.offsetWidth / 2}px`;
  }
}
