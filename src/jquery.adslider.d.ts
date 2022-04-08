interface JQuery {
  adslider(options: IConfig): void;
  adslider(methodName: keyof SliderMethods, options: IConfig): void;
  adslider(methodName: 'getOptions'): IConfig;
}
