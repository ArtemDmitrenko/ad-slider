
export default class ValueNoteView {
  public $note: HTMLElement;
  private $value: HTMLElement;

  constructor(parent: HTMLElement) {
    this.render(parent);
  }

  private render(parent: HTMLElement) {
    this.$note = document.createElement('div');
    this.$value = document.createElement('p');
    this.$note.classList.add('adslider__note');
    this.$value.classList.add('adslider__value');
    this.$note.append(this.$value);
    parent.append(this.$note);
  }
  public alignRelHandler(handlerWidth: number) {
    this.$note.style.left = handlerWidth / 2 + 'px';
  }




  // private showValueNote(data: boolean) {
  //   if (data === true) {
  //     this.$note.classList.remove('adslider__note_hide');
  //     this.$note.classList.add('adslider__note_show');
  //   } else {
  //     this.$note.classList.remove('adslider__note_show');
  //     this.$note.classList.add('adslider__note_hide');
  //   }
  // }


  // _setValue(value) {
  //   this.$value.textContent = value;
  // }
  // _alignRelHandler(handlerWidth) {
  //   this.$note.style.left = handlerWidth / 2 + 'px';
  // }
  // _setPosition(data) {
  //   this.$note.style.left = data.newLeft + data.handlerWidth / 2 + 'px';
  // }

  
}