import {Config} from './model/model';
import {Model} from './model/model';
import View from './view/view';
import Presenter from './presenter/presenter';

export default function createAdslider(selector: string, userOptions: Config) {
  const view = new View(selector);
  const model = new Model(userOptions);
  const presenter = new Presenter();
}

createAdslider('.container', {
  limits: { min: 50, max: 150 },
  curValue: 90,
  showValueNote: true
});


