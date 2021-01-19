"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = __importDefault(require("../view/view"));
class Presenter {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.render();
        // Observer: When position of handler is changing - defValue in Model is updating
        this.view.addObserver('handlerMove', this.model.setValueFromHandlerPos.bind(this.model));
        // Observer: When defValue in Model is changing - value in valueNote is updating
        this.model.addObserver('handlerMove', this.view.valueNoteView.setValue.bind(this.view.valueNoteView));
    }
    render() {
        const handlerPos = view_1.default.calcHandlerPos(this.model.curValue, this.model.limits, this.view.getRightEdge());
        this.view.handlerView.setPos(handlerPos);
        const valueNotePos = view_1.default.calcValueNotePos(this.view.handlerView.$handler);
        this.view.valueNoteView.setPos(valueNotePos);
        this.view.valueNoteView.setValue(this.model.curValue);
        this.view.valueNoteView.showValueNote(this.model.showValueNote);
    }
}
exports.default = Presenter;
