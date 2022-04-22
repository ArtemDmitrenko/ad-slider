import EventObserver from '../../EventObserver/EventObserver';

class ValueNoteView extends EventObserver {
  public noteElement!: HTMLElement;

  private valueElement!: HTMLElement;

  constructor(parent: HTMLElement) {
    super();
    this.render(parent);
  }

  public setValue(value: number | null | undefined): void {
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

  public showValueNote(data: boolean): void {
    if (data) {
      this.noteElement.classList.remove('adslider__note_hide');
      this.noteElement.classList.add('adslider__note_show');
    } else {
      this.noteElement.classList.remove('adslider__note_show');
      this.noteElement.classList.add('adslider__note_hide');
    }
  }

  public calcPos(options: {
    handlerBottomPos: string,
    handlerHeight: string,
    handlerLeftPos: string,
    handlerWidth: string,
  }): number {
    const {
      handlerBottomPos, handlerHeight, handlerLeftPos, handlerWidth,
    } = options;
    if (this.isVertical()) {
      return parseInt(handlerBottomPos, 10) + parseInt(handlerHeight, 10) / 2;
    }
    return parseInt(handlerLeftPos, 10) + parseInt(handlerWidth, 10) / 2;
  }

  public setPos(value: number): void {
    if (this.noteElement.classList.contains('adslider__note_direction_vertical')) {
      this.noteElement.style.left = '';
      this.noteElement.style.bottom = `${value}px`;
    } else {
      this.noteElement.style.bottom = '';
      this.noteElement.style.left = `${value}px`;
    }
  }

  public setVerticalView(verticalView: boolean): void {
    if (verticalView) {
      this.noteElement.classList.remove('adslider__note_direction_horizontal');
      this.noteElement.classList.add('adslider__note_direction_vertical');
    } else {
      this.noteElement.classList.remove('adslider__note_direction_vertical');
      this.noteElement.classList.add('adslider__note_direction_horizontal');
    }
  }

  public getSize(): number {
    return this.noteElement.classList.contains('adslider__note_direction_vertical') ? parseInt(getComputedStyle(this.noteElement).height, 10) : parseInt(getComputedStyle(this.noteElement).width, 10);
  }

  public getPos(): number {
    return this.noteElement.classList.contains('adslider__note_direction_vertical') ? parseInt(getComputedStyle(this.noteElement).bottom, 10) : parseInt(getComputedStyle(this.noteElement).left, 10);
  }

  public addClassToNoteElement(className: string): void {
    this.noteElement.classList.add(className);
  }

  private render(parent: HTMLElement): void {
    this.noteElement = document.createElement('div');
    this.valueElement = document.createElement('p');
    this.noteElement.classList.add('adslider__note');
    this.valueElement.classList.add('adslider__value');
    this.noteElement.append(this.valueElement);
    parent.append(this.noteElement);
  }

  private isVertical(): boolean {
    return this.noteElement.classList.contains('adslider__note_direction_vertical');
  }
}

export default ValueNoteView;
