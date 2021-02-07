let options1 = {
  limits: { min: 0, max: 100 },
  curValue: 20,
  showValueNote: true,
  step: 30,
  // vertical: true,
};
const options2 = {
  limits: { min: 50, max: 150 },
  curValue: 140,
  showValueNote: true,
};

$('.container').adslider(options1);
// $('.container').adslider('updateCurValue', 60);

// const inputCurValue: HTMLInputElement | null = document.querySelector('.panel__curValue');
// if (!inputCurValue) {
//   throw Error('No such html element');
// } else {
//   inputCurValue.value = $('.container').adslider('getOptions').curValue;

//   const updateAdslider = (): void => {
//     options1.curValue = Number(inputCurValue.value);
//     $('.container').adslider('update', options1);
//   };
//   inputCurValue.addEventListener('change', updateAdslider);
// }

// const valueOnSlider = document.querySelector('.adslider__value');
// function updateInput(): void {
//   inputCurValue.value = valueOnSlider.textContent;
// }
// valueOnSlider.addEventListener('DOMSubtreeModified', updateInput);