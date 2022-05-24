import './main.scss';
import { IConfig } from './Model/Model';
import Presenter from './Presenter/Presenter';

// eslint-disable-next-line func-names
(function ($) {
  type SliderMethods = {
    init(container: HTMLElement, options: IConfig): void,
    update(options: IConfig): void,
    getOptions(): IConfig,
  };

  const methods = {
    init(container: HTMLElement, options: IConfig): void {
      if ($(this).data('inited')) {
        $.error('Plugin has already been initialized on this selector!');
      } else {
        const dataOptions = $(container).data();
        const resultOptions = $.extend(dataOptions, options);
        const presenter = new Presenter(container, resultOptions);
        $(this).data({
          presenter, inited: true,
        });
      }
    },
    update(options: IConfig): void {
      const presenter = $(this).data('presenter');
      presenter.validateModel(options);
      presenter.updateView();
    },
    getOptions(): IConfig {
      return $(this).data('presenter').getModelOptions();
    },
  };

  function adslider(this: typeof $, options: IConfig): JQueryStatic;
  function adslider(
      this: typeof $,
      methodName: keyof SliderMethods,
      options: IConfig
    ): JQueryStatic;
  function adslider(this: typeof $, methodName: keyof SliderMethods): IConfig;

  // eslint-disable-next-line consistent-return
  function adslider(
    this: typeof $,
    arg1: keyof SliderMethods | IConfig,
    arg2?: IConfig,
  ): void | IConfig | JQueryStatic {
    if (typeof arg1 === 'string') {
      if (arg1 === 'update' && arg2) {
        methods.update.call(this, arg2);
        return this;
      }
      if (arg1 === 'getOptions' && !arg2) {
        return methods.getOptions.call(this);
      }
    } else if (typeof arg1 === 'object' && !arg2) {
      const el = $(this)[0];
      methods.init.call(this, el, arg1);
      return this;
    }
    $.error(`Method ${arg1} does not exist on jQuery.tooltip`);
  }
  // eslint-disable-next-line no-param-reassign
  $.fn.adslider = adslider;
}(jQuery));
