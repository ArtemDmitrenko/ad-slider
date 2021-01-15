"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = __importDefault(require("./view"));
describe('view', () => {
    const $container = document.createElement('div');
    // $container.classList.add('container');
    document.body.append($container);
    let view;
    // beforeEach(() => {
    //   $container.classList.add('container');
    //   view = new View('.container');
    // });
    test('Function render: creating instance of View', () => {
        view = new view_1.default($container);
        expect(view.$el).not.toBeNull();
    });
    test('Function render: throw Error if DOM does not have selector', () => {
        function viewWithNoSelector() {
            view = new view_1.default($container);
        }
        expect(viewWithNoSelector).toThrowError(new Error('You do not have this element in your DOM'));
    });
});
