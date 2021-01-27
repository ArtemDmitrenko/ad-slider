const options = {
  limits: { min: 50, max: 150 },
  curValue: 100,
  showValueNote: true,
};
const options2 = {
  limits: { min: 50, max: 150 },
  curValue: 140,
  showValueNote: true,
};

$('.container').adslider(options);

// const slider1input: HTMLInputElement | null = document.querySelector('.slider1_input');
// if (!slider1input) {
//   throw Error('No such html element');
// } else {
//   const alert1 = (): void => {
//     options.curValue = Number(slider1input.value);
//     $('.container').adslider('update', options);
//   };
//   slider1input.addEventListener('change', alert1);
// }

// console.log($('.container').adslider('getOptions'));
// const obj = $('.container').adslider('getOptions');
// console.log(obj);
// slider1input.value = obj.curValue;
