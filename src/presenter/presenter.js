"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Presenter {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.setPosition(this.model.curValue, this.model.limits, this.view.getRightEdge());
        this.view.valueNoteView.showValueNote(this.model.showValueNote);
        // Observer: When position of handler is changing - defValue in Model is updating
        this.view.addObserver(this.model.setValueFromHandlerPos.bind(this.model));
        // Observer: When defValue in Model is changing - value in valueNote is updating
        this.model.addObserver(this.view.valueNoteView.setValue.bind(this.view.valueNoteView));
    }
}
exports.default = Presenter;
