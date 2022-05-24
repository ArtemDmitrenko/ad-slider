interface JQuery {
  adslider(options: IConfig): JQueryStatic;
  adslider(methodName: keyof SliderMethods, options: IConfig): JQueryStatic;
  adslider(methodName: 'getOptions'): IConfig;
}
