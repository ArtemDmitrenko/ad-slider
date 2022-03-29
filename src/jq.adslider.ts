import './main.scss';
import { IConfig } from './Model/Model';
import Presenter from './Presenter/Presenter';

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
        const presenter = new Presenter(container, options);
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

  function adslider(this: typeof $, options: IConfig): void;
  function adslider(this: typeof $, methodName: keyof SliderMethods, options: IConfig): void;
  function adslider(this: typeof $, methodName: keyof SliderMethods): IConfig;

  function adslider(
    this: typeof $,
    arg1: keyof SliderMethods | IConfig,
    arg2?: IConfig,
  ): void | IConfig {
    if (typeof arg1 === 'string') {
      if (arg1 === 'update' && arg2) {
        return methods.update.call(this, arg2);
      }
      if (arg1 === 'getOptions' && !arg2) {
        return methods.getOptions.call(this);
      }
    } else if (typeof arg1 === 'object' && !arg2) {
      const el = ($(this) as unknown) as HTMLElement;
      return methods.init.call(this, el, arg1);
    }
    $.error(`Method ${arg1} does not exist on jQuery.tooltip`);
  }
  $.fn.adslider = adslider;
}(jQuery));
