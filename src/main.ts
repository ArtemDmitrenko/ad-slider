import DemoPage from './demoPage/demoPage';


let options1 = {
  limits: { min: 0, max: 10000 },
  curValue: 35,
  showValueNote: true,
  // step: 20,
  double: true,
  from: 2000,
  to: 3000,
  // vertical: true,
};
const options2 = {
  limits: { min: 0, max: 100 },
  curValue: 85,
  showValueNote: true,
  // step: 20,
  // double: true,
  // from: 40,
  // to: 90,
  // vertical: true,
};

$('.container1').adslider(options1);
$('.container2').adslider(options2);

const demopage1 = new DemoPage('.container1');
const demopage2 = new DemoPage('.container2');

