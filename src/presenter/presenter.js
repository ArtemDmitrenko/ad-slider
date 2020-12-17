"use strict";
exports.__esModule = true;
var Presenter = /** @class */ (function () {
    function Presenter(model, view) {
        this.model = model;
        this.view = view;
        this.view.setPosition(this.model.curValue, this.model.limits, this.view.getRightEdge());
        this.view.valueNoteView.showValueNote(this.model.showValueNote);
        // // When position of handler is changing - defValue in Model is updating
        // this.view.handler.eventMousemove.addObserver(this.model.getValueFromHandlerPos.bind(this.model));
        // // When defValue in Model is changing - value in valueNote is updating
        // this.model.eventUpdateValue.addObserver(this.view.valueNote._setValue.bind(this.view.valueNote));
    }
    return Presenter;
}());
exports["default"] = Presenter;
