export default class Presenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  _render() {
    this.view.valueNote.setValue(this.model.defValue);
  }

}