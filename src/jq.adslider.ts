// declare var $: any;
// var jquery = require("jquery");
// window.$ = window.jQuery = jquery;

import { Config, Model } from './model/model';
import View from './view/view';
import Presenter from './presenter/presenter';

(function ($) {
  $.fn.adslider = function (userOptions: Config) {
    this.each(() => {
      const view = new View(this[0]);
      const model = new Model(userOptions);
      const presenter = new Presenter(model, view);
    });
    return this;
  };
}(jQuery));
