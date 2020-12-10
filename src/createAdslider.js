import Model from './model/model';
import View from './view/view';
// import Presenter from './presenter/presenter';

export default function createAdslider(selector, userOptions) {
  const view = new View(selector);
  const model = new Model(userOptions);
}